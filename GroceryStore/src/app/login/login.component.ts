import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Grocery } from '../grocery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  name:string="";

  constructor(private router: Router,private grocery:Grocery) { }
  login(): void {
    this.grocery.login(this.email, this.password).subscribe(
      (user) => {
        // Set current user in the service
        this.grocery.setCurrentUser(user);

        // Fetch additional user details and store in local storage
        this.grocery.fetchUserDetails();

        // Store user information in local storage
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Navigate to home page
        this.router.navigate(['/home']);
      },
      (error) => {
        alert('Invalid email or password');
      }
    );
  }
}
