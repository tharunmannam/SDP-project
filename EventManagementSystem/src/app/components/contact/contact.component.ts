import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';
import { AuthorizationService } from '../../services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent  implements OnInit {

  details;

  FeedbackForm: FormGroup=this.fb.group({
    name: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['',[Validators.required,Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
    mobile: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
    feedback: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private feedbackservice: FeedbackService,
    private authorization:AuthorizationService, private router: Router){}

  ngOnInit(){
    if(this.authorization.user!=null)
    {
      this.FeedbackForm.controls.name.setValue(this.authorization.user.username);
      this.FeedbackForm.controls.email.setValue(this.authorization.user.email);
      this.FeedbackForm.controls.mobile.setValue(this.authorization.user.mobile);
    }
    else
    {
      this.router.navigate(['/login'])
    }
    console.log(this.authorization.user);
  }

  Submit()
  {
    var feed= this.authorization.user.feedback;
    const f=this.FeedbackForm.get('feedback').value;
    this.authorization.user.feedback.push(f);
    const feedback = this.FeedbackForm.value;
    const contact= {
      _id:this.authorization.user._id,
      feedback: this.authorization.user.feedback
    }
    this.feedbackservice.postFeedback(contact)
    .subscribe((details) => {console.log(details);this.details=details;this.Move()}, (errMess) => {console.log(errMess)});
  }

  Move()
  {
    if(this.details!=null)
    {
      this.router.navigate([`/bookevent`]);
    }
    else{
      alert("something went wrong in your code");
    }
  }
}
