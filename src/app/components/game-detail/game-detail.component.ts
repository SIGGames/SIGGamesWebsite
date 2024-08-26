import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.css'
})
export class GameDetailComponent {
  gameId: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.gameId = this.route.snapshot.paramMap.get('id');
  }
}
