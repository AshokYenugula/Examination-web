import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { CommonService } from '../common.service';
import { CustomerAccount } from '../models/CustomerAccount';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm:FormGroup=new FormGroup({
    firstName:new FormControl('',[Validators.required]),
    lastName:new FormControl('',[Validators.required]),
    emailId:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required]),
    phoneNumber:new FormControl('',[Validators.required]),
    role:new FormControl('',[Validators.required]),
  })
  customerAccount:CustomerAccount={
    CustomerId :undefined,
FirstName:undefined,
LastName :undefined,
EmailId :undefined,
Password: undefined,
PhoneNumber :undefined,
Role :undefined
  }
message:string=''
action:string=''
  constructor( private router: Router,
              private route:ActivatedRoute,
              private commonService: CommonService,
              private _snackBar: MatSnackBar){ }

  ngOnInit(): void {
  }
  onSingUp(){
    if(this.signupForm.valid){
      debugger;
      this.customerAccount.CustomerId=0
      this.customerAccount.FirstName=this.signupForm.controls.firstName.value
      this.customerAccount.LastName=this.signupForm.controls.lastName.value
      this.customerAccount.EmailId=this.signupForm.controls.emailId.value
      this.customerAccount.Password=this.signupForm.controls.password.value
      this.customerAccount.PhoneNumber=this.signupForm.controls.phoneNumber.value
      if(this.signupForm.controls.role.value=="admin") 
      this.customerAccount.Role=1
      else
      this.customerAccount.Role=2
      console.log("Customer",this.customerAccount)
      this.commonService.saveCustomer(this.customerAccount).subscribe(data=>{
        if(data>0){
          this.message='Hurreyyy Registered Successfully'
          this.action='Please Login Now'
          this._snackBar.open(this.message, this.action, {
      duration: 3000,
    });
          this.router.navigate([''])
        }
      })
        

      
    }
  }

}
