import { Component, OnInit } from '@angular/core';
import { LikeListService } from 'src/app/service/like-list.service';

@Component({
  selector: 'app-like-list',
  templateUrl: './like-list.component.html',
  styleUrls: ['./like-list.component.css']
})
export class LikeListComponent implements OnInit {
  likelist: any[] = [];

  constructor(private likeListService: LikeListService) {}

  ngOnInit() {
    this.likelist = this.likeListService.getLikeList();
    console.log(this.likelist);
    
  }

  removeItem(item: any) {
    this.likeListService.removeFromLikeList(item);
    this.likelist = this.likeListService.getLikeList();
  }
}
