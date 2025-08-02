import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car';
import { Subscription } from 'rxjs';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-car-detail',
  standalone: true,
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.scss',
  imports: [NgFor, NgIf],
})
export class CarDetailComponent implements OnInit, OnDestroy {
  @Input() car!: Car;
  similarCars: Car[] = [];
  filterCars = signal<Car[]>([]);
  activeImage: string = '';
  private sub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
      const id = +params.get('id')!;
      if (id) {
        this.loadCar(id);
      }
    });
  }

  private loadCar(id: number): void {
    this.carService.getCarById(id).subscribe((car) => {
      if (car) {
        this.car = car;
        this.activeImage = car.images?.[0] || '';
        this.carService.getCars().subscribe((allCars) => {
          this.setFilterCars(car.categoryId, allCars);
        });
      }
    });
  }

  setFilterCars(categoryId: number, cars: Car[]): void {
    if (categoryId && cars) {
      const filtered = cars.filter((car) => car.categoryId === categoryId && car.id !== this.car.id);
      this.filterCars.set(filtered);
    }
  }

  getCarImage(car: Car): string {
    return car.image || car.images?.[0] || 'assets/default-car.jpg';
  }

  setActiveImage(img: string): void {
    this.activeImage = img;
  }

  get thumbnails(): string[] {
    return this.car?.images
      ? this.car.images.filter((img) => img !== this.activeImage)
      : [];
  }

  goToCar(id: number): void {
    this.router.navigate(['/cars', id]);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  get parsedBullets() {
    return this.car?.specs?.slice(0, 4).map((spec, i) => {
      if (i === 0) {
        return { icon: spec.icon, text: spec.label }; // faqat 1-element uchun text
      } else {
        const number = spec.label.split(' ')[0]; // faqat raqam
        return { icon: spec.icon, number };
      }
    }) || [];
  }
  
  
  
  
  
}
