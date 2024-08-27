import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TvSeriesApiService {
  constructor(private http: HttpClient) {}

  baseurl = 'https://api.themoviedb.org/3';
  apikey = '5467ab7344dd06aecd59ee5f67f46eb6';

  // Banner API data for TV series
  bannerApiData(): Observable<any> {
    return this.http.get(
      `${this.baseurl}/trending/tv/week?api_key=${this.apikey}`
    );
  }

  // Trending TV series data
  trendingTvSeriesApiData(): Observable<any> {
    return this.http.get(
      `${this.baseurl}/trending/tv/day?api_key=${this.apikey}`
    );
  }

  // Search TV series by name
  getSearchTvSeries(data: any): Observable<any> {
    console.log(data, 'tvSeries#');
    return this.http.get(
      `${this.baseurl}/search/tv?api_key=${this.apikey}&query=${data.seriesName}`
    );
  }

  // Get TV series details by ID
  getTvSeriesDetails(seriesId: string): Observable<any> {
    return this.http.get(
      `${this.baseurl}/tv/${seriesId}?api_key=${this.apikey}`
    );
  }

  // Get TV series videos (trailers, clips, etc.)
  getTvSeriesVideo(seriesId: string): Observable<any> {
    return this.http.get(
      `${this.baseurl}/tv/${seriesId}/videos?api_key=${this.apikey}`
    );
  }

  // Get TV series cast and crew
  getTvSeriesCast(seriesId: string): Observable<any> {
    return this.http.get(
      `${this.baseurl}/tv/${seriesId}/credits?api_key=${this.apikey}`
    );
  }

  // Fetch Action TV series
  fetchActionTvSeries(): Observable<any> {
    return this.http.get(
      `${this.baseurl}/discover/tv?api_key=${this.apikey}&with_genres=10759`
    );
  }

  // Fetch Adventure TV series
  fetchAdventureTvSeries(): Observable<any> {
    return this.http.get(
      `${this.baseurl}/discover/tv?api_key=${this.apikey}&with_genres=10765`
    );
  }

  // Fetch Animation TV series
  fetchAnimationTvSeries(): Observable<any> {
    return this.http.get(
      `${this.baseurl}/discover/tv?api_key=${this.apikey}&with_genres=16`
    );
  }

  // Fetch Comedy TV series
  fetchComedyTvSeries(): Observable<any> {
    return this.http.get(
      `${this.baseurl}/discover/tv?api_key=${this.apikey}&with_genres=35`
    );
  }

  // Fetch Documentary TV series
  fetchDocumentaryTvSeries(): Observable<any> {
    return this.http.get(
      `${this.baseurl}/discover/tv?api_key=${this.apikey}&with_genres=99`
    );
  }

  // Fetch Science Fiction TV series
  fetchScienceFictionTvSeries(): Observable<any> {
    return this.http.get(
      `${this.baseurl}/discover/tv?api_key=${this.apikey}&with_genres=10765`
    );
  }

  // Fetch Thriller TV series
  fetchThrillerTvSeries(): Observable<any> {
    return this.http.get(
      `${this.baseurl}/discover/tv?api_key=${this.apikey}&with_genres=9648`
    );
  }

  // Fetch TV series reviews
  getTvSeriesReviews(seriesId: string): Observable<any> {
    const url = `${this.baseurl}/tv/${seriesId}/reviews?api_key=${this.apikey}&language=en-US&page=1`;
    return this.http.get(url);
  }

  // Add or remove a TV series from the user's watchlist
  addToWatchlist(sessionId: string, accountId: string, seriesId: number, watchlist: boolean): Observable<any> {
    const url = `${this.baseurl}/account/${accountId}/watchlist?api_key=${this.apikey}&session_id=${sessionId}`;
    const body = {
      media_type: 'tv',
      media_id: seriesId,
      watchlist: watchlist
    };
    return this.http.post(url, body);
  }
}
