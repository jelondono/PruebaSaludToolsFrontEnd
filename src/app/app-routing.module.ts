import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CRUDComponent } from "./components/crud/crud.component";
const routes: Routes = [

  {
    path: '',
    component: CRUDComponent,
  },
  {
    path: 'crud',
    component: CRUDComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
