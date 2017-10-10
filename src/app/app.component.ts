import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Setting up a new Angular 4 application';
  // Sample Data API url
  private appUrl = 'https://jsonplaceholder.typicode.com/users';
  data: any = {};

  constructor(private http:Http){
    console.log('Hello');

    this.getContacts();
    this.getData();
  }

  getData(){
    return this.http.get(this.appUrl)
      .map((res : Response) => res.json());
  }

  getContacts(){
    this.getData().subscribe(data => {
      this.data.contacts = data;
    });
  }
}
