import { DailyFour, DailyFourDto } from './daily-four';
import { DailySix, DailySixDto } from './daily-six';
import { Observable, combineLatest, map } from 'rxjs';

import { Injectable } from '@angular/core';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(
    private readonly dailySix: DailySix, 
    private readonly dailyFour: DailyFour,
    private readonly usersService: UsersService
  ) { }

  loadPosts(): Observable<(DailySixDto|DailyFourDto)[]> {
    return combineLatest([
      this.dailySix.getPublicDailySixes(),
      this.dailyFour.getPublicDailyFours(),
    ]).pipe(map(([dailySixes, dailyFours]) => {
      return [...dailySixes, ...dailyFours].sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    }));
  }

}
