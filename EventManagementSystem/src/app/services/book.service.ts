import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorMessageService } from './http-error-message.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  public url: String="http://localhost:4500/event";
  constructor(private http: HttpClient, private HttpErrorMsg: HttpErrorMessageService) { }

  Bookevent(event)
  {
    return this.http.post(`${this.url}/bookevent`,event)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  getevents()
  {
    return this.http.get(`${this.url}/getEvents`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  deleteEvent(username)
  {
    return this.http.delete(`${this.url}/delete/${username}`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  getUserEvent(username)
  {
    return this.http.get(`${this.url}/getBooks/${username}`)
    .pipe(catchError(this.HttpErrorMsg.handleError)); 
  }
}
