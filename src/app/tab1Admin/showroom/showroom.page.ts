import { Component, OnInit } from '@angular/core';
import { CarService, Car } from '../../car.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { EditPage } from '../edit/edit.page';
import { AddcarPage } from '../addcar/addcar.page';
@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.page.html',
  styleUrls: ['./showroom.page.scss'],
})
export class ShowroomPage implements OnInit {
  public carList: any[] = [];
  shoowid: any;
  cardisp2: any[] = [];
  //Shworoom2:any;
Adm='View';
  constructor(
    public dataSrv: CarService,
    private route: ActivatedRoute,
    public m: ModalController
  ) {
    this.shoowid = this.route.snapshot.paramMap.get('id');

    /*if(this.shoowid){
   this.dataSrv.afs.collection('cars', (ref) => ref.where('showroom','==',Number(this.shoowid))).get().subscribe((querySnapshot) => {
    const carsdis:any[]=[];
    querySnapshot.forEach((doc) => {
    carsdis.push(doc.data());
     
    });
    this.cardisp2=carsdis;
  });
}*/
  }

  ngOnInit() {
    // this.carList = this.dataSrv.carList;
    // const id = this.route.snapshot.paramMap.get('id');
  }
  deletecar(c: any) {
    this.dataSrv.deletecar1(c.id);
  }
  async addnewcar() {
    const mod = await this.m.create({
      component: AddcarPage,
      componentProps: {
        id: this.shoowid,
      },
    });
    mod.present();
    // this.dataSrv.addnewcar1();
  }
  async openedit(car: any) {
    alert(car.id);
    const mod = await this.m.create({
      component: EditPage,
      componentProps: {
        id: car.id,
      },
    });
   // alert(car.id);
    return mod.present();
  }
  SoldCar(car: any) {
    car.sold =true;
    alert(car.sold);
    this.dataSrv.Soldcar1(car);
  }

  /* searchResults: Cars[] = [];
    search() {
      this.searchResults = this.dataSrv.carList.filter((car) => {
        let matchesType = true;
        let matchesManufacturer = true;
        let matchesModel = true;
        let matchesColor = true;
        let matchesMileage = true;
        let matchesEngineSpecs = true;
        let matchesNumSeats = true;
        let matchesPrice = true;
  
        if (this.type && this.type !== car.type) {
          matchesType = false;
        }
  
        if (this.manufacturer && !car.manufacturer.toLowerCase().includes(this.manufacturer.toLowerCase())) {
          matchesManufacturer = false;
        }
  
        if (this.model && !car.model.toLowerCase().includes(this.model.toLowerCase())) {
          matchesModel = false;
        }
  
        if (this.color && !car.color.toLowerCase().includes(this.color.toLowerCase())) {
          matchesColor = false;
        }
  
        if (this.mileage && car.mileage > this.mileage) {
          matchesMileage = false;
        }
  
        if (this.price && car.price > this.price) {
          matchesPrice = false;
        }
  
        return matchesType && matchesManufacturer && matchesModel && matchesColor && matchesMileage && matchesEngineSpecs && matchesNumSeats && matchesPrice;
      });
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
  */
}
