import { Pipe, PipeTransform } from '@angular/core';
import { Cars } from './car.service';

@Pipe({ name: 'filterCar', standalone: true })
export class filterCarPipe implements PipeTransform {
  transform(value: Cars[] | null, params: any) {
    if (value == null) return;
    if (params.type) {
      value = value.filter((c) => c.type == params.type);
    }
    if (params.maxMileage) {
      value = value.filter((c) => c.mileage <= params.maxMileage);
    }
    if (params.numberOfSeats) {
      value = value.filter((c) => c.numberOfSeats >= params.numberOfSeats);
    }
    if (params.maxPrice) {
      value = value.filter((c) => c.price <= params.maxPrice);
    }
    if (params.status) {
      value = value.filter((c) => c.status == params.status);
    }
    return value;
  }
}
