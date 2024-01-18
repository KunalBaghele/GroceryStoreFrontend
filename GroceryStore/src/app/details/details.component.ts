import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Grocery } from '../grocery';
import { Init } from 'v8';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private grocery: Grocery
  ) { }
  ngOnInit() {
    this.grocery.getGroceryById(this.data.id).subscribe(() => {
      // console.log(this.data);

    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
