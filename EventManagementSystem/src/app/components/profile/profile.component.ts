import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  mediaSub: Subscription;
  deviceXs: boolean;
  public user;
  public username;
  public email;
  public mobile;
  public address;
  public password;
  public disableemail=true;
  public disablemobile=true;
  public disableaddress=true;
  public newpass;
  public disablepassword=true;
  public newpassword;
  public details;

  constructor( private authorization: AuthorizationService, private router: Router){}

  ngOnInit(){

    if(this.authorization.user==null)
    {
      this.router.navigate(['/login']);
    }

    if(this.authorization.user!=null)
    {
      this.user=this.authorization.user;

      this.username=this.user.username;
      this.email=this.user.email;
      this.mobile=this.user.mobile;
      this.address=this.user.address;
      this.password=this.user.password;
    }
  }

  editemail()
  {
    this.disableemail=false;
  }

  editmobile()
  {
    this.disablemobile=false;
  }

  editaddress()
  {
    this.disableaddress=false;
  }

  onBlurMethod()
  {
    if(this.newpass==this.password)
    {
      this.disablepassword=false;
    }
  }

  Submit()
  {
    this.password=this.newpassword;
    const details= {
      id: this.authorization.user._id,
      username: this.username,
      email: this.email,
      mobile: this.mobile,
      address: this.address,
      password: this.password
    };

    console.log(details);
    if(this.mobile)
    this.authorization.updateUser(details)
    .subscribe((details) => {
      this.details=details;
      this.authorization.user=details;
      console.log(details);
    });
    this.router.navigate([`/bookevent`]);
  }

}

