import { Component, OnInit } from '@angular/core';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { Title, Meta } from '@angular/platform-browser';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { WatchlistService } from 'src/app/service/watchlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userData: any;
  loading: boolean = true;
  watchlist: any[] = [];
  watchlistStatus: { [key: number]: boolean } = {};

  constructor(
    private service: MovieApiServiceService,
    private title: Title,
    private meta: Meta,
    private signOutService: LoginService,
    private router: Router,
    private watchlistService: WatchlistService,
  ) {
    this.title.setTitle('Home - showtime');
    this.meta.updateTag({
      name: 'description',
      content: 'watch online movies',
    });

    this.getData();
  }

  bannerResult: any = [];
  trendingMovieResult: any = [];
  actionMovieResult: any = [];
  adventureMovieResult: any = [];
  animationMovieResult: any = [];
  comedyMovieResult: any = [];
  documentaryMovieResult: any = [];
  sciencefictionMovieResult: any = [];
  thrillerMovieResult: any = [];

  ngOnInit(): void {
    this.loadData();
  }

  reloadPage(): void {
    this.loading = true;
    setTimeout(() => {
      location.reload();
    }, 500); // Adjust the timeout to ensure the spinner is displayed before reloading
  }

  loadData(): void {
    this.bannerData();
    this.trendingData();
    this.actionMovie();
    this.adventureMovie();
    this.comedyMovie();
    this.animationMovie();
    this.documentaryMovie();
    this.sciencefictionMovie();
    this.thrillerMovie();

    setTimeout(() => {
      this.loading = false; // Hide the spinner after loading data
    }, 1000); // Adjust the timeout duration as needed
  }

  checkWatchlistStatus(movieId: number): void {
    this.watchlistStatus[movieId] = this.watchlistService.isMovieInWatchlist(movieId);
  }

  toggleWatchlist(movie: any): void {
    const movieId = movie.id;
    
    if (this.watchlistStatus[movieId]) {
      this.watchlistService.removeFromWatchlist(movie);
      this.watchlistStatus[movieId] = false;
      alert(`${movie.original_title} has been removed from your watchlist.`);
    } else {
      this.watchlistService.addToWatchlist(movie);
      this.watchlistStatus[movieId] = true;
      alert(`${movie.original_title} has been added to your watchlist.`);
    }
  }
  navigateToDetails(movie: any) {
    this.router.navigate([`/movie/${movie.id}`], {
      state: { rating: movie.vote_average },
    });
  }

  addToWatchlist(movie: any): void {
    this.watchlistService.addToWatchlist(movie);
    alert(`${movie.original_title} has been added to your watchlist.`);
  }

  removeWatchList(id: any): void {
    this.watchlistService.removeFromWatchlist(id);
  }

   checkWatchlistStatusForMovies(movies: any[]): void {
    movies.forEach(movie => this.checkWatchlistStatus(movie.id));
  }

  // Banner data
 
  bannerData() {
    this.service.bannerApiData().subscribe((result) => {
      this.bannerResult = result.results;
      this.checkWatchlistStatusForMovies(this.bannerResult);
    });
  }

  trendingData() {
    this.service.trendingMovieApiData().subscribe((result) => {
      this.trendingMovieResult = result.results;
      this.checkWatchlistStatusForMovies(this.trendingMovieResult);
    });
  }

  actionMovie() {
    this.service.fetchActionMovies().subscribe((result) => {
      this.actionMovieResult = result.results;
      this.checkWatchlistStatusForMovies(this.actionMovieResult);
    });
  }

  // Adventure movies
  adventureMovie() {
    this.service.fetchAdventureMovies().subscribe((result) => {
      this.adventureMovieResult = result.results;
    });
  }

  // Animation movies
  animationMovie() {
    this.service.fetchAnimationMovies().subscribe((result) => {
      this.animationMovieResult = result.results;
    });
  }

  // Comedy movies
  comedyMovie() {
    this.service.fetchComedyMovies().subscribe((result) => {
      this.comedyMovieResult = result.results;
    });
  }

  // Documentary movies
  documentaryMovie() {
    this.service.fetchDocumentaryMovies().subscribe((result) => {
      this.documentaryMovieResult = result.results;
    });
  }

  // Science fiction movies
  sciencefictionMovie() {
    this.service.fetchScienceFictionMovies().subscribe((result) => {
      this.sciencefictionMovieResult = result.results;
    });
  }

  // Thriller movies
  thrillerMovie() {
    this.service.fetchThrillerMovies().subscribe((result) => {
      this.thrillerMovieResult = result.results;
    });
  }

  getData() {
    const storedData = sessionStorage.getItem('loggedInUser');
    if (storedData) {
      this.userData = JSON.parse(storedData);
      console.log('Retrieved User Data:', this.userData);
    } else {
      console.log('No user data found in session storage.');
    }
  }

  logOut() {
    sessionStorage.removeItem('loggedInUser');
    this.signOutService.signOut();
  }
}
