import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { Timestamp } from '@angular/fire/firestore';

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
  status: 'pending' | 'approved';
}

@Injectable({
  providedIn: 'root',
})
export class CarService {
  public showroom: Observable<ShowRooms[]>;
  public showroomsCollectionRef: AngularFirestoreCollection<ShowRooms>;
  public car: Observable<Cars[]>;
  public carCollectionRef: AngularFirestoreCollection<Cars>;
  carList: any;
  public testDrive: Observable<TestDrive[]>;
  public testDriveCollectionRef: AngularFirestoreCollection<TestDrive>;

  constructor(public afs: AngularFirestore, public a: AlertController) {
    this.showroomsCollectionRef = this.afs.collection('showroom');
    this.showroom = this.showroomsCollectionRef.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    this.carCollectionRef = this.afs.collection('cars');
    this.car = this.carCollectionRef.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    this.testDriveCollectionRef = this.afs.collection('testDrive', (ref) =>
      ref.where('user', '==', this.getUid())
    );
    this.testDrive = this.testDriveCollectionRef.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          const date = (data.date as any as Timestamp).toDate();
          return { id, ...data, date };
        });
      })
    );
  }
  /*getCarsById(id: string): Observable<any> {
  return this.carCollectionRef.doc(id).get().pipe(
    map((doc) => {
      if(doc.exists){
        return {id: doc.id, ...doc.data()}
      }else {
        return null
      }
    })
  )
}*/

  getUid(): string {
    return JSON.parse(localStorage.getItem('uid')!);
  }

  async deletecar1(id: string) {
    const alt = await this.a.create({
      message: 'Are you sure you want to delete this car?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.carCollectionRef.doc(id).delete();
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

  addnewcar1(carnew: any) {
    return this.carCollectionRef.add(carnew);
  }

  getCar(id: string): Observable<Cars> {
    return this.carCollectionRef
      .doc<Cars>(id)
      .valueChanges()
      .pipe(
        map((car1) => {
          if (car1) {
            //alert(idea.type);
            car1.id = id;
            return car1 as Cars; // add type assertion here
          } else {
            throw new Error(`Document with ID ${id} does not exist.`);
          }
        })
      );
  }

  Soldcar1(car: any) {
    alert(car.id);
    alert(car.sold);
    this.carCollectionRef.doc(car.id).update({
      /* color:car.color,
  engine:car.engine,
  features:car.features,
  image:car.image,
  manufacturer:car.manufacturer,
  mileage:car.mileage,
  model:car.model,
  numberOfSeats:car.numberOfSeats,
  price:car.price,
  showroom:car.showroom,
  specifications:car.specifications,
  type:car.type,*/
      sold: car.sold,
    });
  }

  updatecarinfo(car: any) {
    //  alert(car.id);
    this.carCollectionRef
      .doc(car.id)
      .update({
        color: car.color,
        engine: car.engine,
        features: car.features,
        image: car.image,
        manufacturer: car.manufacturer,
        mileage: car.mileage,
        model: car.model,
        numberOfSeats: car.numberOfSeats,
        price: car.price,
        showroom: car.showroom,
        specifications: car.specifications,
        type: car.type,
      })
      .then(() => {
        alert('Successful Editing');
      });
  }

  getCarsById(id: string): Observable<any> {
    return this.carCollectionRef
      .doc(id)
      .get()
      .pipe(
        map((doc) => {
          if (doc.exists) {
            return { id: doc.id, ...doc.data() };
          } else {
            return null;
          }
        })
      );
  }

  private showRoomsCollectionName = 'showRooms';
  private carsCollectionName = 'cars';
  private favoritesCollectionName = 'favorites';
  private testDriveRequestsCollectionName = 'testDriveRequests';

  getShowRooms(): Observable<ShowRooms[]> {
    return this.afs
      .collection<ShowRooms>(this.showRoomsCollectionName)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as ShowRooms;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getCars(showroomId: string): Observable<Cars[]> {
    return this.afs
      .collection<Cars>(this.carsCollectionName, (ref) =>
        ref.where('showroom', '==', showroomId)
      )
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as Cars;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  addToFavorites(carId: string) {
    const userId = 1; // example user ID
    const favorite = { carId, userId };
    return this.afs.collection(this.favoritesCollectionName).add(favorite);
  }

  removeFromFavorites(carId: string): Promise<void> {
    const userId = /* get current user ID */ 1;
    return this.afs
      .collection(this.favoritesCollectionName, (ref) =>
        ref.where('carId', '==', carId).where('userId', '==', userId)
      )
      .get()
      .pipe(switchMap((snapshot) => snapshot.docs[0].ref.delete()))
      .toPromise();
  }

  requestTestDrive(carId: string, showroomId: string, date: Date) {
    const userId = /* get current user ID */ 1;
    const testDriveRequest = { carId, showroomId, userId, date };
    return this.afs
      .collection(this.testDriveRequestsCollectionName)
      .add(testDriveRequest);
  }
}
