import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { SearchComponent } from './pages/search/search.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginGoogleComponent } from './pages/login-google/login-google.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';

const routes: Routes = [
  { path: '', component: LoginGoogleComponent }, // Redirect to login page by default
  { path: 'search', component: SearchComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'home', component: HomeComponent }, // Home page route
  { path: '**', redirectTo: '' }, // Wildcard route for 404 page (optional)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
