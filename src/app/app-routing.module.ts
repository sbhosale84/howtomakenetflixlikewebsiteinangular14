import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { SearchComponent } from './pages/search/search.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginGoogleComponent } from './pages/login-google/login-google.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';
import { LikeListComponent } from './pages/like-list/like-list.component';
import { TvSeriesComponent } from './pages/tv-series/tv-series.component';
import { TvSeriesDetailsComponent } from './pages/tv-series-details/tv-series-details.component';
import { AuthGuard } from './pages/login-google/authGurd';

const routes: Routes = [
  { path: '', component: LoginGoogleComponent, canActivate:[AuthGuard] }, // Redirect to login page by default
  { path: 'search', component: SearchComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'likelist', component: LikeListComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'tvSeries/:id', component: TvSeriesDetailsComponent },
  { path: 'home', component: HomeComponent }, // Home page route
  { path: 'tvSeries', component: TvSeriesComponent }, // Home page route
  { path: '**', redirectTo: '' }, // Wildcard route for 404 page (optional)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
