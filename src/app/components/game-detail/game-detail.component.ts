import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.css'
})
export class GameDetailComponent {
  gameId: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.gameId = this.route.snapshot.paramMap.get('id');
  }
}
