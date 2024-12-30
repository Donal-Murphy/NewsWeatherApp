import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonList, IonCheckbox, IonLabel } from '@ionic/angular/standalone';
import { MyDataService } from '../services/my-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonCheckbox, IonList, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel]
})
export class SettingsPage implements OnInit {
  selectedOption: string = 'Metric'; // Default units option

  constructor(private MyDataService: MyDataService) {}

  async ngOnInit() {
    // Load the stored units option
    const storedOption = await this.MyDataService.get('units');
    this.selectedOption = storedOption || 'Metric';
  }

  async onOptionChange(option: string) {
    this.selectedOption = option;
    await this.MyDataService.set('units', option); // Save selected units option
  }

}
