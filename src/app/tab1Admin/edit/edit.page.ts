import { Component, OnInit } from '@angular/core';
import { CarService, Cars } from 'src/app/car.service';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  car: Cars = {} as Cars;
  //test:Cars={}as Cars;;
  try: any[] = [];
  Features: any[] = [];

  //try2:any[]=[];
 // Features2:any[]=[];

  newItem = '';
  newItem2 = '';
  constructor(
    public d: CarService,
    public n: NavParams,
    public mod: ModalController
  ) {
    const x = n.get('id');
    //alert(n.get('id'));
    if (x) {
      this.d.getCar(x).subscribe((cararr) => {
        this.car = cararr;
        this.Features=this.car.features;
        this.try=this.car.specifications;
      });
      // this.test=this.d.getCar(x);
      // alert(this.test.type);
    }
  }

  ngOnInit() {}

  close() {
    this.mod.dismiss({
      dismissed: true,
    });
  }
  morespe() {
    if (this.newItem !== '') {
      this.try.push(this.newItem);
      this.newItem = '';
    } else {
      alert('Can not add empty item');
    }
  }

  morefet() {
    if (this.newItem2 !== '') {
      this.Features.push(this.newItem2);
      this.newItem2 = '';
    } else {
      alert('Can not add empty item');
    }
  }

  edit() {
  //  alert(this.car.id);
    this.car.features=this.Features;
    this.car.specifications=this.try;
    this.d.updatecarinfo(this.car);
  }
  remove(i:number){
    this.Features.splice(i,1);
  }

  remove2(i:number){
    this.try.splice(i,1);
  }
}
