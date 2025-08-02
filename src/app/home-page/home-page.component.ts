import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { Car } from '../models/car';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-home-page',
  imports: [NgFor],
  standalone: true,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private carService: CarService
  ) {}

  selectedCategory: string | null = null;
  cars: Car[] = [];

  carsbrands = [
    { title: 'budget', image: 'assets/car_brands/nexia-3.png' },
    { title: 'Premium', image: 'assets/car_brands/malibu-2.png' },
    { title: 'Crossover', image: 'assets/car_brands/equnox.png' },
    { title: 'SUVs', image: 'assets/car_brands/Land_cruser.png' },
    { title: 'Minivan', image: 'assets/car_brands/Minivenlar.png' },
    { title: 'Pick UPs', image: 'assets/car_brands/pikap.png' },
  ];
  

  ngOnInit() {
    this.carService.getCars().subscribe((data) => {
      this.cars = data;
    });
  }

  selectCategory(category: string) {
    if (this.selectedCategory === category) {
      this.selectedCategory = null;
    } else {
      this.selectedCategory = category;
    }
  }
  

  get filteredCars(): Car[] {
    const list = this.selectedCategory
      ? this.cars.filter(car => car.category === this.selectedCategory)
      : this.cars;
    return list;
  }

  showCarDetail(car: any) {
    this.router.navigate(['/cars', car.id]);
  }

  closeModal() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { carId: null },
      queryParamsHandling: 'merge',
    });
  }
}
