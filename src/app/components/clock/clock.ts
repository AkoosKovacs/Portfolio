import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-clock',
  standalone: true,
  templateUrl: './clock.html',
  styleUrls: ['./clock.scss'],
})
export class ClockComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas1', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;
  radius!: number;

  ngOnInit(): void {
    // Itt nem rajzolunk még, csak a canvas referenciát fogjuk meg
  }

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.radius = this.canvas.nativeElement.height / 2;
    this.ctx.translate(this.radius, this.radius);
    this.radius = this.radius * 0.9;

    // 💡 Rögtön indítsd el a rajzolást (nem setInterval után)
    this.drawClock();
    setInterval(() => this.drawClock(), 1000);
  }

  drawClock() {
    this.drawFace();
    this.drawNumbers();
    this.drawTime();
  }

  drawFace() {
    let ctx = this.ctx;
    let radius = this.radius;

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'White';
    ctx.fill();

    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
  }

  drawNumbers() {
    let ctx = this.ctx;
    let radius = this.radius;
    let ang: number;
    let num: number;

    ctx.font = radius * 0.15 + 'px arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    for (num = 1; num < 13; num++) {
      ang = (num * Math.PI) / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }
  }

  drawTime() {
    let ctx = this.ctx;
    let radius = this.radius;

    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    hour = hour % 12;
    hour = (hour * Math.PI) / 6 + (minute * Math.PI) / (6 * 60) + (second * Math.PI) / (360 * 60);
    this.drawHand(hour, radius * 0.5, radius * 0.07);

    minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
    this.drawHand(minute, radius * 0.8, radius * 0.07);

    second = (second * Math.PI) / 30;
    this.drawHand(second, radius * 0.9, radius * 0.02);
  }

  drawHand(pos: number, length: number, width: number) {
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }
}
