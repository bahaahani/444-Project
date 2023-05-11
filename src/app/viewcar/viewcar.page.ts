import { Component, ViewChild } from '@angular/core';
import {
  addDoc,
  collectionData,
  doc,
  getDoc,
  query,
  where,
} from '@angular/fire/firestore';
import { IonModal, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Cars, CarService, Comment } from '../car.service';

@Component({
  selector: 'app-viewcar',
  templateUrl: './viewcar.page.html',
  styleUrls: ['./viewcar.page.scss'],
})
export class ViewcarPage {
  car: Cars = {} as any;
  comments: Observable<Comment[]>;

  constructor(public dataSrv: CarService, public navCtrl: NavController) {
    getDoc(doc(this.dataSrv.carCollection, this.dataSrv.selectedCarId)).then(
      (res) => {
        this.car = res.data()!;
      }
    );
    this.comments = collectionData(
      query(
        this.dataSrv.commentCollection,
        where('carId', '==', this.dataSrv.selectedCarId)
      )
    );
  }

  @ViewChild(IonModal) modal: IonModal = {} as IonModal;
  newComment = {} as Comment;
  addComment() {
    addDoc(this.dataSrv.commentCollection, {
      ...this.newComment,
      username: this.dataSrv.getUsername(),
      carId: this.dataSrv.selectedCarId,
    });
    this.modal.dismiss();
    this.newComment = {} as Comment;
  }
}
