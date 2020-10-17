import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AssignStudentsDialogComponent } from '../assign-students-dialog/assign-students-dialog.component';
import { CommonService } from '../common.service';
import { CustomerAccount } from '../models/CustomerAccount';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent implements OnInit,OnDestroy {
  isLoading:boolean=true
  customerAccount:any
  tests:any
  noOfQuestions:number
  selectedTest:any
  subs: Subscription[] = []
  constructor(private route: ActivatedRoute,
              private commonService:CommonService,
              public dialog: MatDialog,
              private router:Router) { }

  ngOnInit(): void {
    this.customerAccount=JSON.parse(localStorage.getItem("CustomerAccount")) 
    console.log(this.customerAccount)
    this.getTests()
  }
  ngOnDestroy(){
    this.subs.forEach(sub => sub.unsubscribe())
  }

  //Method to open Assign students
  openDialog(testId?:number): void {
    console.log("AdminDashborad",testId)
    const dialogRef = this.dialog.open(AssignStudentsDialogComponent, {
      width: '300px',
      height:'350px',
      position: {
        top: '120px',
        left: '400px'
      },
      data: {testId:testId,customerId:this.customerAccount.customerId,dialogType:testId>0?'AssignStudents':'AddTest'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      if(result.load==true)
      this.getTests()
    });
  }
  getTests(){
   const testvalue= this.commonService.getTests(this.customerAccount.customerId).subscribe(data=>{
      this.isLoading=false
      this.tests=data
    console.log(this.tests)
    })
    this.subs.push(testvalue)
  }
  displayedColumns: string[] = ['SNo', 'TestName', 'AddQuestions', 'AssignStudents'];

  //Add Questions
  addQuestions(testId){
    this.selectedTest= this.tests.find(x=>x.testId===testId)
    const questionValue=this.commonService.getQuestionsAndChoices(testId).subscribe(data=>{
      if(data.length>0)
      {
        const dialogRef = this.dialog.open(AssignStudentsDialogComponent, {
          width: '370px',
          height:'165px',
          position: {
            top: '180px',
            left: '530px'
          },
          data: {dialogType:'AddQuestionsDialog'}
        });
      
        dialogRef.afterClosed()
      }
      else{
        console.log(this.selectedTest.noOfQuestions)
     
    this.router.navigate(['/add-questions', testId,this.selectedTest.noOfQuestions])
      }
    })
    this.subs.push(questionValue)
  }
    
}