import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit,OnDestroy {

  displayedColumns: string[] = ['SNo', 'TestName', 'Percentage','Status','Result','StartExam'];
  customerAccount:any
  assignedTests:any
  selectedTest:any
  passPercentage:number
  subs: Subscription[] = []
  constructor(private commonServicee:CommonService,
              private route:Router) { }

  ngOnInit(): void {
    this.customerAccount=JSON.parse(localStorage.getItem("CustomerAccount"));
    const getAssignedTestValue=this.commonServicee.getAssignedTests(this.customerAccount.customerId).subscribe(data =>{
      this.assignedTests=data
    })
    this.subs.push(getAssignedTestValue)
  }
  ngOnDestroy(){
    this.subs.forEach(sub => sub.unsubscribe())
   }
  startExam(testId)
  {
    this.selectedTest=this.assignedTests.find(x=>x.testId==testId)
    this.route.navigate(['/student-exam',testId,this.selectedTest.duration])
  }

}
