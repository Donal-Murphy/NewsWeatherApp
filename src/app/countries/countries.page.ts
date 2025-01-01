import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CountriesPage implements OnInit {
  countryQuery: string = '';//For storing country query string. Initialize as null
  countryData: any | []; //For storing country data from API. Initialize as empty array

  options: HttpOptions = {
    url: '' //For storing restcountries api url
  }
  constructor(
    private route: ActivatedRoute, //Inject for query parameters
    private mhs:MyHttpService, //Inject for http requests
    private router: Router //Inject for data routing
  ) { } 
  

  async ngOnInit() {
     //Retrieve country query
    this.route.queryParams.subscribe(params => {
      this.countryQuery = params['countryQuery'];

      //Error if query is null
      if (!this.countryQuery) {
        console.error('No valid country query provided');
        return;
      }

    // Update the URL in HttpOptions with the countryQuery value
    if (this.countryQuery) {
      this.options.url = `https://restcountries.com/v3.1/name/${this.countryQuery}`;
    }

    })
    
    this.getCountries(); //Execute country data retrieval
  }

  //Retrieves country data from restcountries api
  async getCountries() {
    let result = await this.mhs.get(this.options); //Get intial data

    // Check if the data is null or empty
    if (!result.data || result.data.length === 0) {
      console.error('No country data found.');
      // Send a message to display to the user
      this.countryData = []; //reset variable
      this.showNoDataMessage(); // Call a method to notify the user
      return;
    }

    this.countryData = result.data; //Store data from data section of the JSON
  }

  //Sends country code to news page
  countryNewsSearch(countryCode:string){
    this.router.navigate(['/news'], { queryParams: { countryCode } }); // Navigate to a news page & pass countryCode
  }

  //Sends country code to news page
  countryWeatherSearch(countryCode:string){
    this.router.navigate(['/weather'], { queryParams: { countryCode } }); // Navigate to a weather page & pass countryCode
  }

  // Method to show an alert if no data is found
  showNoDataMessage() {
    alert('No countries found for the provided query. Please check the country name and try again.');
  }


}
