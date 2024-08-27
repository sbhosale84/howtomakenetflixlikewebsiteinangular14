import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TvSeriesApiService } from 'src/app/service/tv-series-api.service'; // Replace with your TV series service
import { Title, Meta } from '@angular/platform-browser';
import { WatchlistService } from 'src/app/service/watchlist.service';
import { LikeListService } from 'src/app/service/like-list.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tv-series-details',
  templateUrl: './tv-series-details.component.html',
  styleUrls: ['./tv-series-details.component.css'],
})
export class TvSeriesDetailsComponent implements OnInit {
  getTvSeriesDetailResult: any;
  getTvSeriesVideoResult: any;
  getTvSeriesCastResult: any;
  watchlist: any[] = [];
  watchlistStatus: { [key: number]: boolean } = {};
  likelistStatus: { [key: number]: boolean } = {}; // LikeList status

  constructor(
    private service: TvSeriesApiService, // Replace with your TV series service
    private router: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    private watchlistService: WatchlistService,
    private likeListService: LikeListService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    console.log(getParamId, 'getparamid#');

    this.getTvSeries(getParamId);
    this.getVideo(getParamId);
    this.getTvSeriesCast(getParamId);
  }

  checkWatchlistStatus(tvSeriesId: number): void {
    this.watchlistStatus[tvSeriesId] =
      this.watchlistService.isTvSeriesInWatchlist(tvSeriesId); // Adjust method name if needed
  }

  toggleWatchlist(tvSeries: any): void {
    const tvSeriesId = tvSeries.id;

    if (this.watchlistStatus[tvSeriesId]) {
      this.watchlistService.removeFromWatchlist(tvSeries); // Adjust method name if needed
      this.watchlistStatus[tvSeriesId] = false;
      this.toaster.error(`${tvSeries.original_name} removed from watchlist.`);
    } else {
      this.watchlistService.addToSeriesWatchlist(tvSeries); // Adjust method name if needed
      this.watchlistStatus[tvSeriesId] = true;
      this.toaster.success(`${tvSeries.original_name} has been added to watchlist.`);
    }
  }

  checkLikeListStatus(tvSeriesId: number): void {
    this.likelistStatus[tvSeriesId] =
      this.likeListService.isItemInLikeList(tvSeriesId); // Adjust method name if needed
  }

  toggleLikeList(tvSeries: any): void {
    const tvSeriesId = tvSeries.id;

    if (this.likelistStatus[tvSeriesId]) {
      this.likeListService.removeFromLikeList(tvSeries); // Adjust method name if needed
      this.likelistStatus[tvSeriesId] = false;
      this.toaster.error(`${tvSeries.original_name} removed from likelist.`);
    } else {
      this.likeListService.addSeriesToLikeList(tvSeries); // Adjust method name if needed
      this.likelistStatus[tvSeriesId] = true;
      this.toaster.success(`${tvSeries.original_name} has been added to likelist.`);
    }
  }

  checkWatchlistStatusForTvSeries(tvSeries: any[]): void {
    tvSeries.forEach((series) => this.checkWatchlistStatus(series.id));
  }

  checkLikeListStatusForTvSeries(tvSeries: any[]): void {
    tvSeries.forEach((series) => this.checkLikeListStatus(series.id));
  }

  getTvSeries(id: any) {
    this.service.getTvSeriesDetails(id).subscribe(async (result) => {
      console.log(result, 'getTvSeriesDetails#');
      this.getTvSeriesDetailResult = await result;
      console.log('TV Series Name:', this.getTvSeriesDetailResult.original_name); // Add this line for debugging
  
      this.checkWatchlistStatusForTvSeries([this.getTvSeriesDetailResult]);
      this.checkLikeListStatusForTvSeries([this.getTvSeriesDetailResult]);
  
      // update tags
      this.title.setTitle(
        `${this.getTvSeriesDetailResult.original_name} | ${this.getTvSeriesDetailResult.tagline}`
      );
      this.meta.updateTag({
        name: 'title',
        content: this.getTvSeriesDetailResult.original_name,
      });
      this.meta.updateTag({
        name: 'description',
        content: this.getTvSeriesDetailResult.overview,
      });
  
      // facebook
      this.meta.updateTag({ property: 'og:type', content: 'website' });
      this.meta.updateTag({ property: 'og:url', content: `` });
      this.meta.updateTag({
        property: 'og:title',
        content: this.getTvSeriesDetailResult.original_name,
      });
      this.meta.updateTag({
        property: 'og:description',
        content: this.getTvSeriesDetailResult.overview,
      });
      this.meta.updateTag({
        property: 'og:image',
        content: `https://image.tmdb.org/t/p/original/${this.getTvSeriesDetailResult.backdrop_path}`,
      });
    });
  }
  

  getVideo(id: any) {
    this.service.getTvSeriesVideo(id).subscribe((result) => {
      console.log(result, 'getTvSeriesVideo#');
      result.results.forEach((element: any) => {
        if (element.type == 'Trailer') {
          this.getTvSeriesVideoResult = element.key;
        }
      });
    });
  }

  getTvSeriesCast(id: any) {
    this.service.getTvSeriesCast(id).subscribe((result) => {
      console.log(result, 'tvSeriesCast#');
      this.getTvSeriesCastResult = result.cast;
    });
  }
}
