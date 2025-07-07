import { Analysis, PromptType } from '../../services/analysis';
import { StepType, Stepper } from '../../stepper/stepper';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DailyFour } from '../../services/daily-four';
import { Loading } from '../../loading/loading';
import { MessageService } from '../../services/message';
import { Router } from '@angular/router';
import { signal } from '@angular/core';

@Component({
  selector: 'app-d4',
  imports: [CommonModule, Stepper, Loading],
  providers: [DailyFour, Analysis],
  templateUrl: './d4.html',
  styleUrl: './d4.scss'
})
export class D4 {
  constructor(
    private readonly dailyFour: DailyFour, 
    private readonly router: Router,
    private readonly analysis: Analysis,
    private readonly messageService: MessageService
  ) {}
  loading = signal<boolean>(false);
  answers: string[] = [];
  publicPost = false;
  showCompletionModal = false;

  steps = signal<StepType[]>([
    {
      name: 'affirmation',
      label: 'Affirmation',
      question: 'Provide a small affirmation for yourself.',
      description: 'This can be anything positive about yourself, or something you find inspirational.',
      canContinue: false,
    },
    {
      name: 'plannedPleasurable',
      label: 'Planned Pleasurable',
      question: 'What is something pleasurable you plan to do today?',
      description: 'this can be a small activity that brings you joy, like reading a book or going for a walk.',
      canContinue: false,
    },
    {
      name: 'mindfulActivity',
      label: 'Mindful Activity',
      question: 'What is something you plan to do today that is mindful?',
      description: 'This can be anything that helps you stay present and engaged, like meditation or deep breathing. It can be a mundane task or chore that you plan to do with all your presence.',
      canContinue: false,
    },
    {
      name: 'gratitude',
      label: 'Gratitude',
      question: 'What is something you are grateful for today?',
      description: 'This can be anything that brings you joy or happiness, like a friend, family member, or pet.',
      canContinue: false
    }
  ]);

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
        this.messageService.addMessage({
          type: 'error',
          content: 'Failed to create Daily Four. Please try again later. Error: ' + error.message,
        });
      }
    });
  }

  updateStep(step: StepType) {
    this.loading.set(true);
    console.log('Updating step:', step);
    const currentStep = this.steps().findIndex(s => s.question === step.question);
    console.log('Current step index:', currentStep);
    if (currentStep !== -1) {
      const allSteps = [...this.steps()];
      this.analysis.analyzeResponse(step.question, step.name as PromptType).subscribe({
        next: (response) => {
          console.log('Response from analysis:', response);
          step.response = response.response;
          step.canContinue = response.isGoodResponse;
          console.log('Step after analysis:', step);
          allSteps[currentStep] = step;
          this.steps.set(allSteps);
          console.log('Updated steps:', this.steps());
          this.loading.set(false);
        },
        error: (error) => {
          console.error('Error analyzing response:', error);
          step.response = 'There appears to be something wrong with your response.';
          step.canContinue = false;
          allSteps[currentStep] = step;
          this.steps.set(allSteps);
          this.loading.set(false);
          this.messageService.addMessage({
            type: 'error',
            content: 'Failed to analyze response. Please try again later. Error: ' + error.message,
          });
        }
      });
    }
  }

  onStepperComplete(answers: string[]) {
    this.answers = answers;
    this.showCompletionModal = true;
  }

}
