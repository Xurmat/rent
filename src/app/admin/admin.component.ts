import { Component } from '@angular/core';
import { Reservation } from '../models/reservation';
import { CarService } from '../services/car.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [
    NgFor,
    NgIf,
    
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  pendingReservations: Reservation[] = [];

  constructor(private carService: CarService) {
    this.pendingReservations = this.carService.getReservations()
      .filter(r => r.status === 'pending' || !r.status); 
  }

  accept(res: Reservation) {
    res.status = 'accepted';
    this.carService.updateReservation(res.id, res);
    this.removeFromList(res.id);
  }

  cancel(res: Reservation) {
    res.status = 'cancelled';
    this.carService.updateReservation(res.id, res);
    this.removeFromList(res.id);
  }

  private removeFromList(id: number) {
    this.pendingReservations = this.pendingReservations.filter(r => r.id !== id);
  }
}
