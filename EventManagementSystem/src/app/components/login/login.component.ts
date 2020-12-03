import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Login: FormGroup;
  errMess: String;
  details;
  type: String;
  constructor(private fb:FormBuilder,private route: ActivatedRoute, private router: Router, private auth: AuthorizationService, private snackbar: MatSnackBar)
  { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm()
  {
    this.Login=this.fb.group(
      {
        user : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)] ],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]]
      }
    )
  }

  onSubmit()
  {
    const log=this.Login.value;
    console.log(this.auth.authentication(log.user,log.password));
    if(this.auth.authentication(log.user,log.password))
    {
      console.log("admin kdvlyvfduyfl");
      this.router.navigate([`/admin`]);
    }
    else
    {
      this.Foruser(log.user,log.password);
    }
  }

  Foruser(username,password)
  {
    this.auth.getUser(username,password)
      .subscribe((details) => {this.details = details, this.errMess=null; this.Move()}, (errMess) => {this.errMess=errMess, this.details=null;this.Move()});
  }

  already(){
    this.router.navigate([`/signup`]);
  }

  Move()
  {
    const success = "Successfully logged in";
    const failure = "invalid username and Password";
    const action="Dismiss";
    if(this.details!=null && this.errMess==null)
    {
      this.snackbar.open(success, action, {
        duration: 1000,
      });
      this.auth.user=this.details[0];
      console.log(this.auth.user);
      this.router.navigate(['/bookevent']);
    }
    else
    {
      this.snackbar.open(failure, action, {
        duration: 1000,
      });
    }
  }
}
