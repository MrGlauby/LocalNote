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

//Wenn das Formular abgefuert wird - resetet sich das Fomular automaitsch durch type!
type = input <'button' | 'submit' | 'reset' >('button')
  // klar css klassen im array - habe ich dneke ich verstanden!
  protected stylingButton = computed(() => {
    const classes = ['nl-button', `nl-button-${this.variant()}`];
    if (this.disabled()) classes.push('nl-disabled');
    return classes.join(' ');
  });

  // dashier nochmals anschauen!
  // 6. Methode zum Abfangen des Klicks (Disabled Check)
  protected onClick(event: MouseEvent): void {
    event.stopPropagation();

    if (!this.disabled()) {
      this.clicked.emit();
    }
  }
}


/* <form>
  <input name="email" />
  
  <nl-button label="Speichern" [type]="'submit'"></nl-button>   <!-- Sendet -->
  <nl-button label="Zurücksetzen" [type]="'reset'"></nl-button> <!-- Löscht -->
  <nl-button label="Abbrechen" [type]="'button'"></nl-button>   <!-- Tut nix -->
</form> */