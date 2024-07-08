import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  constructor(private http: HttpClient) {}

  uploadImage(formData: FormData) {
    return this.http.post(environment.apiUrl + '/upload-image', formData);
  }
}
