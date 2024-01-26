import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { DetailsComponent } from './details/details.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';


@NgModule({
  declarations: [
    AppComponent, HomeComponent, AddComponent, UpdateComponent, DeleteComponent, NavbarComponent, LoginComponent, DetailsComponent, ViewprofileComponent
  ],
  imports: [
    BrowserModule, MatDialogTitle, MatButtonModule, MatCardModule, FormsModule,
    MatFormFieldModule, ReactiveFormsModule, MatSelectModule, MatSnackBarModule,
    AppRoutingModule, HttpClientModule, BrowserAnimationsModule, MatDialogActions,
    MatDialogClose, MatDialogContent, MatInputModule, MatIconModule, MatPaginatorModule,
    MatSortModule, MatTableModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
