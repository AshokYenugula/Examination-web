import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { CustomerAccount } from './models/CustomerAccount';
import { Observable } from 'rxjs';
import { Test } from './models/Test';
import { AssignedTests } from './models/AssignedTests';
import { Questions } from './models/Questions';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

   httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json; charset=utf-8'})
    };

  baseUrl="https://examinationwebapi.azurewebsites.net/api/"
  constructor(
    private httpClient :HttpClient
  ) { }

  getLogin(emailId:string,password:string) : Observable<any>
  {
    return this.httpClient.get<CustomerAccount>(this.baseUrl + 'Examination/GetLogin/'+ emailId + '/' +password)
  }
  saveCustomer(custObj:CustomerAccount):Observable<any>
  {
    return this.httpClient.post<any>(this.baseUrl+ 'Examination/SaveCustomerAccount/',custObj,this.httpOptions)
  }
  getTests(customerId: number):Observable<any>
  {
    return this.httpClient.get<any>(this.baseUrl+ 'Admin/GetTests/'+ customerId)
  }
  saveTest(testObj:Test):Observable<any>
  {
    return this.httpClient.post<any>(this.baseUrl+ 'Admin/SaveTest/',testObj,this.httpOptions)
  }
  GetStudentstobeAssigned(testId:number):Observable<any>
  {
    return this.httpClient.get<any>(this.baseUrl+ 'Admin/GetStudentstobeAssigned/'+ testId)
  }
  saveAssignedTest(assignedTestObj:AssignedTests[]):Observable<any>
  {
    return this.httpClient.post<any>(this.baseUrl+ 'Admin/SaveAssignedTests/',assignedTestObj,this.httpOptions)
  }
  saveQuestionAndChoices(questionsList:Questions[]):Observable<any>
  {
    return this.httpClient.post<any>(this.baseUrl+ 'Examination/SaveQuestionAndChoices/',questionsList,this.httpOptions)
  }
  getAssignedTests(customerId:number):Observable<any>
  {
    return this.httpClient.get<any>(this.baseUrl+'Examination/GetAssignedTests/'+customerId)
  }
  getQuestionsAndChoices(testId:number):Observable<any>
  {
    return this.httpClient.get<any>(this.baseUrl+'Examination/GetQuestionsAndChoices/'+testId)
  }
}
