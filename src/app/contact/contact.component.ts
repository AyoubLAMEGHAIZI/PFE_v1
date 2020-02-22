import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  FeedBack: FeedBack = {
    name : '',
    email: '',
    feedback: ''
  };

  constructor( private http: HttpClient) { }

  ngOnInit() {

  }

   sendFeedback(): void {
    const url = 'http://localhost:8081/feedback';
    this.http.post(url, this.FeedBack).subscribe(
      res => {location.reload(); },

      err => {alert('An error has occured while sending feedback '); }

    );
  }

}

export interface FeedBack {

  name: string;
  email: string;
  feedback: string;
}
