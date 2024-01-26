import { Component, OnInit } from '@angular/core';
import { Grocery } from './grocery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'GroceryStore';
  constructor(private grocery:Grocery){

  }
  ngOnInit(){
    // this.grocery.getGroceries();
  }
}
