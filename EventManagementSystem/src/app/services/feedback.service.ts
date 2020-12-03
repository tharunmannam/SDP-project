import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorMessageService } from './http-error-message.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  public url: String = "http://localhost:4500/user";
  constructor(private http: HttpClient, private HttpErrorMsg: HttpErrorMessageService) { }

  postFeedback(user)
  {
    return this.http.put(`${this.url}/update/${user._id}`, user);
  }
}
