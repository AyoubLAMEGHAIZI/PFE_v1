import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  FeedBackmodel : FeedBack={
    name :'',
    email:'',
    feedback:''
  };

  constructor( private http: HttpClient) { }

  ngOnInit() {

  }

   sendFeedback() : void{
    let url="http//localhost:8082/feedback";
    this.http.post(url,this.FeedBackmodel).subscribe(
      res=>{location.reload();},

      err=>{alert('An error has occured while sending feedback ');}
      
    );
  }

}

export interface FeedBack{

  name :string;
  email:string;
  feedback:string
}