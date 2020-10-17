import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import "@angular/material/prebuilt-themes/indigo-pink.css";
import { Questions } from '../models/Questions';
import { Choices } from '../models/Choices';
import { CommonService } from '../common.service';
import clone from 'lodash.clonedeep'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {
testId:number
noOfQuestions:number
enableSubmit:boolean=false
questionsList:Questions[]=[]
choicesList:Choices[]=[]
subs: Subscription[] = []
choice:Choices={
     ChoiceId : 0,
     QuestionId : 0,
     ChoiceNumber : 0,
     ChoiceText : ''
}
question:Questions={
  QuestionId : 0,
    Question : '',
    CorrectAnswer : 0,
    TestId : 0,
    choicesList : []
}
addQuestionsForm=new FormGroup({
  questionControl:new FormControl('',[Validators.required]),
  choice1Control:new FormControl('',[Validators.required]),
  choice2Control:new FormControl('',[Validators.required]),
  choice3Control:new FormControl('',[Validators.required]),
  choice4Control:new FormControl('',[Validators.required]),
  choiceAnswerControl:new FormControl('',[Validators.required]),
})
questionNumber:number
  constructor(private router:ActivatedRoute,
              private commonService: CommonService,
              private route:Router) { }

  ngOnInit(): void {
    this.testId= this.router.snapshot.params.id
    this.noOfQuestions=this.router.snapshot.params.id2
    console.log("TestId",this.noOfQuestions)
    if(this.questionsList.length==(this.noOfQuestions-1))
    {
      this.enableSubmit=true
    }
    this.questionNumber=1
    
  }
  ngOnDestroy(){
    this.subs.forEach(sub => sub.unsubscribe())
  }
  onClose(){
    this.route.navigate(['/admin'])
  }
  onSubmit(){
    this.onNext()
    this.commonService.saveQuestionAndChoices(this.questionsList).subscribe(data=>{
      console.log("QuestionsData",data)
      if(data)
      this.route.navigate(['/admin'])
    })
  }
  onNext() {
    
    console.log(this.testId)
    this.question.TestId=this.testId
    this.question.Question=this.addQuestionsForm.controls.questionControl.value
    this.question.CorrectAnswer=this.addQuestionsForm.controls.choiceAnswerControl.value
    if(this.addQuestionsForm.controls.choice1Control.value)
    {
      this.choice.ChoiceText=this.addQuestionsForm.controls.choice1Control.value
      this.choice.ChoiceNumber=1
      let choice1:Choices=clone(this.choice)
      this.choicesList.push(choice1)
    }
    if(this.addQuestionsForm.controls.choice2Control.value)
    {
      this.choice.ChoiceText=this.addQuestionsForm.controls.choice2Control.value
      this.choice.ChoiceNumber=2
      let choice2:Choices=clone(this.choice)
      this.choicesList.push(choice2)
    }
    if(this.addQuestionsForm.controls.choice3Control.value)
    {
      this.choice.ChoiceText=this.addQuestionsForm.controls.choice3Control.value
      this.choice.ChoiceNumber=3
      let choice3:Choices=clone(this.choice)
      this.choicesList.push(choice3)
    }
    if(this.addQuestionsForm.controls.choice4Control.value)
    {
      this.choice.ChoiceText=this.addQuestionsForm.controls.choice4Control.value
      this.choice.ChoiceNumber=4
      let choice4:Choices=clone(this.choice)
      this.choicesList.push(choice4)
    }
    this.question.choicesList=this.choicesList
    let questionDummy:Questions=clone(this.question)
    this.questionsList.push(questionDummy)
    this.choicesList=[]
    console.log("QuestionsList",this.questionsList)
    if(this.enableSubmit==true)
    {
    this.addQuestionsForm.controls.questionControl.setValue('')
    this.addQuestionsForm.controls.choice1Control.setValue('')
    this.addQuestionsForm.controls.choice2Control.setValue('')
    this.addQuestionsForm.controls.choice3Control.setValue('')
    this.addQuestionsForm.controls.choice4Control.setValue('')
    this.addQuestionsForm.controls.choiceAnswerControl.setValue('')
    }
    if(this.questionsList.length==(this.noOfQuestions-1))
    {
      this.enableSubmit=true
    }
    this.questionNumber++
  }
}
