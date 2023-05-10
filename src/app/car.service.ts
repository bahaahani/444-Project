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
  Timestamp,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';

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
  date: Timestamp;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Favorite {
  id?: string;
  userid: string;
  carid: string;
  carModel: string;
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
  favoriteCollection = collection(
    this.db,
    'favorite'
  ) as CollectionReference<Favorite>;

  constructor(
    public alertCtrl: AlertController,
    public db: Firestore,
    public storage: Storage
  ) {}

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

  addToFavorite(car: Cars) {
    setDoc(doc(this.favoriteCollection), {
      userid: this.getUid(),
      carid: car.id!,
      carModel: car.model,
    });
  }
}
