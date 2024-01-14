import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Grocery } from '../grocery';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {
  editForm!: FormGroup;
  groceryAmounts!: FormGroup;
  grocerySource!: FormGroup;
  states: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private grocery: Grocery
  ) { }
//
  ngOnInit() {
    this.editForm = this.fb.group({
      groceryName: [this.data.groceryName, Validators.required],
      costPerItem: [this.data.costPerItem, Validators.required],
      itemsAvailable: [this.data.groceryAmounts.itemsAvailable, Validators.required],
      stateName: [this.data.grocerySource.stateName, Validators.required],
    });
    this.grocery.getAvailableStates().subscribe((states) => {
      this.states = states;
    });
  }

  onSave() {
    if (this.editForm.valid) {
      const updatedGroceryData = {
        groceryName: this.editForm.value.groceryName,
        costPerItem: this.editForm.value.costPerItem,
        groceryAmounts: {
          itemsAvailable: this.editForm.value.itemsAvailable,
        },
        grocerySource: {
          stateName: this.editForm.value.stateName,
        },
      };

      this.grocery.updateGrocery(this.data.id, updatedGroceryData).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
