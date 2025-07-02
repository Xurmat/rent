import { Component } from '@angular/core';
import { HeaderCardComponent } from "./header-card/header-card.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    // HeaderCardComponent, 
    RouterOutlet,
     NgIf,
    RouterLink
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rentcar';
  isAdmin = false;
}
