import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { MyDataService } from '../services/my-data.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardContent, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCardHeader]
})
export class weatherPage implements OnInit {
  myWeatherAPIKey: string = '2c305234f2bc00b8f732a539d8137552'; //API key for openweathermap.org

  capitalCoord: number[] = []; //For storing capitalCoord. Initialise as null
  weatherData: any = null; //For storing country data from weatherdata.io API. Initialize as empty array
  units:string = '';
  errorMessage: string = ''; // For storing error messages
  options: HttpOptions = {
    url: '' //For storing weatherdata.io api url. Initialise as null
  }

  constructor(
    private route: ActivatedRoute, //Inject to recieve routed data
    private mhs:MyHttpService, //Inject for http requests
    private MyDataService: MyDataService, //Inject for data storage
  ) { }

  async ngOnInit() {
    //Retrieve params from countries page
    this.route.queryParams.subscribe(params => {
      this.capitalCoord = params['capitalCoord'];
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
    this.weatherData = null;
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
      this.weatherData = null; // Ensure weatherData is empty in case of error
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
