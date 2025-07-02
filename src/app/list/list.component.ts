import { Component, inject, OnInit } from '@angular/core';
import { CarService } from '../services/car.service'; 
import { Reservation } from '../models/reservation';
import { RouterLink } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [RouterLink, NgFor, NgIf, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent  implements OnInit{
  reservationList: Reservation[] = [];
  reservationService = inject(CarService);

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations() {
    this.reservationList = this.reservationService.getReservations();
  }

  deleteReservation(id: number): void {
    this.reservationService.deleteReservation(id);
    this.loadReservations();
  }

  accept(id: number): void {
    const item = this.reservationService.getReservationById(id);
    if (item) {
      this.reservationService.updateReservation(id, {
        ...item,
        status: 'accepted',
      });
      this.loadReservations();
    }
  }

  cancel(id: number): void {
    const item = this.reservationService.getReservationById(id);
    if (item) {
      this.reservationService.updateReservation(id, {
        ...item,
        status: 'cancelled',
      });
      this.loadReservations();
    }
  }

  trackById(index: number, item: Reservation): number {
    return item.id;
  }
}
