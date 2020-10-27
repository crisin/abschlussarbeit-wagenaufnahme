import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { Injectable } from '@angular/core';
import { openDB, deleteDB, wrap, unwrap } from 'idb';

@Injectable({
  providedIn: 'root',
})
export class IdbService {
  idbPromise: Promise<any>;
  constructor() {
    if (!('indexedDB' in window)) {
      console.log('This browser doesn\'t support IndexedDB');
      return;
    }
    this.idbPromise = this.createIDB();
  }

  async createIDB(): Promise<any> {
    return await openDB('test-db-name', 1, {
      // besseren namen ausdenken (wagenaufnahme)
      upgrade(db, oldVersion, newVersion, transaction): void {
        console.log('upgrade called');

        console.log('Creating the products object store');
        db.createObjectStore('products', { keyPath: 'id' }); // products => auftraege

        console.log('Creating a name index');
        const store = transaction.objectStore('products');
        store.createIndex('name', 'name', { unique: true }); // name => wagennummer

        store.createIndex('price', 'price');
        store.createIndex('description', 'description');
      },
      blocked(): void {
        // …
      },
      blocking(): void {
        // …
      },
      terminated(): void {
        // …
      },
    });
  }

  addProducts(): any {
    this.idbPromise.then((db) => {
      const tx = db.transaction('products', 'readwrite');
      const store = tx.objectStore('products');
      const items = [
        {
          name: 'Couch',
          id: 'cch-blk-ma',
          price: 499.99,
          color: 'black',
          material: 'mahogany',
          description: 'A very comfy couch',
          quantity: 3,
        },
        {
          name: 'Armchair',
          id: 'ac-gr-pin',
          price: 299.99,
          color: 'grey',
          material: 'pine',
          description: 'A plush recliner armchair',
          quantity: 7,
        },
        {
          name: 'Stool',
          id: 'st-re-pin',
          price: 59.99,
          color: 'red',
          material: 'pine',
          description: 'A light, high-stool',
          quantity: 3,
        },
        {
          name: 'Chair',
          id: 'ch-blu-pin',
          price: 49.99,
          color: 'blue',
          material: 'pine',
          description: 'A plain chair for the kitchen table',
          quantity: 1,
        },
        {
          name: 'Dresser',
          id: 'dr-wht-ply',
          price: 399.99,
          color: 'white',
          material: 'plywood',
          description: 'A plain dresser with five drawers',
          quantity: 4,
        },
        {
          name: 'Cabinet',
          id: 'ca-brn-ma',
          price: 799.99,
          color: 'brown',
          material: 'mahogany',
          description: 'An intricately-designed, antique cabinet',
          quantity: 11,
        },
      ];
      return Promise.all(
        items.map((item) => {
          console.log('Adding item: ', item);
          return store.add(item);
        })
      )
        .catch((e) => {
          tx.abort();
          console.log(e);
        })
        .then(() => {
          console.log('All items added successfully!');
        });
    });
  }

  getByName(key: string): Promise<any> {
    return this.idbPromise.then((db) => {
      const tx = db.transaction('products', 'readonly');
      const store = tx.objectStore('products');
      const index = store.index('name');
      const result = index.get(key);
      console.log(result);
      return result;
    });
  }
}
