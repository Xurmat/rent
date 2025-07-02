import { NgIf, NgFor } from '@angular/common';
import { Component, Input, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.scss',
  imports: [NgFor, NgIf],
})
export class CarDetailComponent implements OnDestroy {
  car?: Car;
  cars: any;
  filterCars = signal([]);
  activeImage: string = '';
  private sub!: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private carService: CarService) {
    this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
      const id = +params.get('id')!;
      if (id) {
        this.carService.getCarById(id).subscribe((car) => {
          if (car) {
            this.car = car;
            this.activeImage = car.images?.[0] || '';
            this.setFilterCars(car?.categoryId);
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.carService.getCars().subscribe((data :any) => {
      this.cars = data;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  setActiveImage(img: string) {
    this.activeImage = img;
  }

  get thumbnails(): string[] {
    return this.car?.images
      ? this.car.images.filter((img) => img !== this.activeImage)
      : [];
  }

  goToCar(id: number) {
    this.router.navigate(['/cars', id]);
  }

  setFilterCars(categoryId: number) {
    if (!this.cars) {
      const checkInterval = setInterval(() => {
        if (this.cars) {
          const filtered = this.cars.filter((car: Car) => car.categoryId === categoryId);
          this.filterCars.set(filtered);
          clearInterval(checkInterval);
        }
      }, 100);
      return;
    }
  
    const filtered = this.cars.filter((car: Car) => car.categoryId === categoryId);
    this.filterCars.set(filtered);
  }
}
