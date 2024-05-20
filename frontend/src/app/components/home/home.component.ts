import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private http: HttpClient) {}
  exemple:string = ''

  getData = () => {
    this.http
      .get('https://ultimate-cookbook-8beb64e72401.herokuapp.com/recipe')
      .subscribe({
        next: (data) => this.setExample(data),
        error: (err) => console.log(err),
      });
  };
  
  setExample = (data:any):void => {
    this.exemple = data[0].content;
  }

  ngOnInit() {
    this.getData();
  }
}
