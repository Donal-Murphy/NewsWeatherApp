import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonButtons, IonTextarea } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MyDataService } from '../services/my-data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, RouterLink, IonButton, IonIcon, IonButtons, IonTextarea, FormsModule],
})
export class HomePage {
  userInput: string = ''; //Store user search query

  constructor(private navCtrl: NavController) {
    addIcons({ settingsOutline }); //add ion settings icon
  }

  //Sends country query param to countries page
  countrySearch() {

    const trimmedInput = this.userInput.trim(); //Trim input

    // Check if input is empty or invalid
    if (!trimmedInput) {
      console.warn('Search query is empty. Navigation aborted.');
     return; // Prevent navigation
    }

    this.navCtrl.navigateForward('/countries', {
      queryParams: {
      countryQuery: this.userInput //Set countryQuery to user input
      }
    });
  }
}
