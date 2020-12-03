import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public abc=false;
  constructor(private auth: AuthorizationService, private router: Router) { }

  ngOnInit(): void {
    if(this.auth.user!=null)
    {
      this.abc=true;
    }
    else
    {
      this.abc=false;
    }
  }

  logout()
  {
    this.auth.user=null;
    this.router.navigate(['login']);
  }

}
