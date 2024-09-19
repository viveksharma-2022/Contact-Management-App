import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetContactsComponent } from './Contact/get-contacts/get-contacts.component';

const routes: Routes = [
  {
    path: "", component: GetContactsComponent,
},
{
    path: "contacts", component: GetContactsComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
