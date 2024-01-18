import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})

export class Grocery {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient,private snackbar:MatSnackBar) { }

  getGroceries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/groceries`);
  }

  getByType(type:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/groceries/byType?groceryType=${type}`);
  }

  getGroceryById(id:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/groceries/${id}`);
  }


  addGrocery(groceryData: any): Observable<any> {
    this.snackbar.open('Grocery Added Sucessfully','Dismiss',{
      duration:4000,
    })
    return this.http.post(`${this.apiUrl}/groceries`, groceryData);
  }

  updateGrocery(id: number, groceryData: any): Observable<any> {
    this.snackbar.open('Grocery Updated Sucessfully','Dismiss',{
      duration:4000,
    })
    return this.http.put(`${this.apiUrl}/groceries/${id}`, groceryData);
  }

  deleteGrocery(id: number): Observable<void> {
    const url = `${this.apiUrl}/groceries/${id}`;
    this.snackbar.open('Grocery Deleted Sucessfully','Dismiss',{
      duration:4000,
    })
    return this.http.delete<void>(url, { responseType: 'text' as 'json' });
  }
  
  getAvailableStates(): Observable<any[]> {
    const data = this.http.get<any[]>(`${this.apiUrl}/sources/states`);
    // console.log(data);
    return data;
  }
}
