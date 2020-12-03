import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorMessageService } from './http-error-message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  public user=null;
  public url: String = "http://localhost:4500/user";
  constructor(private http: HttpClient, private HttpErrorMsg: HttpErrorMessageService) { }

  public admin_name="tharun123";
  public admin_email="tharunmannam@gmail.com";
  public password="tharun_mannam";

  authentication(name,pass)
  {
    if(name==this.admin_name || name==this.admin_email)
    {
      if(pass==this.password)
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    else
    {
      return false;
    }
  }

  addUser(user)
  {
    return this.http.post(`${this.url}/addUser`,user)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }
  getresponce()
  {
    return this.http.get(`${this.url}/getUsers`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }
  deleteUser(user)
  {
    return this.http.delete(`${this.url}/delete/${user.username}`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }
  updateUser(user)
  {
    return this.http.put(`${this.url}/update/${user.id}`,user)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

  getUser(user,pass)
  {
    return this.http.get(`${this.url}/getresponce/${user}/${pass}`)
    .pipe(catchError(this.HttpErrorMsg.handleError));
  }

}
