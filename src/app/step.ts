import { Component, computed, inject, Input, OnInit, TemplateRef, input } from '@angular/core';
import { StepperService } from './stepper.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // Import needed for *ngIf

@Component({
  selector: 'app-step',
  standalone: true,
  imports: [CommonModule],
  template: `
  @let index = stepIndex();

  <div class="step-container" [class.active]="isActive()">
    <div class="step-header" (click)="goToStep()">
      <div class="step-indicator">{{ index }}</div>
      <div class="step-title">Etapa {{ index }}</div>
    </div>
    
    <div class="step-content" >
      <ng-container *ngTemplateOutlet="stepContent()"/>
    </div>
  </div>
`,
})
export class StepComponent {
  stepIndex = input.required<number>();

  stepContent = input.required<TemplateRef<any>>();

  isActive = computed(() => this.stepperService.activeStep() === this.stepIndex());

  private stepperService = inject(StepperService);

  goToStep() {
    this.stepperService.goToStep(this.stepIndex());
  }
}