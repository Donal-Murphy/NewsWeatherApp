import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.page.html',
  styleUrls: ['./countries.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class CountriesPage implements OnInit {
  countryQuery: string = '';//For storing country query string. Initialize as null
  countryData: any[] = []; //For storing country data from API. Initialize as empty array
  errorMessage: string = ''; // To store error messages

  options: HttpOptions = {
    url: '' //For storing restcountries api url
  }
  
  constructor(
    private route: ActivatedRoute, //Inject for query parameters
    private mhs:MyHttpService, //Inject for http requests
    private router: Router //Inject for data routing
  ) 
  {  
    addIcons({ homeOutline }); //add Home Button icon
  } 
  

  async ngOnInit() {
     //Retrieve country query
    this.route.queryParams.subscribe(params => {
      this.countryQuery = params['countryQuery'];

      //Error if query is null
      if (!this.countryQuery) {
        console.error('No country query provided');
        this.errorMessage = 'No country query provided'
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
      let result = await this.mhs.get(this.options) || null; // Get initial data
      if (result && Array.isArray(result.data)) {
        this.countryData = result.data; // If data is an array, assign it
      } else {
        this.countryData = []; // If not an array, reset countryData
        this.errorMessage = 'Country Not Found';
      }
  }

  //Sends country code to news page
  countryNewsSearch(countryCode:string, countryName:string){
    // Navigate to a news page & pass params
    this.router.navigate(['/news'], { queryParams: { countryCode: countryCode, countryName: countryName} }); 
  }

  //Sends country coordainatesm name and capital to weather page
  countryWeatherSearch(capitalCoord:number[], countryName: string, countryCapital: string){
    // Navigate to a weather page & pass params
    this.router.navigate(['/weather'], { 
      queryParams: { capitalCoord: capitalCoord,  countryName:countryName, countryCapital: countryCapital} 
    }); 
  }

}
