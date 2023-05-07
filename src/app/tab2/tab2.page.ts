import { Component } from '@angular/core';
import { CarService, TestDrive } from '../car.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  deleteTestDrive(testDrive: TestDrive) {
    this.dataSrv.testDriveCollectionRef.doc(testDrive.id).delete();
  }

  constructor(public dataSrv: CarService) {}
}
