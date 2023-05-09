import { Component } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection, doc, getFirestore, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  db: Firestore;
  testDrives: any;

  status(tid: string, status: string) {
    updateDoc(doc(this.db, 'testDrive', tid), { status: status });
  }

  constructor() {
    this.db = getFirestore();
    this.testDrives = collectionData(collection(this.db, 'testDrive'), {
      idField: 'id',
    });
  }
}
