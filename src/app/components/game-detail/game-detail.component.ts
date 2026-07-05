import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
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

  constructor(private route: ActivatedRoute, private location: Location, private router: Router) {
    this.gameId = this.route.snapshot.paramMap.get('id');
  }

  goBack(): void {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      this.location.back();
      return;
    }

    this.router.navigate(['/']);
  }
}
