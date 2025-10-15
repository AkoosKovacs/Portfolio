import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.scss'],
})
export class LandingPage {
  isOpen = false;
  hideNameSign = false;
  hasEntered = false;

  constructor(private router: Router) {}

  toggleDoor() {
    this.isOpen = true;

    // 1️⃣ Ajtó kinyílik
    setTimeout(() => {
      this.hideNameSign = true;
    }, 600); // az ajtó forgás ideje

    // 2️⃣ Belépés animáció
    setTimeout(() => {
      this.hasEntered = true;
    }, 1200); // a belépés animáció kezdete

    // 3️⃣ Navigáció a főoldalra az animáció után
    setTimeout(() => {
      this.router.navigate(['/office']); // ide írd a főoldalad route-ját
    }, 1800); // összes animáció után (állítsd az időt a saját animációidhoz)
  }
}
