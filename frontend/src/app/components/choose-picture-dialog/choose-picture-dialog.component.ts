import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { ImagesService } from '../../services/images.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-choose-picture-dialog',
  standalone: true,
  imports: [FormsModule, DialogModule, CommonModule, DividerModule],
  templateUrl: './choose-picture-dialog.component.html',
  styleUrl: './choose-picture-dialog.component.scss',
})
export class ChoosePictureDialogComponent {
  visible: boolean = false;
  inputvalue: string | null = null;
  selectedFile: File | null = null;
  preview?: string;
  isLoading: boolean = false;
  @Input() existingPicture!: boolean;
  @Output() onImageSelected = new EventEmitter<string>();

  constructor(private imageService: ImagesService) {}

  onFileSelected(event: Event): void {
    let input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.preview = URL.createObjectURL(this.selectedFile);
    }
  }
  onUrlChange() {
    if (this.inputvalue) {
      this.preview = this.inputvalue;
      console.log(this.preview);
    }
  }
  showDialog() {
    this.visible = true;
  }
  closeDialog(fileInput: HTMLInputElement) {
    this.selectedFile = null;
    this.inputvalue = null;
    fileInput.value = '';
    this.preview = '';
    this.visible = false;
  }
  handleValidate(fileInput: HTMLInputElement) {
    this.isLoading = true;
    if (this.selectedFile) {
      let formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);
      this.imageService.uploadImage(formData).subscribe({
        next: (response: any) => {
          this.updatePicture(response.path, fileInput);
          this.isLoading = false;
        },
        error: (err: any) => {
          console.log(err);
          this.isLoading = false;
        },
      });
    } else if (this.inputvalue) {
      this.updatePicture(this.inputvalue, fileInput);
      this.isLoading = false;
    } else {
      this.closeDialog(fileInput);
      this.isLoading = false;
    }
  }
  updatePicture(url: string, fileInput: HTMLInputElement) {
    this.onImageSelected.emit(url);
    this.closeDialog(fileInput);
  }
}
