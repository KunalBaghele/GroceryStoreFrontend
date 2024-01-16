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
  item:any;
  src:any;

  constructor(
    private dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private grocery: Grocery
  ) { }

  ngOnInit() {
    // console.log(this.data);
    this.editForm= new FormGroup({
      groceryName: new FormControl(this.data.data.groceryName,Validators.required),
      costPerItem: new FormControl(this.data.data.costPerItem,Validators.required),
      groceryType: new FormControl(this.data.data.groceryType,Validators.required),
      groceryAmounts:new FormGroup( {

        itemsAvailable:new FormControl(this.data.data.groceryAmounts.itemsAvailable,Validators.required)

      }),
      grocerySource: new FormGroup({
        sourceId:new FormControl(this.data.data.grocerySource.sourceId,Validators.required),
      }),
    });
    // this.editForm = new FormGroup({
    //   groceryName: new FormControl('', Validators.required),
    //   costPerItem: new FormControl('', Validators.required),
    //   groceryType: new FormControl('', Validators.required)
    // });

    // this.groceryAmounts = new FormGroup({
    //   itemsAvailable: new FormControl('', Validators.required),

    // });
    // this.grocerySource = new FormGroup({
    //   sourceId: new FormControl('', Validators.required)
    // });

    // if (this.inputData.id > 0) {
    //   this.setFormData(this.inputData.id);
    // }

    this.grocery.getAvailableStates().subscribe((states) => {
      this.states = states;
    });
  }

  onSave() {
     this.item=this.editForm.get('groceryAmounts');
     this.src=this.editForm.get('grocerySource');
    if (this.editForm && this.editForm.valid) {
      const updatedGroceryData = {
        groceryName: this.editForm.value.groceryName,
        costPerItem: this.editForm.value.costPerItem,
        groceryType: this.editForm.value.groceryType,
        groceryAmounts: {

          itemsAvailable: this.item.value.itemsAvailable,
        },
        grocerySource: {
          sourceId: this.src.value.sourceId,
        },
      };
      if (this.data.id) {
        this.grocery.updateGrocery(this.data.id, updatedGroceryData).subscribe(() => {
          this.dialogRef.close(true);
          this.grocery.getGroceries();
        });
      } else {
        console.error('Invalid ID:', this.data.id);
      }
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
