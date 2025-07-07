import { CommonModule, DatePipe } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';

import { DailyFourDto } from '../../services/daily-four';
import { DailySixDto } from '../../services/daily-six';
import { FeedService } from '../../services/feed';
import { TitlePipe } from '../../title-pipe';
import { UserProfile } from '../../services/user-profile';

export type DailyPostDto = {
  id: string;
  createdAt: Date;
  userId: string;
  public: boolean;
  prompts: { [key: string]: string };
  userAvatar?: string;
  userName?: string;
};

@Component({
  selector: 'app-feed',
  imports: [CommonModule, DatePipe, TitlePipe],
  providers: [FeedService],
  templateUrl: './feed.html',
  styleUrl: './feed.scss',
})
export class Feed {
  posts = signal<DailyPostDto[]>([]);
  constructor(private readonly feedService: FeedService, private readonly users: UserProfile) {
  }
  
  ngOnInit() {
    this.initializeFeed();
  }
  
  private initializeFeed() {
    this.feedService.loadPosts().subscribe({
      next: (posts) => {
        this.loadPostsNext(posts);
      },
      error: (error) => {
        console.error('Error loading posts:', error);
      },
    });
  }


  getPrompts(post: DailyPostDto): string[][] {
    return Object.entries(post.prompts)
  }

  private async loadPostsNext(posts: (DailySixDto | DailyFourDto)[]) {
    const newPosts = posts.map((post) => this.newPostMapper(post));
    const userIds = newPosts.map((post) => post.userId);
    const userData = await Promise.all(
      [...userIds].map(id => firstValueFrom(
        this.users.getUserProfileById(id)
        .pipe(map((profile) => ({...profile, userId: id})))
      ))
    );
    const finalPosts = newPosts.map((post) => {
      const user = userData.find(user => user.userId === post.userId);
      if (user) {
        post.userAvatar = user.profilePictureUrl || 'https://placehold.co/120x120';
        post.userName = user.name || 'Unknown User';
      } else {
        post.userAvatar = 'https://placehold.co/120x120';
        post.userName = 'Unknown User';
      }
      return post;
    });
    this.posts.set(finalPosts);
  }

  private newPostMapper(post: DailySixDto | DailyFourDto): DailyPostDto {
    const prompts: { [key: string]: string } = {};
    for (const [key, value] of Object.entries(post)) {
      if (
        key !== 'id' &&
        key !== 'createdAt' &&
        key !== 'userId' &&
        key !== 'public'
      ) {
        prompts[key] = (value as string);
      }
    }
    return {
      id: post.id,
      createdAt: post.createdAt,
      userId: post.userId,
      public: post.public,
      prompts: { ...prompts },
    };
  }
}
