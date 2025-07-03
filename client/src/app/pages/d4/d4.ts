import { StepType, Stepper } from '../../stepper/stepper';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DailyFour } from '../../services/daily-four';
import { Router } from '@angular/router';

@Component({
  selector: 'app-d4',
  imports: [CommonModule, Stepper],
  providers: [DailyFour],
  templateUrl: './d4.html',
  styleUrl: './d4.scss'
})
export class D4 {
  constructor(private readonly dailyFour: DailyFour, private readonly router: Router) {}

  answers: string[] = [];
  publicPost = false;
  showCompletionModal = false;

  steps: StepType[] = [
    {
      label: 'Affirmation',
      question: 'Provide a small affirmation for yourself.',
      description: 'This can be anything positive about yourself, or something you find inspirational.',
      action: (answer: string, question: StepType) => {
        console.log('Affirmation:', answer);
        question.canContinue = true;
      },
      canContinue: false,
    },
    {
      label: 'Planned Pleasurable',
      question: 'What is something pleasurable you plan to do today?',
      description: 'this can be a small activity that brings you joy, like reading a book or going for a walk.',
      action: (answer: string, question: StepType) => {
        console.log('Planned Pleasurable:', answer);
        question.canContinue = true;
      },
      canContinue: false,
    },
    {
      label: 'Mindful Activity',
      question: 'What is something you plan to do today that is mindful?',
      description: 'This can be anything that helps you stay present and engaged, like meditation or deep breathing. It can be a mundane task or chore that you plan to do with all your presence.',
      action: (answer: string, question: StepType) => {
        console.log('Mindful Activity selected:', answer);
        question.canContinue = true;
      },
      canContinue: false,
    },
    {
      label: 'Gratitude',
      question: 'What is something you are grateful for today?',
      description: 'This can be anything that brings you joy or happiness, like a friend, family member, or pet.',
      action: (answer: string, question: StepType) => {
        console.log('Gratitude:', answer);
        question.canContinue = true;
      },
      canContinue: false
    }
  ];

  setPostComplete(isPublic: boolean) {
    this.publicPost = isPublic;
    const [affirmation, plannedPleasurable, mindfulActivity, gratitude] = this.answers;
    this.dailyFour.createDailyFour({
      affirmation,
      plannedPleasurable,
      mindfulActivity,
      gratitude,
      public: this.publicPost
    }).subscribe({
      next: (response) => {
        console.log('Daily Four created successfully:', response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error creating Daily Four:', error);
        this.showCompletionModal = false;
      }
    });
  }

  onStepperComplete(answers: string[]) {
    this.answers = answers;
    this.showCompletionModal = true;
  }

}
