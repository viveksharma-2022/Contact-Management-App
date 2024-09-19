import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetContactsComponent } from './Contact/get-contacts/get-contacts.component';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSearchFilterModule } from 'ngx-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    GetContactsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,  
    NgxSearchFilterModule,  
  ],
  providers: [HttpClient,provideHttpClient(withFetch()),ReactiveFormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
