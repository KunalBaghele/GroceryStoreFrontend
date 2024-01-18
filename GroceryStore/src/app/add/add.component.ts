import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Grocery } from '../grocery';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {
  groceryForm!: FormGroup;
  groceryAmounts!: FormGroup;
  grocerySource!: FormGroup;
  states: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddComponent>,
    private fb: FormBuilder,
    private grocery: Grocery
  ) { }

  ngOnInit() {
    this.groceryAmounts = this.fb.group({
      itemsAvailable: ['', Validators.required]
    });

    this.grocerySource = this.fb.group({
      stateName: ['', Validators.required]
    });

    this.groceryForm = this.fb.group({
      groceryName: ['', Validators.required],
      costPerItem: ['', Validators.required],
      groceryType: ['', Validators.required],
      groceryAmounts: this.groceryAmounts,
      grocerySource: this.grocerySource,
    });

    this.grocery.getAvailableStates().subscribe((states) => {
      this.states = states;
    });
  }


  onSubmit() {
    if (this.groceryForm.valid) {
      this.grocery.addGrocery(this.groceryForm.value).subscribe(
        () => {
          // console.log('Grocery added successfully');
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error adding grocery', error);
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
