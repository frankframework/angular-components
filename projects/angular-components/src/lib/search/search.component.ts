import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconMagnifierComponent } from '../icons/icon-magnifier/icon-magnifier.component';
import { noop } from 'rxjs';

export const SEARCH_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SearchComponent),
  multi: true,
};

@Component({
  selector: 'ff-search',
  standalone: true,
  imports: [FormsModule, IconMagnifierComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SEARCH_CONTROL_VALUE_ACCESSOR],
})
export class SearchComponent implements ControlValueAccessor {
  @Input() value: string = '';
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @ViewChild('input') _inputElement!: ElementRef<HTMLInputElement>;

  protected _onChange: (value: string) => void = noop;
  protected _onTouched: () => void = noop;

  writeValue(value: unknown): void {
    this.value = value as string;
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

  protected _onInteractionEvent(event: Event): void {
    event.stopPropagation();
    this._onChange(this._inputElement.nativeElement.value);
  }
}
