import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../../services/authorization.service';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { DialogPaymentComponent } from '../dialog-payment/dialog-payment.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-bookevent',
  templateUrl: './bookevent.component.html',
  styleUrls: ['./bookevent.component.css']
})
export class BookeventComponent implements OnInit {

  events;
  places;
  equipments;
  foods;
  foodtypes;
  event;
  err;
  result;
  price=50000;
  hide1=true;
  hide2=false;
  BookForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    BookingId: ['', [Validators.required]],
    mobile: ['', Validators.required],
    Event_Type: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    Event_Place: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    No_of_Guests:['', [Validators.required]],
    Event_Date: ['', [Validators.required]],
    Equipment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    Food: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    Food_type: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    Seats: ['', [Validators.required]]
  });

  User;
  constructor(private fb: FormBuilder, private auth: AuthorizationService, private bookser: BookService, private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.auth.user==null)
    {
      this.router.navigate(['/home']);
    }
    this.events= ['Marriage', 'Birthday Party', 'Function'];
    this.places=['tenali', 'Vijayawada', 'Guntur', 'mangalagirir'];
    this.equipments=['DJ', 'Stage','Both'];
    this.foods=['Breakfast','Lunch','Snacks','Dinner','All the above'];
    this.foodtypes=['Veg','Non-Veg','Both'];
    this.User=this.auth.user;
    this.BookForm.controls.username.setValue(this.User.username);
    this.BookForm.controls.BookingId.setValue(1);
    this.BookForm.controls.mobile.setValue(this.User.mobile);
  }

  submit(){
    this.payment();
  }

  payment()
  {
    const dialogRef = this.dialog.open(DialogPaymentComponent, {
      width: '350px',
      data: {price: this.price}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.result=result;
      this.transfer(result);
    });
  }

  transfer(reslut)
  {
    if(reslut=="yes")
    {
      this.bookser.Bookevent(this.BookForm.value)
      .subscribe((details) => { this.event=details, this.err=null,console.log(details), this.move()},  (err) => { this.err=err;this.event=null; this.move()});
    }
    else
    {
      this.router.navigate(['/home']);
    }
  }
  move()
  {
    this.hide1=false;
    this.hide2=true;
    setTimeout(() => {
      this.hide1=true;
      this.hide2=false;
    },5000);

  }
}
