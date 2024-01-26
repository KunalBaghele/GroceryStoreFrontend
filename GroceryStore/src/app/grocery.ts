import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isPlatformServer } from '@angular/common';


@Injectable({
  providedIn: 'root'
})

export class Grocery {
  private apiUrl = 'http://localhost:8080/api';
  private currentUser: any;
  private email: string = "";

  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Retrieve user information from localStorage if available and on the client side
    if (!isPlatformServer(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
  }

  getGroceries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/groceries`);
  }

  getByType(type: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/groceries/byType?groceryType=${type}`);
  }

  getGroceryById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/groceries/${id}`);
  }


  addGrocery(groceryData: any): Observable<any> {
    this.snackbar.open('Grocery Added Sucessfully', 'Dismiss', {
      duration: 4000,
    })
    return this.http.post(`${this.apiUrl}/groceries`, groceryData);
  }

  updateGrocery(id: number, groceryData: any): Observable<any> {
    this.snackbar.open('Grocery Updated Sucessfully', 'Dismiss', {
      duration: 4000,
    })
    return this.http.put(`${this.apiUrl}/groceries/${id}`, groceryData);
  }

  deleteGrocery(id: number): Observable<void> {
    const url = `${this.apiUrl}/groceries/${id}`;
    this.snackbar.open('Grocery Deleted Sucessfully', 'Dismiss', {
      duration: 4000,
    })
    return this.http.delete<void>(url, { responseType: 'text' as 'json' });
  }

  getAvailableStates(): Observable<any[]> {
    const data = this.http.get<any[]>(`${this.apiUrl}/sources/states`);
    // console.log(data);
    return data;
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    this.email=email;
    // console.log(body);
    // this.fetchUserDetails();
    return this.http.post(`${this.apiUrl}/login/validate`, body);
  }

  getAdminByEmail(email:string): Observable<any> {
    const body = { email: this.email };
        return this.http.get(`${this.apiUrl}/login?email=${this.email}`);
  }



  fetchUserDetails(): void {
    this.getAdminByEmail(this.email).subscribe(
      (user) => {
        // console.log(user);
        this.setCurrentUser(user);
        // Store user information in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
      },
      (error) => {
        console.error('Error fetching user details', error);
      }
    );
  }

  setCurrentUser(user: any): void {
    this.currentUser = user;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

  logout(): void {
    // Clear user information from localStorage
    localStorage.removeItem('currentUser');
    // Reset the current user in the service
    this.currentUser = null;
  }
}
