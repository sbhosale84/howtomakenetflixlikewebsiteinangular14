import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { TvSeriesApiService } from 'src/app/service/tv-series-api.service';
import { Title, Meta } from '@angular/platform-browser';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Movie, TvSeries } from 'src/app/models/searchModel';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchResult: (Movie | TvSeries)[] = []; // Use the defined interfaces
  searchForm = new FormGroup({
    searchTerm: new FormControl(''),
  });

  constructor(
    private movieService: MovieApiServiceService,
    private tvService: TvSeriesApiService,
    private title: Title,
    private meta: Meta
  ) {
    this.title.setTitle('Search - Showtimes');
    this.meta.updateTag({
      name: 'description',
      content: 'Search for movies and TV series here',
    });
  }

  ngOnInit(): void {
    this.searchForm.get('searchTerm')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) {
          this.searchMoviesAndSeries(value);
        } else {
          this.searchResult = [];
        }
      });
  }

  submitForm() {
    const value = this.searchForm.get('searchTerm')?.value;
    if (value) {
      this.searchMoviesAndSeries(value);
    }
  }

  private searchMoviesAndSeries(query: string) {
    this.movieService.getSearchMovie({ movieName: query }).subscribe(movieResult => {
      this.tvService.getSearchTvSeries({ seriesName: query }).subscribe(tvResult => {
        this.searchResult = [
          ...movieResult.results.map((movie: Movie) => ({ ...movie, type: 'movie' })),
          ...tvResult.results.map((series: TvSeries) => ({ ...series, type: 'tvSeries' })),
        ];
      });
    });
  }

  isMovie(item: Movie | TvSeries): item is Movie {
    return (item as Movie).title !== undefined;
  }

  isTvSeries(item: Movie | TvSeries): item is TvSeries {
    return (item as TvSeries).name !== undefined;
  }
}
