import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  SigninForm: FormGroup;
  person;
  errMess;
  constructor(private fb: FormBuilder, private router: Router, private authorization: AuthorizationService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm()
  {
    this.SigninForm=this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['',[Validators.required,Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      mobile: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      address: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }

  already()
  {
    this.router.navigate(['/login']);
  }

  createAccount()
  {
    const user = this.SigninForm.value;

    this.authorization.addUser(user)
    .subscribe((data) => {this.person=data;this.errMess=null;this.Move()}, (errMess) => {this.errMess=errMess, this.person=null;this.Move()});

  }

  Move()
  {
    const success = "Successfully Signed in";
    const failure = "Please Enter valid credentials";
    if(this.person!=null&&this.errMess==null)
    {
      this.authorization.user=this.person[0];
      this.snackbar.open(success, "dismiss", {
        duration: 2000,
      });
      setTimeout(() => {
        this.router.navigate(['/bookevent']);
      }, 1000);
    }
    else
    {
      this.snackbar.open(failure, "dismiss", {
        duration: 2000,
      });
    }
  }

}
