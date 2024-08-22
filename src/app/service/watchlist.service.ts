import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private watchlist: any[] = [];

  constructor() {
    // Load the watchlist from localStorage when the service is initialized
    const savedList = localStorage.getItem('watchlist');
    if (savedList) {
      this.watchlist = JSON.parse(savedList);
    }
  }

  addToWatchlist(item: any) {
    if (!this.watchlist.some(i => i.id === item.id)) {
      this.watchlist.push(item);
      localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
    }
  }

  getWatchlist() {
    return this.watchlist;
  }

  removeFromWatchlist(item: any) {
    this.watchlist = this.watchlist.filter(i => i.id !== item.id);
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }

  isMovieInWatchlist(id: number): boolean {
    return this.watchlist.some(i => i.id === id);
  }
}
