import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  Input,
  linkedSignal
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';
import { AutoFocusDirective } from '../auto-focus.directive';

export const FF_CHECKBOX_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true,
};

@Component({
  selector: 'ff-checkbox',
  standalone: true,
  imports: [FormsModule, AutoFocusDirective],
  templateUrl: './checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FF_CHECKBOX_CONTROL_VALUE_ACCESSOR],
})
export class CheckboxComponent implements ControlValueAccessor {
  public disabledInput = input<boolean>(false, { transform: booleanAttribute });
  public checkedInput = input<boolean>(false, { transform: booleanAttribute });
  public autofocus = input<boolean>(false, { transform: booleanAttribute });
  public color = input<string>('#000');
  // @Input() backgroundColour: string = '#FDC300';

  protected disabled = linkedSignal(() => this.disabledInput());
  protected checked = linkedSignal(() => this.checkedInput());

  protected _onChange: (value: boolean) => void = noop;
  protected _onTouched: () => void = noop;

  writeValue(value: unknown): void {
    this.checked.set(value as boolean);
  }

  registerOnChange(function_: never): void {
    this._onChange = function_;
  }

  registerOnTouched(function_: never): void {
    this._onTouched = function_;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  protected _onBlur(): void {
    setTimeout(() => this._onTouched());
  }

  protected _onClick(event: MouseEvent): void {
    if ((event.target as HTMLElement)?.nodeName !== 'INPUT') {
      event.stopPropagation();
    }
  }
}
