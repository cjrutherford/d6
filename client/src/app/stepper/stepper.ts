import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export class StepType {
  name: string = '';
  label?: string;
  question: string = '';
  description: string = '';
  response?: string;
  canContinue: boolean = false;
  answer?: string;
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
  @Output() stepUpdate = new EventEmitter<StepType>();
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
    currentStep.answer = this.answers[this.currentStep];
    this.stepUpdate.emit(currentStep);
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.stepChange.emit(this.currentStep);
    }
  }
}
