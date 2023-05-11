import { Component, ViewChild } from '@angular/core';
import {
  addDoc,
  collectionData,
  deleteDoc,
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
  admin = this.dataSrv.admin;
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
      ),
      { idField: 'id' }
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

  deleteComment(cid: string) {
    deleteDoc(doc(this.dataSrv.commentCollection, cid));
  }
}
