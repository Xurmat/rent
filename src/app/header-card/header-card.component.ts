import { Component, ViewEncapsulation } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from "../home-page/home-page.component";
import { CreateCarListComponent } from "../create-car-list/create-car-list.component";
import { ListComponent } from "../list/list.component";
import { AdminComponent } from "../admin/admin.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header-card',
    imports: [RouterOutlet,CommonModule, TabsModule, HomePageComponent, CreateCarListComponent, ListComponent, AdminComponent],
  templateUrl: './header-card.component.html',
  styleUrl: './header-card.component.scss',
})
export class HeaderCardComponent {
isAdmin = true;
}
