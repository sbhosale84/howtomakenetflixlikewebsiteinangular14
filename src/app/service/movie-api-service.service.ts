import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MovieApiServiceService {
  constructor(private http: HttpClient) {}

  baseurl = 'https://api.themoviedb.org/3';
  apikey = '5467ab7344dd06aecd59ee5f67f46eb6';

  //bannerapidata

  bannerApiData(): Observable<any> {
    return this.http.get(
      `${this.baseurl}/trending/all/week?api_key=${this.apikey}`
    );
  }

  // trendingmovieapidata
  trendingMovieApiData(): Observable<any> {
    return this.http.get(
      `${this.baseurl}/trending/movie/day?api_key=${this.apikey}`
    );
  }

  // searchmovive
  getSearchMovie(data: any): Observable<any> {
    console.log(data, 'movie#');

    return this.http.get(
      `${this.baseurl}/search/movie?api_key=${this.apikey}&query=${data.movieName}`
    );
  }

  // getmoviedatails
  getMovieDetails(data: any): Observable<any> {
    return this.http.get(
      `${this.baseurl}/movie/${data}?api_key=${this.apikey}`
    );
  }

  // getMovieVideo
  getMovieVideo(data: any): Observable<any> {
    return this.http.get(
      `${this.baseurl}/movie/${data}/videos?api_key=${this.apikey}`
    );
  }

  // getMovieCast
  getMovieCast(data: any): Observable<any> {
    return this.http.get(
      `${this.baseurl}/movie/${data}/credits?api_key=${this.apikey}`
    );
  }
  // action
  fetchActionMovies(): Observable<any> {
    return this.http.get(
      `${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=28`
    );
  }

  // adventure
  fetchAdventureMovies(): Observable<any> {
    return this.http.get(
      `${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=12`
    );
  }

  // animation
  fetchAnimationMovies(): Observable<any> {
    return this.http.get(
      `${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=16`
    );
  }

  // comedy
  fetchComedyMovies(): Observable<any> {
    return this.http.get(
      `${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=35`
    );
  }

  // documentary
  fetchDocumentaryMovies(): Observable<any> {
    return this.http.get(
      `${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=99`
    );
  }

  // science-fiction:878

  fetchScienceFictionMovies(): Observable<any> {
    return this.http.get(
      `${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=878`
    );
  }

  // thriller:53
  fetchThrillerMovies(): Observable<any> {
    return this.http.get(
      `${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=53`
    );
  }
  // Fetch movie reviews
  getMovieReviews(movieId: string): Observable<any> {
    const url = `${this.baseurl}/movie/${movieId}/reviews?api_key=${this.apikey}&language=en-US&page=1`;
    return this.http.get(url);
  }

  addToWatchlist(sessionId: string, accountId: string, movieId: number, watchlist: boolean): Observable<any> {
    const url = `${this.baseurl}/account/${accountId}/watchlist?api_key=${this.apikey}&session_id=${sessionId}`;
    const body = {
      media_type: 'movie',
      media_id: movieId,
      watchlist: watchlist
    };
    return this.http.post(url, body);
  }
}
