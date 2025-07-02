import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-create-car-list',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-car-list.component.html',
  styleUrl: './create-car-list.component.scss'
})
export class CreateCarListComponent implements OnInit {

  carService = inject(CarService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  reservationForm: FormGroup = new FormGroup({
    clientFirstName: new FormControl('', [Validators.required]),
    clientLastName: new FormControl('', [Validators.required]),
    clientNumber: new FormControl('', [Validators.required]),
    carModel: new FormControl('', [Validators.required]),
  });
  reservationId: number | null = null;

  ngOnInit(): void {
    this.reservationId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (this.reservationId) {
      const data = this.carService.getReservationById(this.reservationId);
      if (data) {
        this.reservationForm.patchValue({
          clientFirstName: data.clientFirstName,
          clientLastName: data.clientLastName,
          clientNumber: data.clientNumber,
          carModel: data.carModel,
        });
      }
    }
  }

  constructor(){
    const reservationId = this.activatedRoute.snapshot.paramMap.get('id');
    if(reservationId){
      const reservation = this.carService.getReservationById(+reservationId);
      if(reservation){
        this.reservationForm.patchValue({
          clientFirstName: reservation.clientFirstName,
          clientLastName: reservation.clientLastName,
          clientNumber: reservation.clientNumber,
          carModel: reservation.carModel,
        });
      }
    }
  }

  onSubmit() {
    const reservationId = this.activatedRoute.snapshot.paramMap.get('id');
  
    if (reservationId) {
      const updatedReservation = {
        ...this.reservationForm.value,
        id: +reservationId,
        status: 'pending'
      };
      this.carService.updateReservation(+reservationId, updatedReservation);
    } else {
      const newReservation = {
        ...this.reservationForm.value,
        id: Date.now(),
        status: 'pending'
      };
      this.carService.addReservation(newReservation);
    }
  
    this.reservationForm.reset();
    this.router.navigate(['/list']);
  }
  
}
