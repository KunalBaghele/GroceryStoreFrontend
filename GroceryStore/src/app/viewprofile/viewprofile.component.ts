import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Grocery } from '../grocery';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrl: './viewprofile.component.css'
})
export class ViewprofileComponent implements OnInit {

  currentUser:any;

  constructor(
    private dialogRef: MatDialogRef<ViewprofileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private grocery: Grocery
  ) { }

  ngOnInit(): void {
    this.currentUser = this.data.currentUser;
  }
  onCancel() {
    this.dialogRef.close();
  }

}
