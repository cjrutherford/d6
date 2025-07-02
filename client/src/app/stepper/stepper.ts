import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export class StepType {
  label?: string;
  question: string = '';
  description: string = '';
  response?: string;
  action?: (answer: string, question: StepType) => void;
  canContinue: boolean = false;
}

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stepper.html',
  styleUrl: './stepper.scss',
})
export class Stepper {
  @Input() questions: StepType[] = [];
  @Output() stepChange = new EventEmitter<number>();
  @Output() completed = new EventEmitter<any>();

  currentStep = 0;
  answers: string[] = [];

  nextStep() {
    if(!this.questions[this.currentStep].canContinue){
      this.questions[this.currentStep].response = 'There appears to be something wrong with your response.'
      return;
    }
    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
      this.stepChange.emit(this.currentStep);
    } else {
      this.completed.emit(this.answers);
    }
  }

  indexHasResponse() {
    return this.questions[this.currentStep]?.response !== undefined;
  }

  processStepAction(){
    const currentStep = this.questions[this.currentStep]
    const action = currentStep.action;
    if(!action) {
      throw new Error('Action is not valid: ' + action)
    }
    const answer = this.answers[this.currentStep];
    if(!answer) {
      throw new Error('Answer is not valid: '+ answer)
    }
   
    action(answer, currentStep)
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.stepChange.emit(this.currentStep);
    }
  }
}
