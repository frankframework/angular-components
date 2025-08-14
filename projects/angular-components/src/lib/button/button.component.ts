import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { AutoFocusDirective } from '../auto-focus.directive';

@Component({
  selector: 'ff-button',
  standalone: true,
  imports: [CommonModule, AutoFocusDirective],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) toggleable = false;
  @Input({ transform: booleanAttribute }) active = false;
  @Input({ transform: booleanAttribute }) autofocus = false;
  @Output() activeChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected toggle(): void {
    if (this.toggleable && !this.disabled) {
      this.active = !this.active;
      this.activeChange.emit(this.active);
    }
  }
}
