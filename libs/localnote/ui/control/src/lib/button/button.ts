import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'nl-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {


  label = input.required<string>();
  variant = input<'primary' | 'secondary'>('primary');
  disabled = input<boolean>(false);

  clicked = output<void>();



  // 5. Computed: Berechnet CSS-Klassen reaktiv basierend auf Inputs
  protected stylingButton = computed(() => {
    const classes = ['nl-button', `nl-button-${this.variant()}`];
    if (this.disabled()) classes.push('nl-disabled');
    return classes.join(' ');
  });





  // 6. Methode zum Abfangen des Klicks (Disabled Check)
  /*   protected onClick(event: MouseEvent): void {
      event.stopPropagation();
  
      if (!this.disabled()) {
        this.clicked.emit();
      }
   */


  onClick(event: MouseEvent) {
    event.stopPropagation();
    if (!this.disabled()) this.clicked.emit();
  }

}



