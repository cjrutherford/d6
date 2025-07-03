import { Component, signal } from '@angular/core';
import { StepType, Stepper } from '../../stepper/stepper';

import { CommonModule } from '@angular/common';
import { DailySix } from '../../services/daily-six';
import { Router } from '@angular/router';

@Component({
  selector: 'app-d6',
imports: [CommonModule, Stepper],
  providers: [DailySix],
  templateUrl: './d6.html',
  styleUrl: './d6.scss'
})
export class D6 {

  constructor(private readonly dailySix: DailySix, private readonly router: Router) {}
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
    label: "Judgement",
    question: 'What is something you are judging yourself for today?',
    description: 'This can be anything that you feel is holding you back or causing you stress. It can be a small or large judgement, but it should be something that you are aware of.',
    action: (answer: string, question: StepType) => {
      console.log('Judgement:', answer);
      question.canContinue = true;
    },
    canContinue: false,
  },
  {
    label: 'Non Judgement',
    question: 'What is something you can let go of today? Can you turn the judgement off?',
    description: 'This can be anything that you feel is holding you back, but it is important to practice framing it in a non-judgemental way. Instead of assigning postitive or negative value, try to see things for what they are.',
    action: (answer: string, question: StepType) => {
      console.log('Non Judgement:', answer);
      question.canContinue = true;
    },
    canContinue: false,
  },
  {
    label: 'Planned Pleasurable',
    question: 'What is something pleasurable you plan to do today?',
    description: 'This can be a small activity that brings you joy, like reading a book or going for a walk.',
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

  setPostComplete(value: boolean) {
    this.publicPost = value;
    const [affirmation, judgement, nonJudgement, plannedPleasurable, mindfulActivity, gratitude] = this.answers;
    this.dailySix.createDailySix({
      affirmation,
      judgement,
      nonJudgement,
      plannedPleasurable,
      mindfulActivity,
      gratitude,
      public: this.publicPost
    }).subscribe({
      next: (response) => {
        console.log('Daily Six created successfully:', response);
        this.router.navigate(['/']);
        this.showCompletionModal = false;
      },
      error: (error) => {
        console.error('Error creating Daily Six:', error);
        this.showCompletionModal = false;
      }
    });
  }

  onStepperComplete(answers: string[]) {
    this.answers = answers;
    this.showCompletionModal = true;
  }
}
