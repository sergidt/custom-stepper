import { Component, computed, inject, Input, OnInit, TemplateRef } from '@angular/core';
import { StepperService } from './stepper.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // Import needed for *ngIf

@Component({
  selector: 'app-step',
  standalone: true, // ES STANDALONE
  imports: [CommonModule],
  template: `
  <div class="step-container" [class.active]="(isActive$ | async)">
    <div class="step-header" (click)="goToStep()">
      <div class="step-indicator">{{ stepIndex }}</div>
      <div class="step-title">Etapa {{ stepIndex }}</div>
    </div>
    
    <div class="step-content" >
      <ng-container *ngTemplateOutlet="stepContent"></ng-container>
    </div>
  </div>
`,
})
export class StepComponent implements OnInit {
@Input({ required: true }) stepIndex!: number;
// NUEVO: Recibe el TemplateRef para el contenido del paso
@Input({ required: true }) stepContent!: TemplateRef<any>;

isActive$!: Observable<boolean>;

constructor(private stepperService: StepperService) {}

ngOnInit() {    
  this.isActive$ = this.stepperService.activeStep$.pipe(
    map(active => active === this.stepIndex)
  );
}

goToStep() {
  this.stepperService.goToStep(this.stepIndex);
}
}