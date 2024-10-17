import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { BlogComponent } from './components/blog/blog.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'game/:id', component: GameDetailComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:id', component: BlogComponent },
  { path: 'newsletter', component: NewsletterComponent },
  { path: 'newsletter/:id', component: NewsletterComponent },
  { path: '**', component: NotFoundComponent }
];
