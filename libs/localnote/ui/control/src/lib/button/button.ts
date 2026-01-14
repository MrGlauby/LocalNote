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

type = input <'button' | 'submit' | 'reset' >('button');

  protected stylingButton = computed(() => {
    const classes = ['nl-button', `nl-button-${this.variant()}`];
    if (this.disabled()) classes.push('nl-disabled');
    return classes.join(' ');
  });

  protected onClick(event: MouseEvent): void {
    event.stopPropagation();

    if (!this.disabled()) {
      this.clicked.emit();
    }
  }
}
