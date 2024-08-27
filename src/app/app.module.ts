import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieApiServiceService } from './service/movie-api-service.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginGoogleComponent } from './pages/login-google/login-google.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LikeListComponent } from './pages/like-list/like-list.component';
import { TvSeriesComponent } from './pages/tv-series/tv-series.component';
import { TvSeriesDetailsComponent } from './pages/tv-series-details/tv-series-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    MovieDetailsComponent,
    LoginComponent,
    HeaderComponent,
    LoginGoogleComponent,
    WatchlistComponent,
    LikeListComponent,
    TvSeriesComponent,
    TvSeriesDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', // Position of the toast
      timeOut: 3000, // Duration for which the toast is visible
      preventDuplicates: true, // Prevent duplicate toasts
      // closeButton: true, // Show close button
      enableHtml: true, // Enable HTML content
      tapToDismiss: true, // Dismiss the toast on click
      newestOnTop: true, // Display newest toasts on top
      progressAnimation: 'increasing', // Progress animation
      easeTime: 500, // Time for the easing effect
      maxOpened: 3, // Maximum number of opened toasts
      autoDismiss: true, // Automatically dismiss the toast
      
    }),

  ],
  providers: [MovieApiServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
