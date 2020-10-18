import { Component, Inject, OnInit,Injectable, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CommonService } from '../common.service';
import { AssignedTests } from '../models/AssignedTests';
import { CustomerAccount } from '../models/CustomerAccount';
import { Test } from '../models/Test';

@Component({
  selector: 'app-assign-students-dialog',
  templateUrl: './assign-students-dialog.component.html',
  styleUrls: ['./assign-students-dialog.component.css']
})
export class AssignStudentsDialogComponent implements OnInit,OnDestroy {

  dilogBoxType:string=''
  testForm:FormGroup=new FormGroup({
    testName:new FormControl('',[Validators.required]),
    duration:new FormControl('',[Validators.required]),
    noOfQuestions:new FormControl('',[Validators.required]),
    percentage:new FormControl('',[Validators.required])
  })
  testObj: Test={
    TestId :undefined,
    TestName :undefined,
    Duration :undefined,
    NoOfQuestions :undefined,
    CustomerId :undefined,
    Percentage:undefined
    }
    selectedStudentsList:AssignedTests[]=[]
    customerObj:CustomerAccount
    studentsToBeAssigned:any
    customerAccount:any
    examSubmitMessage:string
    subs: Subscription[] = []
  constructor( public dialogRef: MatDialogRef<AssignStudentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private commonService: CommonService) { }

  ngOnInit(): void {
    //this.dialogRef.updatePosition({ top: '50px', left: '50px' });
    this.customerAccount=JSON.parse(localStorage.getItem("CustomerAccount")) 
    console.log("AssignStudents",this.customerAccount)
    this.dilogBoxType=this.data.dialogType
    if(this.data.dialogType=='AssignStudents')
    {
      this.dialogRef.updateSize('300px','170px' )
      const studentValue=this.commonService.GetStudentstobeAssigned(this.data.testId).subscribe(e=>{
        this.studentsToBeAssigned=e
      })
      this.subs.push(studentValue)
    }
    if(this.data.message)
    {
      this.examSubmitMessage=this.data.message
    }
  }
  ngOnDestroy(){
    this.subs.forEach(sub => sub.unsubscribe())
  }
  onYesClick():void{
    this.dialogRef.close({navigate:true})
  }
  onNoClick(): void {
    this.dialogRef.close({load:false});
  }
  selectedStudents(event:any){
    if (event.target.checked) {
     let assignedTests: AssignedTests=
     {
     AssignedTestId : 0,
     TestId:this.data.testId,
     CustomerId:event.target.value,
     NoOfCorrectAnswers : 0,
     NoOfWrongAnswers : 0,
     Percentage : 0,
     IsCompleted:false
     }
     this.selectedStudentsList.push(assignedTests)
     //console.log("NewSelectedStudents",this.selectedStudentsList)
    } else {
      this.selectedStudentsList= this.selectedStudentsList.filter(e=>e.CustomerId==event.target.value)
    }
  }

  assignStudents(){
    this.commonService.saveAssignedTest(this.selectedStudentsList).subscribe(data=>{
      console.log("ReturnData",data)
    })
    this.dialogRef.close({load:true});
  }

  //For Add Test
  onAddTest(){
    if(this.testForm.valid){
      this.testObj.TestId=0
      this.testObj.TestName=this.testForm.controls.testName.value
      this.testObj.Duration=this.testForm.controls.duration.value
      this.testObj.NoOfQuestions=this.testForm.controls.noOfQuestions.value
      this.testObj.CustomerId=this.data.customerId
      this.testObj.Percentage=this.testForm.controls.percentage.value
      console.log("TestData Service",this.testObj)
      this.commonService.saveTest(this.testObj).subscribe(data=>{
        console.log("retun data",data)
        this.dialogRef.close({load:true});
      } )
    }
  }
}
