import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../delete/delete.component';
import { UpdateComponent } from '../update/update.component';
import { AddComponent } from '../add/add.component';
import { Grocery } from '../grocery';
import { DetailsComponent } from '../details/details.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { ViewprofileComponent } from '../viewprofile/viewprofile.component';
import { Location } from '@angular/common';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  groceries: any[] = [];
  groceriesByType: any[] = [];
  groceryId!: number;
  search: string = "";
  byType: boolean = false;
  all: boolean = false;
  displayedColumns: string[] = ['groceryName', 'costPerItem', 'itemsAvailable', 'groceryType', 'stateName','actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private grocery: Grocery, private dialog: MatDialog, private router: Router,) {
    // this.all = true;
    this.fetchGroceries();
    this.dataSource = new MatTableDataSource(this.groceries);

  }

  ngOnInit(): void {
    this.fetchGroceries();
    console.log("onInit");

  }

  getGroceryByType(searchText: string) {
    // console.log(searchText);
    // this.all = false;
    // this.byType = true;
    this.search = searchText;
    this.grocery.getByType(searchText).subscribe(
      (data: any) => {
        this.groceriesByType = data;
        // console.log(this.groceriesByType);
        this.fetchGroceries();
      },
      (error) => {
        console.error('Error fetching groceries', error);
      }
    );
  }


  fetchGroceries(): void {
    this.grocery.getGroceries().subscribe(
      (data) => {
        this.groceries = data;
        // console.log(this.dataSource);
      },
      (error) => {
        console.error('Error fetching groceries', error);
      }
    );
  }


  openEditDialog(groceryId: number, grocery: any) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      data: { id: groceryId, data: grocery }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchGroceries();
      // this.all = true;
      // this.byType = false;
    });
  }



  openDetailsDialog(groceryId: number, grocery: any) {
    const dialogRef = this.dialog.open(DetailsComponent, {
      data: { id: groceryId, data: grocery }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchGroceries();
    });
  }


  openDeleteDialog(grocery: any) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: { groceryName: grocery.groceryName }
    });

    dialogRef.afterClosed().subscribe(isConfirmed => {
      if (isConfirmed) {
        this.grocery.deleteGrocery(grocery.groceryId).subscribe(
          () => {
            console.log('Grocery deleted successfully');
            // this.all = true;
            // this.byType = false;
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
        // this.all = true;
        // this.byType = false;
      }
    });
  }
  openProfileDialog(groceryId: number, grocery: any) {
    // Get the current user
    const currentUser = this.grocery.getCurrentUser();

    // Open the profile dialog and pass current user as data
    const dialogRef = this.dialog.open(ViewprofileComponent, {
      data: { currentUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchGroceries();
    });
  }


  logout() {
    this.grocery.logout();
    this.router.navigate(['']);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.fetchGroceries();
      this.dataSource = new MatTableDataSource(this.groceries);
      this.dataSource.paginator = this.paginator; // Assign paginator after data is loaded
  }


}

