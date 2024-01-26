import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if 'currentUser' exists in local storage
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/home']);
      return true;
    }

    // If 'currentUser' is not present, navigate to the login page
    this.router.navigate(['']);
    return false;
  }
}
