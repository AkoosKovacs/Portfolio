import { Component, ViewChild, ElementRef, HostListener, AfterViewInit } from '@angular/core';
import { ClockComponent } from '../clock/clock';

@Component({
  selector: 'app-office',
  standalone: true,
  imports: [ClockComponent],
  templateUrl: './office.html',
  styleUrls: ['./office.scss'],
})
export class Office implements AfterViewInit {
  @ViewChild('officeWrapper') wrapper!: ElementRef;
  @ViewChild('officeImage') image!: ElementRef;

  ngAfterViewInit() {
    // Középre állítás mobilon a kép betöltése után
    this.centerScroll();
  }

  @HostListener('window:resize')
  onResize() {
    // Ablakméret változásakor frissítjük a scroll közép pozícióját
    this.centerScroll();
  }

  centerScroll() {
    const el = this.wrapper.nativeElement;
    const imgEl = this.image.nativeElement;

    if (window.innerWidth < 1200) {
      // csak mobil nézet
      const scrollableWidth = imgEl.clientWidth - el.clientWidth;
      if (scrollableWidth > 0) {
        // kép közepéről indul a scroll
        el.scrollLeft = scrollableWidth / 2;
      }
    }
  }

  openMenu(menu: string) {
    // Itt lehet majd kezelni a hotspotok kattintását
    console.log('Megnyitva:', menu);
  }
}
