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






// import { Component, OnInit } from '@angular/core';
// import { WatchlistService } from 'src/app/service/watchlist.service';

// @Component({
//   selector: 'app-watchlist',
//   templateUrl: './watchlist.component.html',
//   styleUrls: ['./watchlist.component.css'],
// })
// export class WatchlistComponent implements OnInit {
//   watchlist: any[] = [];
//   sessionId: string = 'your-session-id';  // Replace with actual sessionId
//   accountId: string = 'your-account-id';  // Replace with actual accountId

//   constructor(private watchlistService: WatchlistService) {}

//   ngOnInit() {
//     this.watchlist = this.watchlistService.getWatchlist();
//   }

//   removeFromWatchlist(item: any) {
//     this.watchlistService.removeFromWatchlist(this.sessionId, this.accountId, item).subscribe({
//       next: () => {
//         this.watchlist = this.watchlistService.getWatchlist(); // Update the list after removal
//       },
//       error: (err) => {
//         console.error('Failed to remove item from watchlist:', err);
//         // Handle error (e.g., show an error message)
//       }
//     });
//   }
// }