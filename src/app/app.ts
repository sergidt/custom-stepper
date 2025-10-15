import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StepperComponent } from "./stepper"; // Si usas ruteo


@Component({
  selector: 'app-root',
  standalone: true, // ES STANDALONE
  imports: [ StepperComponent], // Importa el stepper
  template: `
   <div style="padding: 20px;">
      <h1>Stepper Standalone con ngTemplateOutlet</h1>
      
      <app-stepper>
        <ng-template>
          <h2>Contenido de la Etapa 1</h2>
          <p>Pulsa **Siguiente**. Este contenido se instanciará usando ngTemplateOutlet.</p>
        </ng-template>
        
        <ng-template>
          <h2>Contenido de la Etapa 2</h2>
          <p>Esta etapa fue creada dinámicamente.</p>
        </ng-template>
        
        <ng-template>
          <h2>Contenido de la Etapa 3 (Final)</h2>
          <p>La creación ha terminado. Podemos navegar libremente.</p>
        </ng-template>
        
      </app-stepper>
    </div>
  `
})
export class App {
  title = 'angular-standalone-stepper';
}