import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Grocery {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getGroceries(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/groceries`);
  }

  addGrocery(groceryData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/groceries`, groceryData);
  }

  updateGrocery(id: number,groceryData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/groceries`, groceryData);
  }

  deleteGrocery(id: number): Observable<void> {
    const url = `${this.apiUrl}/groceries/${id}`;
    return this.http.delete<void>(url, { responseType: 'text' as 'json' });
  }
  getAvailableStates(): Observable<any[]> {
const data=this.http.get<any[]>(`${this.apiUrl}/sources/states`);
// console.log(data);
    return data;
  }
}
