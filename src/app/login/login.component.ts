import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {CustomerAccount} from 'src/app/models/CustomerAccount';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy  {

email:string=''
password:string=''
navigateAdmin:boolean =false
navigatStudent:boolean =false
navigateToSignUp:boolean =false
customerAccount:CustomerAccount
loginForm: FormGroup = new FormGroup({
  userNameControl: new FormControl('', [Validators.required,Validators.email]),
  passwordControl: new FormControl('', Validators.required),
})
message:string=''
action:string=''
subs: Subscription[] = []
constructor(
    private commonservice:CommonService,
    private router: Router,
    private route:ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }
  ngOnDestroy(){
    this.subs.forEach(sub => sub.unsubscribe())
  }


 onSubmit(){
   this.email=this.loginForm.controls.userNameControl.value
   this.password=this.loginForm.controls.passwordControl.value
 const loginval =this.commonservice.getLogin(this.email,this.password).subscribe(data =>{
  if(data.customerId>0)
  {
    this.message='Login Successful!!!'
    this.action='Good Luck'
    this._snackBar.open(this.message, this.action, {
      duration: 2000,
    });
    console.log(data)
    localStorage.setItem("CustomerAccount",JSON.stringify(data))
    if(data.role==1)
    this.router.navigate(['/admin'])
    else 
    this.router.navigate(['/student'])
  }
  else{
    this.message='Login Failed'
    this.action='Invalid Username or Password'
    this._snackBar.open(this.message, this.action, {
      duration: 2000,
    });
  }
 })
 this.subs.push(loginval)
 }

}
