import { Component } from '@angular/core';
import { Grocery } from '../grocery';
import { MatDialog } from '@angular/material/dialog';
import { ViewprofileComponent } from '../viewprofile/viewprofile.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Fix the typo here, use 'styleUrls' instead of 'styleUrl'
})
export class NavbarComponent {

  constructor(private grocery: Grocery, private dialog: MatDialog) {
    // this.user=this.grocery.getCurrentUser();
    // console.log(this.user);

  }

  openProfileDialog() {
    // Fetch user details if not available in the service
    if (!this.grocery.getCurrentUser()) {
      this.grocery.fetchUserDetails();
    }

    const currentUser = this.grocery.getCurrentUser();
    // Pass currentUser as data to ViewprofileComponent
    const dialogRef = this.dialog.open(ViewprofileComponent, {
      data: { currentUser }

    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result if needed
    });
  }
}
