import { Component, OnInit } from '@angular/core';
import { WatchlistService } from 'src/app/service/watchlist.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css'],
})
export class WatchlistComponent implements OnInit {
  watchlist: any[] = [];

  constructor(private watchlistService: WatchlistService) {}

  ngOnInit() {
    this.watchlist = this.watchlistService.getWatchlist();
  }

  removeFromWatchlist(item: any) {
    this.watchlistService.removeFromWatchlist(item);
    this.watchlist = this.watchlistService.getWatchlist(); // Update the list after removal
  }
}
