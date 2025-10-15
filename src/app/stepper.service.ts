import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepperService {
  private totalSteps: number = 0;
  
  // Tracks the index of the last step that has been CREATED (rendered).
  private createdStepsSubject = new BehaviorSubject<number>(1);
  readonly createdSteps$: Observable<number> = this.createdStepsSubject.asObservable();

  // Tracks the index of the currently ACTIVE step for navigation.
  private activeStepSubject = new BehaviorSubject<number>(1);
  readonly activeStep$: Observable<number> = this.activeStepSubject.asObservable();

  constructor() { }

  setTotalSteps(count: number): void {
    this.totalSteps = count;
  }

  nextStep(): void {
    const currentCreated = this.createdStepsSubject.getValue();
    const currentActive = this.activeStepSubject.getValue();

    if (currentCreated < this.totalSteps) {
      // RULE: Creates the next step and makes it active
      this.createdStepsSubject.next(currentCreated + 1);
      this.activeStepSubject.next(currentCreated + 1);
    } else if (currentActive < this.totalSteps) {
      // RULE: All created, just moves the active pointer
      this.activeStepSubject.next(currentActive + 1);
    }
  }

  prevStep(): void {
    const currentActive = this.activeStepSubject.getValue();
    if (currentActive > 1) {
      this.activeStepSubject.next(currentActive - 1);
    }
  }

  goToStep(stepIndex: number): void {
    const currentCreated = this.createdStepsSubject.getValue();
    // Only allow navigating to steps that have already been created/rendered
    if (stepIndex >= 1 && stepIndex <= currentCreated) {
      this.activeStepSubject.next(stepIndex);
    }
  }
}