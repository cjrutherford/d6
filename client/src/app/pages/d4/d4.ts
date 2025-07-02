import { StepType, Stepper } from '../../stepper/stepper';

import { Component } from '@angular/core';

@Component({
  selector: 'app-d4',
  imports: [Stepper],
  templateUrl: './d4.html',
  styleUrl: './d4.scss'
})
export class D4 {
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

  onStepperComplete(answers: string[]) {
    console.log(answers.join('\n'));
  }

}
