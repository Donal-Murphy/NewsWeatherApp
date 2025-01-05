import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonIcon, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { MyHttpService } from '../services/my-http.service';
import { HttpOptions } from '@capacitor/core';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonCardTitle, IonCardContent, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCardHeader, RouterLink]
})
export class NewsPage implements OnInit {
  myNewsAPIKey: string = 'pub_6395725db9955eaaa1ef854417fc8c8c1ef77' //API key for newdata.io

  countryCode: string =''; //For storing countryCode. Initialise as null
  countryName: string = ''; //For storing countryName. Initialise as null
  newsData: any [] = []; //For storing country data from newsdata.io API. Initialize as empty array
  errorMessage: string = ''; // For storing error messages
  options: HttpOptions = {
    url: '' //For storing newsdata.io api url. Initialise as null
  }

  constructor(
    private route: ActivatedRoute, //Inject to recieve routed data
    private mhs:MyHttpService //Inject for http requests
  ) 
  {
    addIcons({ homeOutline }); //add Home Button icon
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.countryCode = params['countryCode'];
      this.countryName = params['countryName'];

    // Check if countryCode is not null and not an empty string
    if (this.countryCode) {
      //API call URL
      this.options.url = `https://newsdata.io/api/1/latest?apikey=${this.myNewsAPIKey}&country=${this.countryCode}`;

      this.getNews(); // Call the method to get news after getting countryCode
    } else {
      console.error('No countryCode provided.');
    }
  });

  }

  async getNews(){
    try {
      let result = await this.mhs.get(this.options); // Get initial data
      console.log(result); // Log the result for debugging

      // Check if result contains data and the status is 'success'
      if (result.data.status === 'success' && result.data.results.length > 0) {
        this.newsData = result.data.results || []; // Assign news data if available
      } else {
        this.newsData = []; // No news data
      }
    } catch (error) {
      // Handle any errors during the HTTP request
      console.error('Error fetching news:', error);
      this.newsData = []; // Ensure newsData is empty in case of error
    }
  }

}
