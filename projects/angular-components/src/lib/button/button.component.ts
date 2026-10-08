import { CommonModule } from '@angular/common';
import { booleanAttribute, Component, input, linkedSignal, output } from '@angular/core';
import { AutoFocusDirective } from '../auto-focus.directive';

@Component({
  selector: 'ff-button',
  standalone: true,
  imports: [CommonModule, AutoFocusDirective],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  public disabled = input<boolean>(false, { transform: booleanAttribute });
  public toggleable = input<boolean>(false, { transform: booleanAttribute });
  public autofocus = input<boolean>(false, { transform: booleanAttribute });
  public active = input<boolean>(false, { transform: booleanAttribute });
  public activeChange = output<boolean>();

  protected isActive = linkedSignal(() => this.active());

  protected toggle(): void {
    if (!this.toggleable() || this.disabled()) {
      return;
    }

    const active = !this.isActive();
    this.isActive.set(active);
    this.activeChange.emit(active);
  }
}
