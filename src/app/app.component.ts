import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Шифр Виженера';
  routeLinks: any[];

  constructor() {
    this.routeLinks = [
      { label: 'Взломать', link: 'crack' },
      { label: 'Расшифровать', link: 'decode' },
      { label: 'Зашифровать', link: 'encode' }
    ];
  }
}