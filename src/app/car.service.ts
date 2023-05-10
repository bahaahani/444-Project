import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import {
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  docData,
  Firestore,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';

export interface ShowRooms {
  id?: string;
  name: string;
  address: string;
  distance: string;
  image: string;
  phone: string;
  rating: number;
}

export interface Cars {
  id?: string;
  color: string;
  engine: string;
  features: any;
  image: string;
  manufacturer: string;
  mileage: number;
  model: string;
  numberOfSeats: string;
  price: number;
  showroom: number;
  specifications: any;
  type: string;
  sold: boolean;
}

export interface TestDrive {
  id?: string;
  user: string;
  car: string;
  carModel: string;
  date: Date;
  status: 'pending' | 'approved' | 'rejected';
}

@Injectable({
  providedIn: 'root',
})
export class CarService {
  carList: any;
  showroomCollection = collection(
    this.db,
    'showroom'
  ) as CollectionReference<ShowRooms>;
  showroom = collectionData(this.showroomCollection, { idField: 'id' });
  carCollection = collection(this.db, 'cars') as CollectionReference<Cars>;
  car = collectionData(this.carCollection, { idField: 'id' });
  testDriveCollection = collection(
    this.db,
    'testDrive'
  ) as CollectionReference<TestDrive>;

  constructor(public alertCtrl: AlertController, public db: Firestore) {}

  getUid(): string {
    return JSON.parse(localStorage.getItem('uid')!);
  }

  async deleteCar(id: string) {
    const alt = await this.alertCtrl.create({
      message: 'Are you sure you want to delete this car?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            deleteDoc(doc(this.carCollection, id));
          },
        },
        {
          text: 'Cancel',
          handler: () => {},
        },
      ],
    });
    //  alert(id);
    alt.present();
  }

  addNewCar(carnew: Cars): Promise<void> {
    return setDoc(doc(this.carCollection), carnew);
  }

  getCar(id: string): Observable<Cars> {
    return docData(doc(this.carCollection, id), { idField: 'id' });
  }

  sellCar(car: any) {
    alert(car.id);
    alert(car.sold);

    updateDoc(doc(this.carCollection, car.id), {
      sold: car.sold,
    });
  }

  updateCarInfo(car: any) {
    let newInfo = JSON.parse(JSON.stringify(car));
    delete newInfo.id;
    updateDoc(doc(this.carCollection, car.id), newInfo);
  }

  getCars(showroomId: string): Observable<Cars[]> {
    return collectionData(
      query(this.carCollection, where('showroom', '==', showroomId)),
      { idField: 'id' }
    );
  }

  addToFavorites(carId: string) {
    // const userId = 1; // example user ID
    // const favorite = { carId, userId };
    // return this.afs.collection(this.favoritesCollectionName).add(favorite);
  }

  removeFromFavorites(carId: string) {
    //   const userId = /* get current user ID */ 1;
    //   return this.afs
    //     .collection(this.favoritesCollectionName, (ref) =>
    //       ref.where('carId', '==', carId).where('userId', '==', userId)
    //     )
    //     .get()
    //     .pipe(switchMap((snapshot) => snapshot.docs[0].ref.delete()))
    //     .toPromise();
  }
}
