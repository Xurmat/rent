import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../models/reservation';
import { isPlatformBrowser } from '@angular/common';
import { Car } from '../models/car'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>('assets/data/cars.json');
  }

  getCarById(id: number): Observable<Car | undefined> {
    return this.getCars().pipe(
      map(cars => cars.find(car => car.id === id))
    );
  }

  private reservations: Reservation[] = [];
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private isBrowser!: boolean;

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      const savedReservations = localStorage.getItem('reservations');
      this.reservations = savedReservations ? JSON.parse(savedReservations) : [];
    } else {
      this.reservations = [];
    }
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservationById(id: number): Reservation | undefined {
    return this.reservations.find(reservation => reservation.id === id);
  }

  addReservation(reservation: Reservation): void {
    reservation.status = 'pending';
    this.reservations.push(reservation);
    if (this.isBrowser) {
      localStorage.setItem('reservations', JSON.stringify(this.reservations));
    }
  }

  deleteReservation(id: number): void {
    this.reservations = this.reservations.filter((r) => r.id !== id);
    if (this.isBrowser) {
      localStorage.setItem('reservations', JSON.stringify(this.reservations));
    }
  }

  updateReservation(id: number, updated: Reservation): void {
    this.reservations = this.reservations.map((r) => (r.id === id ? updated : r));
    if (this.isBrowser) {
      localStorage.setItem('reservations', JSON.stringify(this.reservations));
    }
  }
}
