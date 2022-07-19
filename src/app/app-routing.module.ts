import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WarehousesComponent } from './pages/warehouses/warehouses.component';
import { ItemsComponent } from './pages/items/items.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'warehouses',
    component: WarehousesComponent,
  },
  {
    path: 'items',
    component: ItemsComponent,
  },
  {
    path: '**',
    redirectTo: 'warehouses',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
