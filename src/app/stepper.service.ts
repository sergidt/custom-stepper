import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepperService {
  private totalSteps: number = 0;
  
  // Tracks the index of the last step that has been CREATED (rendered).
   createdSteps = signal(1);

  // Tracks the index of the currently ACTIVE step for navigation.
  activeStep = signal(1);

  constructor() { }

  setTotalSteps(count: number): void {
    this.totalSteps = count;
  }

  nextStep(): void {
    const currentCreated = this.createdSteps();
    const currentActive = this.activeStep();

    if (currentCreated < this.totalSteps) {
      // RULE: Creates the next step and makes it active
      this.createdSteps.set(currentCreated + 1);
      this.activeStep.set(currentCreated + 1);
    } else if (currentActive < this.totalSteps) {
      // RULE: All created, just moves the active pointer
      this.activeStep.set(currentActive + 1);
    }
  }

  prevStep(): void {
    const currentActive = this.activeStep();
    if (currentActive > 1) {
      this.activeStep.set(currentActive - 1);
    }
  }

  goToStep(stepIndex: number): void {
    const currentCreated = this.createdSteps();
    // Only allow navigating to steps that have already been created/rendered
    if (stepIndex >= 1 && stepIndex <= currentCreated) {
      this.activeStep.set(stepIndex);
    }
  }
}