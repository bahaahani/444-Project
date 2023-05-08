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
  sold: boolean
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
    this.carCollectionRef.doc(car.id).update({
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
    }).then(()=>{alert('Successful Editing')});
   
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

  // public carList: Car[] = [
  //   { showroom: 3,type: 'SUV', manufacturer: 'Toyota', model: 'Land Cruiser', color: 'White', mileage: 10000, engine: '4.5L V8', specifications: ['4WD', 'Automatic', '4 Doors', '5 Seats'], numberOfSeats: 5, features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks', 'Power Mirrors', 'Cruise Control', 'Tilt Steering', 'AM/FM Radio', 'CD Player', 'MP3 Player', 'Bluetooth', 'Backup Camera', 'Navigation System', 'Keyless Entry', 'Keyless Start', 'Heated Seats', 'Leather Seats', 'Sunroof', 'Alloy Wheels'], price: 22000, image: 'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202002/lamborghini_660_140220101539.jpg' },
  //   { showroom: 3,type: 'sedan', manufacturer: 'Toyota', model: 'Camry', color: 'White', mileage: 10000, engine: '2.5L I4', specifications: ['FWD', 'Automatic', '4 Doors', '5 Seats'], numberOfSeats: 5, features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks', 'Power Mirrors', 'Cruise Control', 'Tilt Steering', 'AM/FM Radio', 'CD Player', 'MP3 Player', 'Bluetooth', 'Backup Camera', 'Navigation System', 'Keyless Entry', 'Keyless Start', 'Heated Seats', 'Leather Seats', 'Sunroof', 'Alloy Wheels'], price: 7000, image: 'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202002/lamborghini_660_140220101539.jpg' },
  //   { showroom: 3,type: 'sedan', manufacturer: 'Toyota', model: 'Corolla', color: 'White', mileage: 10000, engine: '1.8L I4', specifications: ['FWD', 'Automatic', '4 Doors', '5 Seats'], numberOfSeats: 5, features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks', 'Power Mirrors', 'Cruise Control', 'Tilt Steering', 'AM/FM Radio', 'CD Player', 'MP3 Player', 'Bluetooth', 'Backup Camera', 'Navigation System', 'Keyless Entry', 'Keyless Start', 'Heated Seats', 'Leather Seats', 'Sunroof', 'Alloy Wheels'], price: 8000, image: 'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202002/lamborghini_660_140220101539.jpg' },
  //   { showroom: 3,type: 'sedan', manufacturer: 'Toyota', model: 'Yaris', color: 'White', mileage: 10000, engine: '1.5L I4', specifications: ['FWD', 'Automatic', '4 Doors', '5 Seats'], numberOfSeats: 5, features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks', 'Power Mirrors', 'Cruise Control', 'Tilt Steering', 'AM/FM Radio', 'CD Player', 'MP3 Player', 'Bluetooth', 'Backup Camera', 'Navigation System', 'Keyless Entry', 'Keyless Start', 'Heated Seats', 'Leather Seats', 'Sunroof', 'Alloy Wheels'], price: 9000, image: 'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202002/lamborghini_660_140220101539.jpg' },
  //   { showroom: 3,type: 'sedan', manufacturer: 'Toyota', model: 'Avalon', color: 'White', mileage: 10000, engine: '3.5L V6', specifications: ['FWD', 'Automatic', '4 Doors', '5 Seats'], numberOfSeats: 5, features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks', 'Power Mirrors', 'Cruise Control', 'Tilt Steering', 'AM/FM Radio', 'CD Player', 'MP3 Player', 'Bluetooth', 'Backup Camera', 'Navigation System', 'Keyless Entry', 'Keyless Start', 'Heated Seats', 'Leather Seats', 'Sunroof', 'Alloy Wheels'], price: 11000, image: 'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202002/lamborghini_660_140220101539.jpg' },
  //   { showroom: 3,type: 'SUV', manufacturer: 'Toyota', model: 'RAV4', color: 'White', mileage: 10000, engine: '2.5L I4', specifications: ['FWD', 'Automatic', '4 Doors', '5 Seats'], numberOfSeats: 5, features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks', 'Power Mirrors', 'Cruise Control', 'Tilt Steering', 'AM/FM Radio', 'CD Player', 'MP3 Player', 'Bluetooth', 'Backup Camera', 'Navigation System', 'Keyless Entry', 'Keyless Start', 'Heated Seats', 'Leather Seats', 'Sunroof', 'Alloy Wheels'], price: 13000, image: 'https://akm-img-a-in.tosshub.com/businesstoday/images/story/202002/lamborghini_660_140220101539.jpg' },
  // { showroom: 1,type: 'SUV', manufacturer: 'BMW', model: 'X5', color: 'Black', mileage: 5000, engine: '3.0L I-6', specifications: ['4WD', 'Automatic', '4 Doors', '5 Seats'], numberOfSeats: 5, features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks', 'Power Mirrors', 'Cruise Control', 'Tilt Steering', 'AM/FM Radio', 'CD Player', 'MP3 Player', 'Bluetooth', 'Backup Camera', 'Navigation System', 'Keyless Entry', 'Keyless Start', 'Heated Seats', 'Leather Seats', 'Sunroof', 'Alloy Wheels'], price: 30000, image: 'https://www.bmw.com/content/dam/bmw/marketBMWCOM/bmw_com/categories/new-vehicles/x/x7/2019/navigation/BMW-x7-nav.jpg.asset.1570760071856.jpg' },
  // { showroom: 1,type: 'Sedan', manufacturer: 'BMW', model: '5 Series', color: 'Silver', mileage: 2000, engine: '2.0L I-4', specifications: ['RWD', 'Automatic', '4 Doors', '5 Seats'], numberOfSeats: 5, features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks', 'Power Mirrors', 'Cruise Control', 'Tilt Steering', 'AM/FM Radio', 'CD Player', 'MP3 Player', 'Bluetooth', 'Backup Camera', 'Navigation System', 'Keyless Entry', 'Keyless Start', 'Heated Seats', 'Leather Seats', 'Sunroof', 'Alloy Wheels'], price: 27000, image: 'https://www.bmw.com/content/dam/bmw/marketBMWCOM/bmw_com/categories/new-vehicles/5/2020/navigation/bmw-5series-sedan-1.jpg.asset.1580476715968.jpg' },
  // { showroom: 1,type: 'Coupe', manufacturer: 'BMW', model: 'M4', color: 'Blue', mileage: 1000, engine: '3.0L I-6', specifications: ['RWD', 'Automatic', '2 Doors', '4 Seats'], numberOfSeats: 4, features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks', 'Power Mirrors', 'Cruise Control', 'Tilt Steering', 'AM/FM Radio', 'CD Player', 'MP3 Player', 'Bluetooth', 'Backup Camera', 'Navigation System', 'Keyless Entry', 'Keyless Start', 'Heated Seats', 'Leather Seats', 'Sunroof', 'Alloy Wheels'], price: 45000, image: 'https://www.bmwusa.com/content/dam/bmwusa/XModels/M/X6/2019/BMW_X6_Hero.jpg' },
  // { showroom: 1,type: 'Hatchback', manufacturer: 'BMW', model: '1 Series', color: 'White', mileage: 3000, engine: '1.5L I-3', specifications: ['RWD', 'Automatic', '5 Doors', '5 Seats'], numberOfSeats: 5, features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks', 'Power Mirrors', 'Cruise Control', 'Tilt Steering', 'AM/FM Radio', 'CD Player', 'MP3 Player', 'Bluetooth', 'Backup Camera', 'Navigation System', 'Keyless Entry', 'Keyless Start', 'Heated Seats', 'Leather Seats', 'Sunroof', 'Alloy Wheels'], price: 20000, image: 'https://www.bmwusa.com/content/dam/bmwusa/XModels/M/X6/2019/BMW_X6_Hero.jpg' },
  // { showroom: 1,type: 'SUV', manufacturer: 'BMW', model: 'X7', color: 'Black', mileage: 4000, engine: '3.0L I-6', specifications: ['4WD', 'Automatic', '4 Doors', '7 Seats'], numberOfSeats: 7, features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks', 'Power Mirrors', 'Cruise Control', 'Tilt Steering', 'AM/FM Radio', 'CD Player', 'MP3 Player', 'Bluetooth', 'Backup Camera', 'Navigation System', 'Keyless Entry', 'Keyless Start', 'Heated Seats', 'Leather Seats', 'Sunroof', 'Alloy Wheels'], price: 40000, image: 'https://www.bmwusa.com/content/dam/bmwusa/XModels/M/X6/2019/BMW_X6_Hero.jpg' },
  // {showroom:5, type: 'SUV', manufacturer: 'Mercedes', model: 'GLS', color: 'Black', mileage: 5000, engine: '3.0L I-6', specifications: ['4WD', 'Automatic', '4 Doors', '5 Seats'], numberOfSeats: 5, features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks', 'Power Mirrors', 'Cruise Control', 'Tilt Steering', 'AM/FM Radio', 'CD Player', 'MP3 Player', 'Bluetooth', 'Backup Camera', 'Navigation System', 'Keyless Entry', 'Keyless Start', 'Heated Seats', 'Leather Seats', 'Sunroof', 'Alloy Wheels'], price: 30000, image: 'https://www.mercedes-benz.com/en/vehicles/passenger-cars/gls/gls/suv-x167/_jcr_content/root/slider/sliderchilditems/slideritem/image/MQ7-0-image-20190722100448/01-mercedes-benz-gls-2019-x167-2560x1440.jpeg' },
  // { showroom: 5,type: 'Sedan', manufacturer: 'Mercedes', model: 'E Class', color: 'Silver', mileage: 6000, engine: '2.0L I-4', specifications: ['RWD', 'Automatic', '4 Doors', '5 Seats'], numberOfSeats: 5, features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks', 'Power Mirrors', 'Cruise Control', 'Tilt Steering', 'AM/FM Radio', 'CD Player', 'MP3 Player', 'Bluetooth', 'Backup Camera', 'Navigation System', 'Keyless Entry', 'Keyless Start', 'Heated Seats', 'Leather Seats', 'Sunroof', 'Alloy Wheels'], price: 25000, image: 'https://www.mercedes-benz.com/en/vehicles/passenger-cars/e-class/saloon-w213/_jcr_content/root/slider/sliderchilditems/slideritem/image/MQ7-0-image-20190722100448/01-mercedes-benz-e-class-2019-w213-2560x1440.jpeg' },
  // { showroom: 5,type: 'Coupe', manufacturer: 'Mercedes', model: 'C Class', color: 'Red', mileage: 7000, engine: '2.0L I-4', specifications: ['RWD', 'Automatic', '2 Doors', '4 Seats'], numberOfSeats: 4, features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks', 'Power Mirrors', 'Cruise Control', 'Tilt Steering', 'AM/FM Radio', 'CD Player', 'MP3 Player', 'Bluetooth', 'Backup Camera', 'Navigation System', 'Keyless Entry', 'Keyless Start', 'Heated Seats', 'Leather Seats', 'Sunroof', 'Alloy Wheels'], price: 20000, image: 'https://www.mercedes-benz.com/en/vehicles/passenger-cars/c-class/coupe-c205/_jcr_content/root/slider/sliderchilditems/slideritem/image/MQ7-0-image-20190722100448/01-mercedes-benz-c-class-2019-c205-2560x1440.jpeg' },
  // { showroom: 5,type: 'Hatchback', manufacturer: 'Mercedes', model: 'A Class', color: 'White', mileage: 8000, engine: '2.0L I-4', specifications: ['RWD', 'Automatic', '5 Doors', '5 Seats'], numberOfSeats: 5, features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks', 'Power Mirrors', 'Cruise Control', 'Tilt Steering', 'AM/FM Radio', 'CD Player', 'MP3 Player', 'Bluetooth', 'Backup Camera', 'Navigation System', 'Keyless Entry', 'Keyless Start', 'Heated Seats', 'Leather Seats', 'Sunroof', 'Alloy Wheels'], price: 15000, image: 'https://www.mercedes-benz.com/en/vehicles/passenger-cars/a-class/a-class-hatchback-w177/_jcr_content/root/slider/sliderchilditems/slideritem/image/MQ7-0-image-20190722100448/01-mercedes-benz-a-class-2019-w177-2560x1440.jpeg' },
  // {showroom:2, type: 'SUV', manufacturer: 'Audi', model: 'Q7', color: 'Black', mileage: 9000, engine: '3.0L I-6', specifications: ['4WD', 'Automatic', '4 Doors', '5 Seats'], numberOfSeats: 5, features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks', 'Power Mirrors', 'Cruise Control', 'Tilt Steering', 'AM/FM Radio', 'CD Player', 'MP3 Player', 'Bluetooth', 'Backup Camera', 'Navigation System', 'Keyless Entry', 'Keyless Start', 'Heated Seats', 'Leather Seats', 'Sunroof', 'Alloy Wheels'], price: 35000, image: 'https://www.audi.com/content/dam/gbp2/experience-audi/models-and-technology/production-models/q7/my2019/1920x1080-gal-prop-tx/1920x1080_desktop_AQ7_181001.jpg' },
  // { showroom: 2,type: 'Sedan', manufacturer: 'Audi', model: 'A6', color: 'Silver', mileage: 10000, engine: '2.0L I-4', specifications: ['RWD', 'Automatic', '4 Doors', '5 Seats'], numberOfSeats: 5, features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks', 'Power Mirrors', 'Cruise Control', 'Tilt Steering', 'AM/FM Radio', 'CD Player', 'MP3 Player', 'Bluetooth', 'Backup Camera', 'Navigation System', 'Keyless Entry', 'Keyless Start', 'Heated Seats', 'Leather Seats', 'Sunroof', 'Alloy Wheels'], price: 30000, image: 'https://www.audi.com/content/dam/gbp2/experience-audi/models-and-technology/production-models/a6/my2019/1920x1080-gal-prop-tx/1920x1080_desktop_A6_181001.jpg' },
  // { showroom: 2,type: 'Coupe', manufacturer: 'Audi', model: 'A5', color: 'Red', mileage: 11000, engine: '2.0L I-4', specifications: ['RWD', 'Automatic', '2 Doors', '4 Seats'], numberOfSeats: 4, features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks', 'Power Mirrors', 'Cruise Control', 'Tilt Steering', 'AM/FM Radio', 'CD Player', 'MP3 Player', 'Bluetooth', 'Backup Camera', 'Navigation System', 'Keyless Entry', 'Keyless Start', 'Heated Seats', 'Leather Seats', 'Sunroof', 'Alloy Wheels'], price: 25000, image: 'https://www.audi.com/content/dam/gbp2/experience-audi/models-and-technology/production-models/a5/my2019/1920x1080-gal-prop-tx/1920x1080_desktop_A5_181001.jpg' },
  // { showroom: 2,type: 'Hatchback', manufacturer: 'Audi', model: 'A3', color: 'White', mileage: 12000, engine: '2.0L I-4', specifications: ['RWD', 'Automatic', '5 Doors', '5 Seats'], numberOfSeats: 5, features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks', 'Power Mirrors', 'Cruise Control', 'Tilt Steering', 'AM/FM Radio', 'CD Player', 'MP3 Player', 'Bluetooth', 'Backup Camera', 'Navigation System', 'Keyless Entry', 'Keyless Start', 'Heated Seats', 'Leather Seats', 'Sunroof', 'Alloy Wheels'], price: 20000, image: 'https://www.audi.com/content/dam/gbp2/experience-audi/models-and-technology/production-models/a3/my2019/1920x1080-gal-prop-tx/1920x1080_desktop_A3_181001.jpg' },
  // { showroom: 2,type: 'SUV', manufacturer: 'Audi', model: 'Q5', color: 'Black', mileage: 13000, engine: '2.0L I-4', specifications: ['RWD', 'Automatic', '4 Doors', '5 Seats'], numberOfSeats: 5, features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks', 'Power Mirrors', 'Cruise Control', 'Tilt Steering', 'AM/FM Radio', 'CD Player', 'MP3 Player', 'Bluetooth', 'Backup Camera', 'Navigation System', 'Keyless Entry', 'Keyless Start', 'Heated Seats', 'Leather Seats', 'Sunroof', 'Alloy Wheels'], price: 15000, image: 'https://www.audi.com/content/dam/gbp2/experience-audi/models-and-technology/production-models/q5/my2019/1920x1080-gal-prop-tx/1920x1080_desktop_Q5_181001.jpg' },
  // { showroom: 3,type: 'SUV', manufacturer: 'Isuzu', model: 'MU-X', color: 'Black', mileage: 9000, engine: '3.0L I-6', specifications: ['4WD', 'Automatic', '4 Doors', '5 Seats'], numberOfSeats: 5, features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks', 'Power Mirrors', 'Cruise Control', 'Tilt Steering', 'AM/FM Radio', 'CD Player', 'MP3 Player', 'Bluetooth', 'Backup Camera', 'Navigation System', 'Keyless Entry', 'Keyless Start', 'Heated Seats', 'Leather Seats', 'Sunroof', 'Alloy Wheels'], price: 35000, image: 'https://www.isuzuute.com.au/content/dam/isuzuute/au/en/vehicles/mu-x/2018/overview/hero/hero-mu-x-2018-4x4-ls-t-crew-cab-onyx-black.png' },
  // { showroom: 3,type: 'SUV', manufacturer: 'Isuzu', model: 'D-Max', color: 'White', mileage: 10000, engine: '3.0L I-6', specifications: ['4WD', 'Automatic', '4 Doors', '5 Seats'], numberOfSeats: 5, features: ['Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks', 'Power Mirrors', 'Cruise Control', 'Tilt Steering', 'AM/FM Radio', 'CD Player', 'MP3 Player', 'Bluetooth', 'Backup Camera', 'Navigation System', 'Keyless Entry', 'Keyless Start', 'Heated Seats', 'Leather Seats', 'Sunroof', 'Alloy Wheels'], price: 30000, image: 'https://www.isuzuute.com.au/content/dam/isuzuute/au/en/vehicles/d-max/2018/overview/hero/hero-d-max-2018-4x4-ls-crew-cab-splash-white.png' },
  // ];
  // public showrooms = [
  //   {
  //     id: 1,
  //     name: "Al Zayani Trading Co. - BMW",
  //     address: "Salmabad",
  //     phone: "+973 1745 9944",
  //     distance: "4.9 km",
  //     rating: 4.4,
  //     image: "assets/zayani.jpeg",
  //   },
  //   {
  //     id: 2,
  //     name: "Euro Motors",
  //     address: "Sitra",
  //     phone: "+973 1775 0750",
  //     distance: "4.7 km",
  //     rating: 4.0,
  //     image: "assets/euromotors.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "Almoayyed Motors - Toyota",
  //     phone: "+973 1773 3733",
  //     address: "Sitra",
  //     distance: "4.7 km",
  //     rating: 4.0,
  //     image: "assets/almoayyed.jpg",
  //   },
  //   {
  //     id: 4,
  //     name: "MOTORCITY - Sitra Showroom",
  //     phone: "+973 1750 0900",
  //     address:"Manama",
  //     distance: "8.0 km",
  //     rating: 4.1,
  //     image: "assets/motorcity.jpg",
  //   },
  //   {
  //     id: 5,
  //     name: "Mercedes-Benz Al Haddad Motors Showroom",
  //     phone: "+973 1778 5454",
  //     address: "Tubli",
  //     distance: "4.8 km",
  //     image: "assets/alhaddad.jpg",
  //     rating: 4.8
  //   },
  // ];
}
export class Car {
  type: string;
  manufacturer: string;
  model: string;
  color: string;
  mileage: number;
  engine: string;
  specifications: string[];
  numberOfSeats: number;
  features: string[];
  price: number;
  image: string;
  showroom: number;

  constructor(
    type: string,
    manufacturer: string,
    model: string,
    color: string,
    mileage: number,
    engine: string,
    specifications: string[],
    numberOfSeats: number,
    features: string[],
    price: number,
    image: string,
    showroom: number
  ) {
    this.type = type;
    this.manufacturer = manufacturer;
    this.model = model;
    this.color = color;
    this.mileage = mileage;
    this.engine = engine;
    this.specifications = specifications;
    this.numberOfSeats = numberOfSeats;
    this.features = features;
    this.price = price;
    this.image = image;
    this.showroom = showroom;
  }
}
