import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../delete/delete.component';
import { UpdateComponent } from '../update/update.component';
import { AddComponent } from '../add/add.component';
import { Grocery } from '../grocery';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  groceries: any[] = [];
  editDialogOpen = false;
  deleteDialogOpen = false;
  editFormData: any = {};
  constructor(private grocery: Grocery, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchGroceries();
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

  openEditDialog(grocery: any) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '400px',
      data: { grocery }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  closeEditDialog(): void {
    this.editDialogOpen = false;
  }

  updateGrocery(): void {
    this.closeEditDialog();
    this.fetchGroceries();
  }

  openDeleteDialog(grocery: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '400px',
      data: { groceryName: grocery.groceryName }
    });

    dialogRef.afterClosed().subscribe(isConfirmed => {
      if (isConfirmed) {
        this.grocery.deleteGrocery(grocery.groceryId).subscribe(
          () => {
            console.log('Grocery deleted successfully');
            this.fetchGroceries();
          },
          (error) => {
            console.error('Error deleting grocery', error);
          }
        );
      }
    });
  }

  closeDeleteDialog(): void {
    this.deleteDialogOpen = false;
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchGroceries();
      }
    });
  }

}
