import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AssignStudentsDialogComponent } from './assign-students-dialog/assign-students-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Examination';
  constructor(
    private route: Router,
    private matDialog:MatDialog
  ) { }

  goToLogin(){
    const dialogRef =this.matDialog.open(AssignStudentsDialogComponent,{
      width: '300px',
    height:'180px',
    position: {
      top: '180px',
      left: '520px'
    },
    data: {dialogType:'Logout'}
    })
    dialogRef.afterClosed().subscribe(result=>{
      if(result.navigate==true)
      {
        localStorage.clear()
        this.route.navigate([''])
      }
    })
  }
}
