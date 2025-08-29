import { booleanAttribute, ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { IconCheckComponent } from '../icons/icon-check/icon-check.component';
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
  imports: [FormsModule, IconCheckComponent, AutoFocusDirective],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FF_CHECKBOX_CONTROL_VALUE_ACCESSOR],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) checked = false;
  @Input({ transform: booleanAttribute }) autofocus = false;
  @Input() colour = '#000';
  // @Input() backgroundColour: string = '#FDC300';

  protected _onChange: (value: boolean) => void = noop;
  protected _onTouched: () => void = noop;

  writeValue(value: unknown): void {
    this.checked = value as boolean;
  }

  registerOnChange(function_: never): void {
    this._onChange = function_;
  }

  registerOnTouched(function_: never): void {
    this._onTouched = function_;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  protected _onBlur(): void {
    Promise.resolve().then(() => this._onTouched());
  }

  protected _onClick(event: MouseEvent): void {
    if ((event.target as HTMLElement)?.nodeName !== 'INPUT') {
      event.stopPropagation();
    }
  }
}
