import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../delete/delete.component';
import { UpdateComponent } from '../update/update.component';
import { AddComponent } from '../add/add.component';
import { Grocery } from '../grocery';
import { DetailsComponent } from '../details/details.component';
import { empty } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  groceries: any[] = [];
  groceriesByType: any[] = [];
  groceryId!: number;
  search: string = "";
  byType:boolean=false;
  all:boolean=false;
  constructor(private grocery: Grocery, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.all=true;
    this.fetchGroceries();
  }

  getGroceryByType(searchText: string) {
    // console.log(searchText);
    this.all=false;
    this.byType=true;

    this.search = searchText;
    this.grocery.getByType(searchText).subscribe(
      (data: any) => {
        this.groceriesByType = data;
        // console.log(this.groceriesByType);
      },
    );
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



  openEditDialog(groceryId: number, grocery: any) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '400px',
      data: { id: groceryId, data: grocery }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchGroceries();
    });
  }



  openDetailsDialog(groceryId: number, grocery: any) {
    const dialogRef = this.dialog.open(DetailsComponent, {
      width: '400px',
      data: { id: groceryId, data: grocery }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchGroceries();
    });
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



  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchGroceries();
      }
    });
  }



}
