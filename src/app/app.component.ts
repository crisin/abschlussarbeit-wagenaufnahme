import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IdbService } from './services/idb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  wagennummerInput = new FormControl();

  items: Array<any>;

  constructor(private idb: IdbService) {}

  ngOnInit(): void {
    // this.getItemByKey('Chair');
  }

  addNewItem(): void {
    // const value: any = {
    //   wagennummer: this.wagennummerInput.value,
    // };

    // this.items.push(value);
    // console.log(this.items);

    // this.wagennummerInput.setValue('');
    this.idb.addProducts();
  }

  getItemByKey(key?: string): any {
    const a = this.idb
      .getByName('Chair')
      .then((r) => console.log('result of promise:', r));
    console.log(a);
  }

  registerNotification(): void {
    Notification.requestPermission((permission) => {
      if (permission === 'granted') {
        this.registerBackgroundSync();
      } else {
        console.error('Permission was not granted.');
      }
    });
  }

  registerBackgroundSync(): void {
    if (!navigator.serviceWorker) {
      return console.error('Service Worker not supported');
    }

    navigator.serviceWorker.ready
      .then((registration) => registration.sync.register('syncAttendees'))
      .then(() => console.log('Registered background sync'))
      .catch((err) => console.error('Error registering background sync', err));
  }
}
