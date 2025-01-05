import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { MyDataService } from '../services/my-data.service';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonCardTitle, IonCardContent, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCardHeader, RouterLink]
})
export class weatherPage implements OnInit {
  myWeatherAPIKey: string = '2c305234f2bc00b8f732a539d8137552'; //API key for openweathermap.org

  capitalCoord: number[] = []; //For storing capitalCoord. Initialise as null
  countryName: string = ''; //For storing countryName. Initialise as empty string
  countryCapital: string =''; //For storing countryCapital. Initialise as empty string
  weatherData: any = {}; //For storing country data from weatherdata.io API. Initialize as empty array
  units:string = ''; //For storing measurement units. Initialise as empty string


  options: HttpOptions = {
    url: '' //For storing weatherdata.io api url. Initialise as null
  }

  constructor(
    private route: ActivatedRoute, //Inject to recieve routed data
    private mhs:MyHttpService, //Inject for http requests
    private MyDataService: MyDataService, //Inject for data storage
  ) 
  {
    addIcons({ homeOutline }); //add Home Button icon
   }

  async ngOnInit() {
    //Retrieve params from countries page
    this.route.queryParams.subscribe(params => {
      this.capitalCoord = params['capitalCoord'],
      this.countryName = params['countryName'],
      this.countryCapital = params['countryCapital'];
  });

  this.units = await this.MyDataService.get('units'); //Retrieve units
  console.log(this.units);

  // Check if capitalCoord is not null and not an empty string
  if (this.capitalCoord) {
    //Extract coordinaltes from array
    let lat:number = this.capitalCoord[0];
    let lon:number = this.capitalCoord[1];

    //API call url
    this.options.url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.myWeatherAPIKey}&units=${this.units}`;

    this.getWeather(); // Call the method to get weather after getting coordinates
  } else {
    //Log error message for missing data
    console.error('No coordinates provided.');
    this.weatherData = {};
  }

  }

  async getWeather(){
    try {
      let result = await this.mhs.get(this.options); // Get initial data
      //console.log(result); // Log the result for debugging
      this.weatherData = result.data; // Assign weather data if available
      console.log(this.weatherData)
      
    } catch (error) {
      // Handle any errors during the HTTP request
      console.error('Error fetching weather:', error);
      this.weatherData = {}; // Ensure weatherData is empty in case of error
    }
  }

  //Returns a string with icon image url
  getImageUrl(iconCode: string){
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
  }

  //Returns a string featuring the correct units
  getUnitsText(){
    if(this.units === 'metric'){
      return `\u00B0C (${this.units})`;
    }if(this.units === 'standard'){
      return `Kelvin (${this.units})`;
    }if(this.units === 'imperial'){
      return `\u00B0F (${this.units})`;
    }else{
      console.log('Invalid units detected');
      return
    }
  }

}
