import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClient} from '@angular/common/http'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CommonService } from './common.service';
import { MaterialModule } from './material.module';
import { MatCardModule } from '@angular/material/card';
import { SignupComponent } from './signup/signup.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AssignStudentsDialogComponent } from './assign-students-dialog/assign-students-dialog.component';
import {MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentExamComponent } from './student-exam/student-exam.component';
import { CountdownModule } from 'ngx-countdown';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AdminDashboardComponent,
    AssignStudentsDialogComponent,
    AddQuestionsComponent,
    StudentDashboardComponent,
    StudentExamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    MatCardModule,
    MaterialModule,  
    CountdownModule
  ],
  entryComponents:[AssignStudentsDialogComponent],
  providers: [CommonService,HttpClient],
  bootstrap: [AppComponent,],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
