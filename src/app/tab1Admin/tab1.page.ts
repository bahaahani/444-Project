import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavController } from '@ionic/angular';
import { CarService, ShowRooms } from '../car.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  showroom$!: Observable<ShowRooms[]>;

  searchTerm!: string;
  filteredShowrooms: any[] = [];
  onSearchInput(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm != '') {
      this.carService.showroom.subscribe((showrooms: ShowRooms[]) => {
        this.filteredShowrooms = showrooms.filter(
          (showroom: { name: string; address: string }) => {
            return (
              showroom.name.toLowerCase().includes(searchTerm) ||
              showroom.address.toLowerCase().includes(searchTerm)
            );
          }
        );
      });
    } else {
      this.filteredShowrooms = [];
    }
  }

  onSlideDidChange(event: CustomEvent<any>) {
    console.log(event.detail);
  }

  ngOnInit() {
    this.showroom$ = this.carService.showroom;
  }

  constructor(public authService: AuthService, public carService: CarService) {}

  passparameter() {
    const params = {
      param1: '',
    };
  }
}
