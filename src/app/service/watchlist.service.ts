import { Injectable } from '@angular/core';
import { watchlistModel } from '../models/watchlistModel';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  private watchlist: watchlistModel[] = [];

  constructor() {
    // Load the watchlist from localStorage when the service is initialized
    const savedList = localStorage.getItem('watchlist');
    if (savedList) {
      this.watchlist = JSON.parse(savedList);
    }
  }

  addToMovieWatchlist(item: any) {
    if (!this.watchlist.some((i) => i.id === item.id)) {
      const watchlistItem: watchlistModel = {
        adult: item.adult || false,
        backdrop_path: item.backdrop_path || '',
        id: item.id,
        original_language: item.original_language || 'en',
        original_title: item.original_title || '',
        overview: item.overview || '',
        poster_path: item.poster_path || '',
        release_date: item.release_date || '',
        title: item.title || '',
        video: item.video || false,
        vote_average: item.vote_average || 0,
        vote_count: item.vote_count || 0,
      };
      this.watchlist.push(watchlistItem);
      localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
    }
  }


  addToSeriesWatchlist(item: any) {
    if (!this.watchlist.some((i) => i.id === item.id)) {
      const watchlistItem: watchlistModel = {
        adult: item.adult || false,
        backdrop_path: item.backdrop_path || '',
        id: item.id,
        original_language: item.original_language || 'en',
        original_title: item.original_name || '',
        overview: item.overview || '',
        poster_path: item.poster_path || '',
        release_date: item.first_air_date || '',
        title: item.name || '',
        video: item.video || false,
        vote_average: item.vote_average || 0,
        vote_count: item.vote_count || 0,
      };
      this.watchlist.push(watchlistItem);
      localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
    }
  }

  getWatchlist() {
    return this.watchlist;
  }

  removeFromWatchlist(item: any) {
    this.watchlist = this.watchlist.filter((i) => i.id !== item.id);
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }

  isMovieInWatchlist(id: number): boolean {
    return this.watchlist.some((i) => i.id === id);
  }

  isTvSeriesInWatchlist(id: number): boolean {
    return this.watchlist.some((i) => i.id === id);
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class WatchlistService {
//   private watchlist: any[] = [];
//   private baseurl = 'https://api.themoviedb.org/3';
//   private apikey = '5467ab7344dd06aecd59ee5f67f46eb6'; // Your API key
//   private accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDY3YWI3MzQ0ZGQwNmFlY2Q1OWVlNWY2N2Y0NmViNiIsIm5iZiI6MTcyNDMwNTMzNC42NzM5MjYsInN1YiI6IjY2YmM0OTI2ZmZjYWI4NTA3Y2QwNTM4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PYekriTt-o3FMnT3DKLA5EgkQyvim0E5g4R8ImvAJ9I'; // Provided access token

//   constructor(private http: HttpClient) {
//     // Load the watchlist from localStorage when the service is initialized
//     const savedList = localStorage.getItem('watchlist');
//     if (savedList) {
//       this.watchlist = JSON.parse(savedList);
//     }
//   }

//   addToWatchlist(sessionId: string, accountId: string, item: any): Observable<any> {
//     const url = `${this.baseurl}/account/${accountId}/watchlist?api_key=${this.apikey}&session_id=${sessionId}`;
//     const body = {
//       media_type: 'movie',
//       media_id: item.id,
//       watchlist: true
//     };

//     return this.http.post(url, body, {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NDY3YWI3MzQ0ZGQwNmFlY2Q1OWVlNWY2N2Y0NmViNiIsIm5iZiI6MTcyNDMwNTMzNC42NzM5MjYsInN1YiI6IjY2YmM0OTI2ZmZjYWI4NTA3Y2QwNTM4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PYekriTt-o3FMnT3DKLA5EgkQyvim0E5g4R8ImvAJ9I'
//       })
//     }).pipe(
//       tap((response: any) => {
//         if (!this.watchlist.some(i => i.id === item.id)) {
//           this.watchlist.push(item);
//           localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
//         }
//       }),
//       catchError(this.handleError('addToWatchlist'))
//     );
//   }

//   removeFromWatchlist(sessionId: string, accountId: string, item: any): Observable<any> {
//     const url = `${this.baseurl}/account/${accountId}/watchlist?api_key=${this.apikey}&session_id=${sessionId}`;
//     const body = {
//       media_type: 'movie',
//       media_id: item.id,
//       watchlist: false
//     };

//     return this.http.post(url, body, {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${this.accessToken}`
//       })
//     }).pipe(
//       tap((response: any) => {
//         this.watchlist = this.watchlist.filter(i => i.id !== item.id);
//         localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
//       }),
//       catchError(this.handleError('removeFromWatchlist'))
//     );
//   }

//   getWatchlist() {
//     return this.watchlist;
//   }

//   isMovieInWatchlist(id: number): boolean {
//     return this.watchlist.some(i => i.id === id);
//   }

//   private handleError(operation = 'operation') {
//     return (error: any): Observable<never> => {
//       console.error(`${operation} failed: ${error.message}`);
//       return of();
//     };
//   }
// }
