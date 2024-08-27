// import { Component, OnInit } from '@angular/core';
// import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
// import { Title, Meta } from '@angular/platform-browser';
// import { LoginService } from 'src/app/service/login.service';
// import { Router } from '@angular/router';
// import { WatchlistService } from 'src/app/service/watchlist.service';
// import { LikeListService } from 'src/app/service/like-list.service'; // Import the LikeListService
// import { ToastrService } from 'ngx-toastr';

// type MovieResults = {
//   results: any[];
// };

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css'],
// })
// export class HomeComponent implements OnInit {
//   userData: any;
//   loading: boolean = true;
//   watchlistStatus: { [key: number]: boolean } = {};
//   likelistStatus: { [key: number]: boolean } = {}; // Add likelistStatus property

//   bannerResult: any[] = [];
//   trendingMovieResult: any[] = [];
//   actionMovieResult: any[] = [];
//   adventureMovieResult: any[] = [];
//   animationMovieResult: any[] = [];
//   comedyMovieResult: any[] = [];
//   documentaryMovieResult: any[] = [];
//   sciencefictionMovieResult: any[] = [];
//   thrillerMovieResult: any[] = [];

//   constructor(
//     private service: MovieApiServiceService,
//     private title: Title,
//     private meta: Meta,
//     private signOutService: LoginService,
//     private router: Router,
//     private watchlistService: WatchlistService,
//     private likeListService: LikeListService, // Inject LikeListService
//     private toaster: ToastrService
//   ) {}

//   ngOnInit(): void {
//     this.title.setTitle('Movie App');
//     this.meta.updateTag({ name: 'description', content: 'Movie application' });
//     this.getBannerData();
//     this.getTrendingMovies();
//     this.getActionMovies();
//     this.getAdventureMovies();
//     this.getAnimationMovies();
//     this.getComedyMovies();
//     this.getDocumentaryMovies();
//     this.getScienceFictionMovies();
//     this.getThrillerMovies();
//   }

//   getBannerData() {
//     this.service.bannerApiData().subscribe((data: MovieResults) => {
//       this.bannerResult = data.results;
//       this.loading = false;
//     });
//   }

//   getTrendingMovies() {
//     this.service.trendingMovieApiData().subscribe((data: MovieResults) => {
//       this.trendingMovieResult = data.results;
//       this.setWatchlistStatus(this.trendingMovieResult);
//       this.setLikeListStatus(this.trendingMovieResult);
//     });
//   }

//   getActionMovies() {
//     this.service.fetchActionMovies().subscribe((data: MovieResults) => {
//       this.actionMovieResult = data.results;
//       this.setWatchlistStatus(this.actionMovieResult);
//       this.setLikeListStatus(this.actionMovieResult);
//     });
//   }

//   getAdventureMovies() {
//     this.service.fetchAdventureMovies().subscribe((data: MovieResults) => {
//       this.adventureMovieResult = data.results;
//       this.setWatchlistStatus(this.adventureMovieResult);
//       this.setLikeListStatus(this.adventureMovieResult);
//     });
//   }

//   getAnimationMovies() {
//     this.service.fetchAnimationMovies().subscribe((data: MovieResults) => {
//       this.animationMovieResult = data.results;
//       this.setWatchlistStatus(this.animationMovieResult);
//       this.setLikeListStatus(this.animationMovieResult);
//     });
//   }

//   getComedyMovies() {
//     this.service.fetchComedyMovies().subscribe((data: MovieResults) => {
//       this.comedyMovieResult = data.results;
//       this.setWatchlistStatus(this.comedyMovieResult);
//       this.setLikeListStatus(this.comedyMovieResult);
//     });
//   }

//   getDocumentaryMovies() {
//     this.service.fetchDocumentaryMovies().subscribe((data: MovieResults) => {
//       this.documentaryMovieResult = data.results;
//       this.setWatchlistStatus(this.documentaryMovieResult);
//       this.setLikeListStatus(this.documentaryMovieResult);
//     });
//   }

//   getScienceFictionMovies() {
//     this.service.fetchScienceFictionMovies().subscribe((data: MovieResults) => {
//       this.sciencefictionMovieResult = data.results;
//       this.setWatchlistStatus(this.sciencefictionMovieResult);
//       this.setLikeListStatus(this.sciencefictionMovieResult);
//     });
//   }

//   getThrillerMovies() {
//     this.service.fetchThrillerMovies().subscribe((data: MovieResults) => {
//       this.thrillerMovieResult = data.results;
//       this.setWatchlistStatus(this.thrillerMovieResult);
//       this.setLikeListStatus(this.thrillerMovieResult);
//     });
//   }

//   toggleWatchlist(movie: any) {
//     if (this.watchlistStatus[movie.id]) {
//       this.watchlistService.removeFromWatchlist(movie);
//       this.toaster.warning('Removed from Watchlist');
//     } else {
//       this.watchlistService.addToMovieWatchlist(movie);
//       this.toaster.success('Added to Watchlist');
//     }
//     this.watchlistStatus[movie.id] = !this.watchlistStatus[movie.id];
//   }

//   toggleLikeList(movie: any) {
//     if (this.likelistStatus[movie.id]) {
//       this.likeListService.removeFromLikeList(movie);
//       this.toaster.warning('Removed from Like List');
//     } else {
//       this.likeListService.addMovieToLikeList(movie);
//       this.toaster.success('Added to Like List');
//     }
//     this.likelistStatus[movie.id] = !this.likelistStatus[movie.id];
//   }

//   setWatchlistStatus(movies: any[]) {
//     movies.forEach(movie => {
//       this.watchlistStatus[movie.id] = this.watchlistService.isMovieInWatchlist(movie.id);
//     });
//   }

//   setLikeListStatus(movies: any[]) {
//     movies.forEach(movie => {
//       this.likelistStatus[movie.id] = this.likeListService.isItemInLikeList(movie.id);
//     });
//   }

//   navigateToDetails(movie: any) {
//     this.router.navigate(['/movie', movie.id]);
//   }
// }



import { Component, OnInit } from '@angular/core';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { Title, Meta } from '@angular/platform-browser';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { WatchlistService } from 'src/app/service/watchlist.service';
import { LikeListService } from 'src/app/service/like-list.service';
import { ToastrService } from 'ngx-toastr';

interface Movie {
  id: number;
  title?: string; // Make this optional if some movies might only have an original_title
  original_title?: string; // Add this if movies might have an original title
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}


type MovieResults = {
  results: Movie[];
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userData: any;
  loading: boolean = true;
  watchlistStatus: { [key: number]: boolean } = {};
  likelistStatus: { [key: number]: boolean } = {};

  // Define your categories with types
  categories: { name: string; data: keyof HomeComponent }[] = [
    { name: 'Trending Movies', data: 'trendingMovieResult' },
    { name: 'Action Movies', data: 'actionMovieResult' },
    { name: 'Adventure Movies', data: 'adventureMovieResult' },
    { name: 'Animation Movies', data: 'animationMovieResult' },
    { name: 'Comedy Movies', data: 'comedyMovieResult' },
    { name: 'Documentary Movies', data: 'documentaryMovieResult' },
    { name: 'Science-Fiction Movies', data: 'sciencefictionMovieResult' },
    { name: 'Thriller Movies', data: 'thrillerMovieResult' },
  ];

  // Movie result arrays
  bannerResult: Movie[] = [];
  trendingMovieResult: Movie[] = [];
  actionMovieResult: Movie[] = [];
  adventureMovieResult: Movie[] = [];
  animationMovieResult: Movie[] = [];
  comedyMovieResult: Movie[] = [];
  documentaryMovieResult: Movie[] = [];
  sciencefictionMovieResult: Movie[] = [];
  thrillerMovieResult: Movie[] = [];

  constructor(
    private service: MovieApiServiceService,
    private title: Title,
    private meta: Meta,
    private signOutService: LoginService,
    private router: Router,
    private watchlistService: WatchlistService,
    private likeListService: LikeListService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  // Fetch movies for all categories
  fetchMovies() {
    this.service.bannerApiData().subscribe((data: MovieResults) => {
      this.bannerResult = data.results;
      this.loading = false;
    });

    this.service.trendingMovieApiData().subscribe((data: MovieResults) => {
      this.trendingMovieResult = data.results;
    });

    this.service.fetchActionMovies().subscribe((data: MovieResults) => {
      this.actionMovieResult = data.results;
    });

    this.service.fetchAdventureMovies().subscribe((data: MovieResults) => {
      this.adventureMovieResult = data.results;
    });

    this.service.fetchAnimationMovies().subscribe((data: MovieResults) => {
      this.animationMovieResult = data.results;
    });

    this.service.fetchComedyMovies().subscribe((data: MovieResults) => {
      this.comedyMovieResult = data.results;
    });

    this.service.fetchDocumentaryMovies().subscribe((data: MovieResults) => {
      this.documentaryMovieResult = data.results;
    });

    this.service.fetchScienceFictionMovies().subscribe((data: MovieResults) => {
      this.sciencefictionMovieResult = data.results;
    });

    this.service.fetchThrillerMovies().subscribe((data: MovieResults) => {
      this.thrillerMovieResult = data.results;
    });
  }

  // Navigate to movie details page
  navigateToDetails(movie: Movie) {
    this.router.navigate(['/movie', movie.id]);
  }

  // Toggle watchlist status and provide feedback
  toggleWatchlist(movie: Movie) {
    this.watchlistService.addToMovieWatchlist(movie);
    this.watchlistStatus[movie.id] = !this.watchlistStatus[movie.id];
    this.toastr.success(
      `${movie.title} ${this.watchlistStatus[movie.id] ? 'added to' : 'removed from'} Watchlist`
    );
  }

  // Toggle like list status and provide feedback
  toggleLikeList(movie: Movie) {
    this.likeListService.addMovieToLikeList(movie);
    this.likelistStatus[movie.id] = !this.likelistStatus[movie.id];
    this.toastr.success(
      `${movie.title} ${this.likelistStatus[movie.id] ? 'liked' : 'disliked'}`
    );
  }
}
