import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface DailySixDto {
    id: string;
    createdAt: Date;
    userId: number;
    affirmation: string;
    plannedPleasurable: string;
    judgement: string;
    nonJudgement: string;
    mindfulActivity: string;
    gratitude: string;
    public: boolean;
}

export interface CreateDailySixDto {
    affirmation: string;
    plannedPleasurable: string;
    judgement: string;
    nonJudgement: string;
    mindfulActivity: string;
    gratitude: string;
    public?: boolean;
}
export interface UpdateDailySixDto {
    affirmation?: string;
    plannedPleasurable?: string;
    judgement?: string;
    nonJudgement?: string;
    mindfulActivity?: string;
    gratitude?: string;
    public?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DailySix {

  constructor(private readonly http: HttpClient) { }

  createDailySix(dailySix: CreateDailySixDto) {
    return this.http.post<DailySixDto>('/api/daily-six', dailySix);
  }

  updateDailySix(id: string, dailySix: UpdateDailySixDto) {
    return this.http.put<DailySixDto>(`/api/daily-six/${id}`, dailySix);
  }

  getDailySix(id: string) {
    return this.http.get<DailySixDto>(`/api/daily-six/${id}`);
  }
}
