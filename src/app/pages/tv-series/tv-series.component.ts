// import { Component, OnInit } from '@angular/core';
// import { TvSeriesApiService } from 'src/app/service/tv-series-api.service';
// import { Title, Meta } from '@angular/platform-browser';
// import { LoginService } from 'src/app/service/login.service';
// import { Router } from '@angular/router';
// import { WatchlistService } from 'src/app/service/watchlist.service';
// import { LikeListService } from 'src/app/service/like-list.service';
// import { ToastrService } from 'ngx-toastr';

// type TvSeriesResults = {
//   results: any[];
// };

// @Component({
//   selector: 'app-tv-series',
//   templateUrl: './tv-series.component.html',
//   styleUrls: ['./tv-series.component.css'],
// })
// export class TvSeriesComponent implements OnInit {
//   userData: any;
//   loading: boolean = true;
//   watchlistStatus: { [key: number]: boolean } = {};
//   likelistStatus: { [key: number]: boolean } = {};

//   bannerResult: any[] = [];
//   trendingTvSeriesResult: any[] = [];
//   actionTvSeriesResult: any[] = [];
//   adventureTvSeriesResult: any[] = [];
//   animationTvSeriesResult: any[] = [];
//   comedyTvSeriesResult: any[] = [];
//   documentaryTvSeriesResult: any[] = [];
//   sciencefictionTvSeriesResult: any[] = [];
//   thrillerTvSeriesResult: any[] = [];

//   constructor(
//     private service: TvSeriesApiService,
//     private title: Title,
//     private meta: Meta,
//     private signOutService: LoginService,
//     private router: Router,
//     private watchlistService: WatchlistService,
//     private likeListService: LikeListService,
//     private toaster: ToastrService
//   ) {
//     this.title.setTitle('TV Series - Showtime');
//     this.meta.updateTag({
//       name: 'description',
//       content: 'watch online TV series',
//     });

//   }

//   ngOnInit(): void {
//     this.loadAllData();
//     this.loadWatchlist();
//     this.loadLikelist();
//   }

//   reloadPage(): void {
//     this.loading = true;
//     setTimeout(() => {
//       location.reload();
//     }, 500);
//   }

//   loadAllData(): void {
//     const dataFetchers = [
//       { method: this.service.bannerApiData(), key: 'bannerResult' },
//       {
//         method: this.service.trendingTvSeriesApiData(),
//         key: 'trendingTvSeriesResult',
//       },
//       {
//         method: this.service.fetchActionTvSeries(),
//         key: 'actionTvSeriesResult',
//       },
//       {
//         method: this.service.fetchAdventureTvSeries(),
//         key: 'adventureTvSeriesResult',
//       },
//       {
//         method: this.service.fetchAnimationTvSeries(),
//         key: 'animationTvSeriesResult',
//       },
//       {
//         method: this.service.fetchComedyTvSeries(),
//         key: 'comedyTvSeriesResult',
//       },
//       {
//         method: this.service.fetchDocumentaryTvSeries(),
//         key: 'documentaryTvSeriesResult',
//       },
//       {
//         method: this.service.fetchScienceFictionTvSeries(),
//         key: 'sciencefictionTvSeriesResult',
//       },
//       {
//         method: this.service.fetchThrillerTvSeries(),
//         key: 'thrillerTvSeriesResult',
//       },
//     ];

//     Promise.all(
//       dataFetchers.map((fetcher) =>
//         fetcher.method.toPromise().then((result: TvSeriesResults) => {
//           (this as any)[fetcher.key] = result.results;
//           this.checkTvSeriesStatuses((this as any)[fetcher.key]);
//         })
//       )
//     ).finally(() => (this.loading = false));
//   }

//   checkTvSeriesStatuses(tvSeries: any[]): void {
//     this.updateTvSeriesStatuses(tvSeries, this.watchlistStatus, false);
//     this.updateTvSeriesStatuses(tvSeries, this.likelistStatus, true);
//   }

//   updateTvSeriesStatuses(
//     tvSeries: any[],
//     status: { [key: number]: boolean },
//     isLikeList: boolean
//   ): void {
//     tvSeries.forEach((series) => {
//       const id = series.id;
//       if (isLikeList) {
//         status[id] = this.likeListService.isItemInLikeList(id);
//       } else {
//         status[id] = this.watchlistService.isTvSeriesInWatchlist(id);
//       }
//     });
//   }

//   toggleWatchlist(tvSeries: any): void {
//     const seriesId = tvSeries.id;

//     if (this.watchlistStatus[seriesId]) {
//       this.watchlistService.removeFromWatchlist(tvSeries);
//       this.watchlistStatus[seriesId] = false;
//       this.toaster.error(`${tvSeries.original_name} removed from watchlist.`);
//     } else {
//       this.watchlistService.addToSeriesWatchlist(tvSeries);
//       this.watchlistStatus[seriesId] = true;
//       this.toaster.success(
//         `${tvSeries.original_name} has been added to watchlist.`
//       );
//     }
//   }

//   toggleLikeList(tvSeries: any): void {
//     const seriesId = tvSeries.id;

//     if (this.likelistStatus[seriesId]) {
//       this.likeListService.removeFromLikeList(tvSeries);
//       this.likelistStatus[seriesId] = false;
//       this.toaster.error(`${tvSeries.original_name} removed from like list.`);
//     } else {
//       this.likeListService.addSeriesToLikeList(tvSeries);
//       this.likelistStatus[seriesId] = true;
//       this.toaster.success(
//         `${tvSeries.original_name} has been added to like list.`
//       );
//     }
//   }

//   navigateToDetails(tvSeries: any): void {
//     this.router.navigate([`/tv-series/${tvSeries.id}`], {
//       state: { rating: tvSeries.vote_average },
//     });
//   }

//   loadWatchlist(): void {
//     // Logic to fetch the watchlist from service or local storage
//   }

//   loadLikelist(): void {
//     // Logic to fetch the likelist from service or local storage
//   }

 

//   logOut(): void {
//     sessionStorage.removeItem('loggedInUser');
//     this.signOutService.signOut();
//   }
// }


import { Component, OnInit } from '@angular/core';
import { TvSeriesApiService } from 'src/app/service/tv-series-api.service';
import { Title, Meta } from '@angular/platform-browser';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { WatchlistService } from 'src/app/service/watchlist.service';
import { LikeListService } from 'src/app/service/like-list.service';
import { ToastrService } from 'ngx-toastr';

interface TvSeries {
  id: number;
  name?: string; // TV series might have a 'name' instead of 'title'
  original_name?: string; // Add this if TV series might have an original name
  poster_path: string;
  backdrop_path: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
}

type TvSeriesResults = {
  results: TvSeries[];
};

@Component({
  selector: 'app-tv-series',
  templateUrl: './tv-series.component.html',
  styleUrls: ['./tv-series.component.css'],
})
export class TvSeriesComponent implements OnInit {
  userData: any;
  loading: boolean = true;
  watchlistStatus: { [key: number]: boolean } = {};
  likelistStatus: { [key: number]: boolean } = {};

  // Define your categories with types
  categories: { name: string; data: keyof TvSeriesComponent }[] = [
    { name: 'Trending TV Series', data: 'trendingTvSeriesResult' },
    { name: 'Action TV Series', data: 'actionTvSeriesResult' },
    { name: 'Adventure TV Series', data: 'adventureTvSeriesResult' },
    { name: 'Animation TV Series', data: 'animationTvSeriesResult' },
    { name: 'Comedy TV Series', data: 'comedyTvSeriesResult' },
    { name: 'Documentary TV Series', data: 'documentaryTvSeriesResult' },
    { name: 'Science-Fiction TV Series', data: 'sciencefictionTvSeriesResult' },
    { name: 'Thriller TV Series', data: 'thrillerTvSeriesResult' },
  ];

  // TV series result arrays
  bannerResult: TvSeries[] = [];
  trendingTvSeriesResult: TvSeries[] = [];
  actionTvSeriesResult: TvSeries[] = [];
  adventureTvSeriesResult: TvSeries[] = [];
  animationTvSeriesResult: TvSeries[] = [];
  comedyTvSeriesResult: TvSeries[] = [];
  documentaryTvSeriesResult: TvSeries[] = [];
  sciencefictionTvSeriesResult: TvSeries[] = [];
  thrillerTvSeriesResult: TvSeries[] = [];

  constructor(
    private service: TvSeriesApiService,
    private title: Title,
    private meta: Meta,
    private signOutService: LoginService,
    private router: Router,
    private watchlistService: WatchlistService,
    private likeListService: LikeListService,
    private toastr: ToastrService
  ) {
    this.title.setTitle('TV Series - Showtime');
    this.meta.updateTag({
      name: 'description',
      content: 'Watch online TV series',
    });
  }

  ngOnInit(): void {
    this.fetchTvSeries();
  }

  // Fetch TV series for all categories
  fetchTvSeries() {
    this.service.bannerApiData().subscribe((data: TvSeriesResults) => {
      this.bannerResult = data.results;
      this.loading = false;
    });

    this.service.trendingTvSeriesApiData().subscribe((data: TvSeriesResults) => {
      this.trendingTvSeriesResult = data.results;
    });

    this.service.fetchActionTvSeries().subscribe((data: TvSeriesResults) => {
      this.actionTvSeriesResult = data.results;
    });

    this.service.fetchAdventureTvSeries().subscribe((data: TvSeriesResults) => {
      this.adventureTvSeriesResult = data.results;
    });

    this.service.fetchAnimationTvSeries().subscribe((data: TvSeriesResults) => {
      this.animationTvSeriesResult = data.results;
    });

    this.service.fetchComedyTvSeries().subscribe((data: TvSeriesResults) => {
      this.comedyTvSeriesResult = data.results;
    });

    this.service.fetchDocumentaryTvSeries().subscribe((data: TvSeriesResults) => {
      this.documentaryTvSeriesResult = data.results;
    });

    this.service.fetchScienceFictionTvSeries().subscribe((data: TvSeriesResults) => {
      this.sciencefictionTvSeriesResult = data.results;
    });

    this.service.fetchThrillerTvSeries().subscribe((data: TvSeriesResults) => {
      this.thrillerTvSeriesResult = data.results;
    });
  }

  // Navigate to TV series details page
  navigateToDetails(tvSeries: TvSeries) {
    this.router.navigate(['/tv-series', tvSeries.id]);
  }

  // Toggle watchlist status and provide feedback
  toggleWatchlist(tvSeries: TvSeries) {
    this.watchlistService.addToSeriesWatchlist(tvSeries);
    this.watchlistStatus[tvSeries.id] = !this.watchlistStatus[tvSeries.id];
    this.toastr.success(
      `${tvSeries.name} ${this.watchlistStatus[tvSeries.id] ? 'added to' : 'removed from'} Watchlist`
    );
  }

  // Toggle like list status and provide feedback
  toggleLikeList(tvSeries: TvSeries) {
    this.likeListService.addSeriesToLikeList(tvSeries);
    this.likelistStatus[tvSeries.id] = !this.likelistStatus[tvSeries.id];
    this.toastr.success(
      `${tvSeries.name} ${this.likelistStatus[tvSeries.id] ? 'liked' : 'disliked'}`
    );
  }
}
