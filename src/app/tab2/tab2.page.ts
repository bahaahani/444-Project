import { Component } from '@angular/core';
import {
  collectionData,
  deleteDoc,
  doc,
  query,
  where,
} from '@angular/fire/firestore';
import { CarService, TestDrive } from '../car.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  testDrive = collectionData(
    query(
      this.dataSrv.testDriveCollection,
      where('user', '==', this.dataSrv.getUid())
    ),
    { idField: 'id' }
  );

  deleteTestDrive(testDrive: TestDrive) {
    deleteDoc(doc(this.dataSrv.testDriveCollection, testDrive.id));
  }

  constructor(public dataSrv: CarService) {}
}
