import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  hide = true;
  constructor(private router: Router) { }
  login(): void {
    if (this.email === 'k@gmail.com' && this.password === 'kunal') {
      this.router.navigate(['/home']);
    } else {
      alert('Invalid email or password');
    }
  }
}
