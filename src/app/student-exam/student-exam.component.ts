import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignStudentsDialogComponent } from '../assign-students-dialog/assign-students-dialog.component';
import { CommonService } from '../common.service';
import { CountdownModule } from 'ngx-countdown';
import { AssignedTests } from '../models/AssignedTests';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-exam',
  templateUrl: './student-exam.component.html',
  styleUrls: ['./student-exam.component.css']
})
export class StudentExamComponent implements OnInit,OnDestroy {
  testId:any
  noOfQuestions:number
  questionsList:any
  question:any={}
  choices:any
  count:number=0
  duration:any
  enableSubmit:boolean=false
  examForm=new FormGroup({
    options:new FormControl('',[Validators.required])
  })
  choice1:any
  choice2:any
  choice3:any
  choice4:any
  noOfCorrectAnswers:number=0
  choosenAnswers:number[]=new Array(50)
  percentageScored:number
  noOfQuestionsNotAnwered:number=0
  isExamSubmitted:boolean=false
  resultObj:any
  isSubmitButtonClicked:boolean =false
  customerAccount:any
  testObj:any
  passPercentage:number
  isReviewQuestions:boolean=false
  subs: Subscription[] = []
  displayedColumns = ['SNo', 'NoOfQuestion', 'NoofCorrectAnswers', 'NoofWrongAnswers','NoofQuestionsUnAnswered'
  ,'PassPercentage','PercentageScored','Result'];
  constructor(private router:ActivatedRoute,
              private commonService:CommonService,
              public dialog: MatDialog,
              private route:Router) { }

  ngOnInit(): void {
    this.choosenAnswers.fill(0)
    this.testId=this.router.snapshot.params.id
    this.duration=(this.router.snapshot.params.id2)*60
    this.customerAccount=JSON.parse(localStorage.getItem("CustomerAccount"));

   const assignTestValue= this.commonService.getAssignedTests(this.customerAccount.customerId).subscribe(data =>{
      this.testObj=data.filter(x=>x.testId==this.testId)
     // this.duration=Number((this.testObj[0].duration)*60)
      this.passPercentage=this.testObj[0].passPercentage
      console.log("Test",this.testObj[0])
    })
    this.subs.push(assignTestValue)

    const questionValue=this.commonService.getQuestionsAndChoices(this.testId).subscribe(data=>{
      this.questionsList=data
      this.noOfQuestions=this.questionsList.length
      //reduce code later
      this.changeQuestion(this.count)
    })
    this.subs.push(questionValue)
  }
  ngOnDestroy(){
    this.subs.forEach(sub => sub.unsubscribe())
   }
   
  triggerFunction(event) {
    if(event.left==0)
    {
    if(this.isSubmitButtonClicked==false)
    this.showPopUp('Time Up!!!')
    }
  }
  showPopUp(submitMessage){
    const dialogRefSubmit = this.dialog.open(AssignStudentsDialogComponent, {
      width: '550px',
      height:'170px',
      position: {
        top: '180px',
        left: '420px'
      },
      data: {dialogType:'ExamSubmittedDialogue',message:submitMessage}
    });
  
    dialogRefSubmit.afterClosed().subscribe(result => {
      //if(result.navigate==true)
      this.onSubmit()

    });
 }
  onBack(){
   if(this.count==0)
    this.count=this.questionsList.length-1
   else
     this.count--
   this.changeQuestion(this.count)
  }
  onSaveAndNext(){
  if(this.examForm.dirty)
   this.choosenAnswers[this.count]=this.examForm.controls.options.value
   this.onNext()
  }
 onNext()
 {
  //  if(this.examForm.dirty)
  //  this.choosenAnswers[this.count]=this.examForm.controls.options.value
  if(this.count==this.questionsList.length-1)
    this.count=0
  else
   this.count++
  this.changeQuestion(this.count)
}

 changeQuestion(questionNumber)
 {
  this.question=this.questionsList[questionNumber].question
  this.choice1=this.questionsList[questionNumber].choicesList[0].choiceText
  this.choice2=this.questionsList[questionNumber].choicesList[1].choiceText
  this.choice3=this.questionsList[questionNumber].choicesList[2].choiceText
  this.choice4=this.questionsList[questionNumber].choicesList[3].choiceText
  this.choosenAnswers[questionNumber]>0?this.examForm.controls.options.setValue(this.choosenAnswers[questionNumber]):
  this.examForm.controls.options.setValue('')
  this.count==(this.questionsList.length-1)?this.enableSubmit=true :this.enableSubmit=false
 }
 openDialog(): void {
  const dialogRef = this.dialog.open(AssignStudentsDialogComponent, {
    width: '260px',
    height:'180px',
    position: {
      top: '180px',
      left: '520px'
    },
    data: {dialogType:'StudentExamWarningBox'}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed',result);
    if(result.navigate==true)
    this.route.navigate(['/student'])
  });
}

onSubmitClick(){
  this.isSubmitButtonClicked=true
  this.choosenAnswers[this.count]=this.examForm.controls.options.value
  this.showPopUp('Great!!!')
}
 onSubmit()
 {
    for(let i=0;i<this.questionsList.length;i++)
    {
      if(this.choosenAnswers[i]==this.questionsList[i].correctAnswer)
      this.noOfCorrectAnswers++
      if(this.choosenAnswers[i]==0)
      this.noOfQuestionsNotAnwered++
    }
    // this.percentageScored=Number(Math.round((this.noOfCorrectAnswers/this.questionsList.length)*100).toFixed(2))
    this.percentageScored=Math.round((this.noOfCorrectAnswers/this.questionsList.length)*100)
    this.isExamSubmitted=true
    
    this.resultObj=[{
      "SNo":1,
      "NoOfQuestions":this.questionsList.length,
      "NoOfCorrectAnswers":this.noOfCorrectAnswers,
      "NoofWrongAnswers":this.questionsList.length-this.noOfCorrectAnswers-this.noOfQuestionsNotAnwered,
      "NoofQuestionsunAnswered":this.noOfQuestionsNotAnwered,
      "PassPercentage":this.passPercentage,
      "PercentageScored":this.percentageScored,
      "Result":this.percentageScored>this.passPercentage?'Pass':'Fail'
    }]
    console.log(this.resultObj)

    let assignedTest: AssignedTests=
     {
     AssignedTestId :this.testObj[0].assignedTestId,
     TestId:this.testId,
     CustomerId:this.customerAccount.customerId,
     NoOfCorrectAnswers : this.noOfCorrectAnswers,
     NoOfWrongAnswers : this.questionsList.length-this.noOfCorrectAnswers-this.noOfQuestionsNotAnwered,
     Percentage : this.percentageScored,
     IsCompleted:true
     }
     console.log(assignedTest)
     let submitTest:AssignedTests[]=[]
     submitTest.push(assignedTest)
      this.commonService.saveAssignedTest(submitTest).subscribe(data=>{
      console.log(data)
    })
 }
 reviewQuestions()
 {
   this.isReviewQuestions=true
 }


}
