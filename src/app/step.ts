import { Component, computed, inject, Input, OnInit, TemplateRef, input } from '@angular/core';
import { StepperService } from './stepper.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // Import needed for *ngIf

@Component({
  selector: 'app-step',
  standalone: true, // ES STANDALONE
  imports: [CommonModule],
  template: `
  <div class="step-container" [class.active]="isActive()">
    <div class="step-header" (click)="goToStep()">
      <div class="step-indicator">{{ stepIndex }}</div>
      <div class="step-title">Etapa {{ stepIndex }}</div>
    </div>
    
    <div class="step-content" >
      <ng-container *ngTemplateOutlet="stepContent()"></ng-container>
    </div>
  </div>
`,
})
export class StepComponent  {
@Input({ required: true }) stepIndex!: number;
// NUEVO: Recibe el TemplateRef para el contenido del paso
stepContent =  input.required<TemplateRef<any>>();

isActive = computed(() => this.stepperService.activeStep() === this.stepIndex);


constructor(private stepperService: StepperService) {}


goToStep() {
  this.stepperService.goToStep(this.stepIndex);
}
}