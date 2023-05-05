import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carview',
  templateUrl: './carview.page.html',
  styleUrls: ['./carview.page.scss'],
})
export class CarviewPage implements OnInit {
  search() {
    console.log('Search button clicked');
  }

  price!: number;
  numSeats!: number;
  numDoors!: number;
  engineSpecs!: string;
  model!: string;
  color!: string;
  mileage!: number;
  manufacturer!: string;
  type!: string;

  constructor() {}

  ngOnInit() {}
}
