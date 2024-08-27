import { Injectable } from '@angular/core';
import { watchlistModel } from '../models/watchlistModel';

@Injectable({
  providedIn: 'root',
})
export class LikeListService {
  private likeList: watchlistModel[] = [];

  constructor() {
    // Load the like list from localStorage when the service is initialized
    const savedList = localStorage.getItem('likeList');
    if (savedList) {
      this.likeList = JSON.parse(savedList);
    }
  }

  addMovieToLikeList(item: any) {
    if (!this.likeList.some((i) => i.id === item.id)) {
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

      this.likeList.push(watchlistItem);
      localStorage.setItem('likeList', JSON.stringify(this.likeList));
    }
  }
  addSeriesToLikeList(item: any) {
    if (!this.likeList.some((i) => i.id === item.id)) {
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
      this.likeList.push(watchlistItem);
      localStorage.setItem('likeList', JSON.stringify(this.likeList));
    }
  }

  getLikeList() {
    return this.likeList;
  }

  removeFromLikeList(item: any) {
    this.likeList = this.likeList.filter((i) => i.id !== item.id);
    localStorage.setItem('likeList', JSON.stringify(this.likeList));
  }

  isItemInLikeList(id: number): boolean {
    return this.likeList.some((i) => i.id === id);
  }
}
