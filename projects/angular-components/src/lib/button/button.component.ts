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
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input({ transform: booleanAttribute }) toggleable: boolean = false;
  @Input({ transform: booleanAttribute }) active: boolean = false;
  @Input({ transform: booleanAttribute }) autofocus: boolean = false;
  @Output() activeChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  protected toggle(): void {
    if (this.toggleable && !this.disabled) {
      this.active = !this.active;
      this.activeChange.emit(this.active);
    }
  }
}
