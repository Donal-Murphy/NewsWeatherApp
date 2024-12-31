import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardContent, IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CountriesPage implements OnInit {
  countryQuery: string | null = null;
  countryData: any;

  options: HttpOptions = {
    url: ""
  }
  constructor(private route: ActivatedRoute, private mhs:MyHttpService) { }
  

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.countryQuery = params['countryQuery'];

      // Update the URL in HttpOptions with the countryQuery value
    if (this.countryQuery) {
      this.options.url = `https://restcountries.com/v3.1/name/${this.countryQuery}`;
    }

    })
    this.countryData = [];
    this.getCountries();
  }

  async getCountries() {
    let result = await this.mhs.get(this.options);
    this.countryData = result.data;
    console.log(this.countryData);
  }

}
