import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService, users } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { CarService, Car, ShowRooms } from '../car.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
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

  showroom$!: Observable<ShowRooms[]>;

  onSlideDidChange(event: CustomEvent<any>) {
    console.log(event.detail);
  }

  constructor(
    public authService: AuthService,
    public carService: CarService,
    private navCtrl: NavController
  ) {}
}
