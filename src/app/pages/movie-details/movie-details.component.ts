import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { Title, Meta } from '@angular/platform-browser';
import { WatchlistService } from 'src/app/service/watchlist.service';
import { LikeListService } from 'src/app/service/like-list.service'; // Import LikeListService
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  getMovieDetailResult: any;
  getMovieVideoResult: any;
  getMovieCastResult: any;
  watchlist: any[] = [];
  watchlistStatus: { [key: number]: boolean } = {};
  likelistStatus: { [key: number]: boolean } = {}; // LikeList status

  constructor(
    private service: MovieApiServiceService,
    private router: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    private watchlistService: WatchlistService,
    private likeListService: LikeListService, // Inject LikeListService
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    console.log(getParamId, 'getparamid#');

    this.getMovie(getParamId);
    this.getVideo(getParamId);
    this.getMovieCast(getParamId);
  }

  checkWatchlistStatus(movieId: number): void {
    this.watchlistStatus[movieId] =
      this.watchlistService.isMovieInWatchlist(movieId);
  }

  toggleWatchlist(movie: any): void {
    const movieId = movie.id;

    if (this.watchlistStatus[movieId]) {
      this.watchlistService.removeFromWatchlist(movie);
      this.watchlistStatus[movieId] = false;
      this.toaster.error(`${movie.original_title} removed from watchlist.`);
    } else {
      this.watchlistService.addToMovieWatchlist(movie);
      this.watchlistStatus[movieId] = true;
      this.toaster.success(`${movie.original_title} has been added to watchlist.`);
    }
  }

  checkLikeListStatus(movieId: number): void {
    this.likelistStatus[movieId] =
      this.likeListService.isItemInLikeList(movieId);
  }

  toggleLikeList(movie: any): void {
    const movieId = movie.id;

    if (this.likelistStatus[movieId]) {
      this.likeListService.removeFromLikeList(movie);
      this.likelistStatus[movieId] = false;
      this.toaster.error(`${movie.original_title} removed from likelist.`);
    } else {
      this.likeListService.addMovieToLikeList(movie);
      this.likelistStatus[movieId] = true;
      this.toaster.success(`${movie.original_title} has been added to likelist.`);
    }
  }

  checkWatchlistStatusForMovies(movies: any[]): void {
    movies.forEach((movie) => this.checkWatchlistStatus(movie.id));
  }

  checkLikeListStatusForMovies(movies: any[]): void {
    movies.forEach((movie) => this.checkLikeListStatus(movie.id));
  }

  getMovie(id: any) {
    this.service.getMovieDetails(id).subscribe(async (result) => {
      console.log(result, 'getmoviedetails#');
      this.getMovieDetailResult = await result;
      this.checkWatchlistStatusForMovies([this.getMovieDetailResult]);
      this.checkLikeListStatusForMovies([this.getMovieDetailResult]);

      // update tags
      this.title.setTitle(
        `${this.getMovieDetailResult.original_title} | ${this.getMovieDetailResult.tagline}`
      );
      this.meta.updateTag({
        name: 'title',
        content: this.getMovieDetailResult.original_title,
      });
      this.meta.updateTag({
        name: 'description',
        content: this.getMovieDetailResult.overview,
      });

      // facebook
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      this.meta.updateTag({ property: 'og:url', content: `` });
      this.meta.updateTag({
        property: 'og:title',
        content: this.getMovieDetailResult.original_title,
      });
      this.meta.updateTag({
        property: 'og:description',
        content: this.getMovieDetailResult.overview,
      });
      this.meta.updateTag({
        property: 'og:image',
        content: `https://image.tmdb.org/t/p/original/${this.getMovieDetailResult.backdrop_path}`,
      });
    });
  }

  getVideo(id: any) {
    this.service.getMovieVideo(id).subscribe((result) => {
      console.log(result, 'getMovieVideo#');
      result.results.forEach((element: any) => {
        if (element.type == 'Trailer') {
          this.getMovieVideoResult = element.key;
        }
      });
    });
  }

  getMovieCast(id: any) {
    this.service.getMovieCast(id).subscribe((result) => {
      console.log(result, 'movieCast#');
      this.getMovieCastResult = result.cast;
    });
  }
}
