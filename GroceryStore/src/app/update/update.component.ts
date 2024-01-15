import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  groceries: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private grocery: Grocery
  ) { }

  ngOnInit() {
    const id = this.data.groceryId;
    this.editForm = new FormGroup({
      groceryName: new FormControl(),
      costPerItem: new FormControl()
    });

    this.groceryAmounts = new FormGroup({
      itemsAvailable: new FormControl(),

    });
    this.grocerySource = new FormGroup({
      stateName: new FormControl(),

    });

    this.grocery.getAvailableStates().subscribe((states) => {
      this.states = states;
    });
  }

  onSave() {
    if (this.editForm && this.editForm.valid) {
      const updatedGroceryData = {
        groceryName: this.editForm.value.groceryName,
        costPerItem: this.editForm.value.costPerItem,
        groceryAmounts: {
          itemsAvailable: this.groceryAmounts.value.itemsAvailable,
        },
        grocerySource: {
          stateName: this.grocerySource.value.stateName,
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

  fetchGroceries(): void {
    this.grocery.getGroceries().subscribe(
      (data) => {
        this.groceries = data;
      },
      (error) => {
        console.error('Error fetching groceries', error);
      }
    );
  }
}
