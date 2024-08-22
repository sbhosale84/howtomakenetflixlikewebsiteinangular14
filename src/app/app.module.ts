import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import {HttpClientModule} from '@angular/common/http';
import { MovieApiServiceService } from './service/movie-api-service.service';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginGoogleComponent } from './pages/login-google/login-google.component';
import { WatchlistComponent } from './pages/watchlist/watchlist.component';

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

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [MovieApiServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
