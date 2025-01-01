import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class MyDataService {

  constructor(private storage: Storage) {
    this.init();
   }

   async init() {
    await this.storage.create();
    //Initialise default units if value is not already set
    if (!this.storage.get('units')){
      this.storage.set('units','metric');
    }
   }

   async set(key:string, value:any) {
    await this.storage.set(key,value);
   }

   async get(key:string) {
    return await this.storage.get(key);
   }
}
