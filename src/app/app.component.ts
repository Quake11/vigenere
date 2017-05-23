import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Шифр Виженера';
  routeLinks: any[];
  activeLinkIndex = 0;

  constructor(private router: Router) {
    this.routeLinks = [
      { label: 'Взломать', link: 'crack' },
      { label: 'Расшифровать', link: 'decode' },
      { label: 'Зашифровать', link: 'encode' }
    ];

  }

  gotoGithub(): void {
    const win = window.open('https://github.com/Quake11rus/vigenere', '_blank');
    win.focus();
  }
}