import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Grocery } from '../grocery';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  constructor(
    private dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private grocery: Grocery
  ) { }
  ngOnInit() {
    this.grocery.getGroceryById(this.data.id).subscribe(() => {
      console.log(this.data);

    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
