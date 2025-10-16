import { Component, ContentChildren, QueryList, AfterContentInit, inject, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperService } from './stepper.service';
import { StepComponent } from './step';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stepper',
  standalone: true, // ES STANDALONE
  imports: [CommonModule, StepComponent], // Importa módulos y componentes hijos
  template: `
    <div class="vertical-stepper">
      
      @for (stepContent of stepTemplates; track $index) {
      @if (stepsCreated() >= $index + 1){
        <app-step 
          [stepIndex]="$index + 1"
          [stepContent]="stepContent" />
      }
    }
      
      <div class="stepper-controls">
        <button (click)="stepperService.nextStep()" [disabled]="activeStep()! === stepTemplates.length">
          Siguiente
        </button>
      </div>
    </div>
  `,
  providers: [StepperService]
})
export class StepperComponent implements AfterContentInit {
  // Capturamos todos los TemplateRef que el padre pasa como contenido.
  // El padre debe usar <ng-template> para definir los pasos.
  @ContentChildren(TemplateRef) stepTemplates!: QueryList<TemplateRef<any>>;
  
  stepperService = inject( StepperService);
    stepsCreated = this.stepperService.createdSteps;
    activeStep = this.stepperService.activeStep;
  

  ngAfterContentInit() {
    // Establecemos el número total de pasos basado en los TemplateRefs capturados.
    this.stepperService.setTotalSteps(this.stepTemplates.length);
  }
}