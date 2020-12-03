import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public details;
  public data;
  public err;
  constructor(private bookservice: BookService) { }

  ngOnInit(): void {
    this.Getall();
  }

  Search()
  {
    if(this.data=="")
    {
      this.Getall();
    }
    else
    {
      this.bookservice.getUserEvent(this.data)
      .subscribe((data) => {
        this.err=null;
        this.details=data;
        console.log(data);
      }, (err) => {
        this.err=err;
      })
    }
  }
  Getall()
  {
    this.bookservice.getevents()
    .subscribe((data) => {
      this.details=data;
      this.err=null;
      console.log(data);
    }, (err) => {
      this.err=err;
    });
  }

  Remove(detail)
  {
    this.bookservice.deleteEvent(detail.username)
    .subscribe((data) => {console.log(data)});
    this.Getall();
  }
}
