import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonButtons, IonTextarea } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, RouterLink, IonButton, IonIcon, IonButtons, IonTextarea, FormsModule],
})
export class HomePage {
  userInput: string = '';

  constructor(private navCtrl: NavController) {
    addIcons({ settingsOutline });
  }

  countrySearch() {
    this.navCtrl.navigateForward('/countries', {
      queryParams: {
        countryQuery: this.userInput
      }
    });
  }
}
