import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CarService, ShowRooms } from '../car.service';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
declare var dynamics: any;

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

  constructor(public authService: AuthService, public carService: CarService,public nav:NavController) {}

  animation(){
    const svg=document.getElementById('fav');
    dynamics.animate(svg,{
      scaleY:0.8
    },
    {
      type:dynamics.bounce,
      duration:800,
      bounciness:0,
      complete:()=>{ this.nav.navigateForward('/fav');}
    })
   
  }

}
