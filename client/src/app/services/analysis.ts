import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export declare type PromptType = 'affirmation' | 'judgement' | 'nonJudgement' | 'mindfulActivity' | 'gratitude' | 'plannedPleasurable';

@Injectable({
  providedIn: 'root'
})
export class Analysis {

  constructor(private readonly http: HttpClient) { }

  analyzeResponse(response: string, prompt: PromptType){
    return this.http.post<{ response: string, isGoodResponse: boolean }>(
      'api/ai-assistance/analyze',
      {
        input: response,
        context: prompt
      }
    );
  }
}
