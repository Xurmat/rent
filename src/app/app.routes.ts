import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { CreateCarListComponent } from './create-car-list/create-car-list.component';
import { ListComponent } from './list/list.component';
import { AdminComponent } from './admin/admin.component';
import { CarDetailComponent } from './home-page/car-detail/car-detail.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'new', component: CreateCarListComponent},
    {path: 'list', component: ListComponent},
    {path: 'edit/:id', component:CreateCarListComponent},
    { path: 'cars/:id', component: CarDetailComponent },
    { path: 'admin', component: AdminComponent },
];
