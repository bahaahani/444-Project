import { Component } from '@angular/core';
import {
  collectionData,
  deleteDoc,
  doc,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { CarService, TestDrive } from '../car.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  admin = this.dataSrv.admin;
  testDrive;

  status(tid: string, status: any) {
    updateDoc(doc(this.dataSrv.testDriveCollection, tid), {
      status: status,
    });
  }

  deleteTestDrive(testDrive: TestDrive) {
    deleteDoc(doc(this.dataSrv.testDriveCollection, testDrive.id));
  }

  constructor(public dataSrv: CarService) {
    if (this.admin) {
      this.testDrive = collectionData(this.dataSrv.testDriveCollection, {
        idField: 'id',
      });
    } else {
      this.testDrive = collectionData(
        query(
          this.dataSrv.testDriveCollection,
          where('user', '==', this.dataSrv.getUid())
        ),
        { idField: 'id' }
      );
    }
  }
}
