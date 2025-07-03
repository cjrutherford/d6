import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface DailyFourDto {
    id: string;
    createdAt: Date;
    userId: string;
    affirmation: string;
    plannedPleasurable: string;
    mindfulActivity: string;
    gratitude: string;
    public: boolean;
}

export interface CreateDailyFourDto {
    affirmation: string;
    plannedPleasurable: string;
    mindfulActivity: string;
    gratitude: string;
    public?: boolean;
}

export interface UpdateDailyFourDto {
    affirmation?: string;
    plannedPleasurable?: string;
    mindfulActivity?: string;
    gratitude?: string;
    public?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class DailyFour {

  constructor(private readonly http: HttpClient) { }

  createDailyFour(dailyFour: CreateDailyFourDto) {
    return this.http.post<DailyFourDto>('/api/daily-four', dailyFour);
  }
  updateDailyFour(id: string, dailyFour: UpdateDailyFourDto) {
    return this.http.put<DailyFourDto>(`/api/daily-four/${id}`, dailyFour);
  }
  getDailyFour(id: string) {
    return this.http.get<DailyFourDto>(`/api/daily-four/${id}`);
  }
}
