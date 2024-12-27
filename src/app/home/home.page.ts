import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonButtons, IonTextarea} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, RouterLink, IonButton, IonIcon, IonButtons, IonTextarea],
})
export class HomePage {
  constructor() {
    addIcons({settingsOutline});
  }
}
