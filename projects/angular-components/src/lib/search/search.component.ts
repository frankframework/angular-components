import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconMagnifierComponent } from '../icons/icon-magnifier/icon-magnifier.component';
import { debounceTime, noop, Subject } from 'rxjs';
import { NgClass } from '@angular/common';

export const SEARCH_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SearchComponent),
  multi: true,
};

@Component({
  selector: 'ff-search',
  standalone: true,
  imports: [FormsModule, NgClass, IconMagnifierComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SEARCH_CONTROL_VALUE_ACCESSOR],
})
export class SearchComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() placeholder: string = 'Search...';
  @Input() focusKey: string = '/';
  @Input({ transform: booleanAttribute }) focusKeyEnabled: boolean = true;
  @Input({ transform: booleanAttribute }) slim: boolean = false;
  @ViewChild('input') _inputElement!: ElementRef<HTMLInputElement>;

  protected _onChange: (value: string) => void = noop;
  protected _onTouched: () => void = noop;

  private _value: string = '';
  private _disabled: boolean = false;

  @Input()
  get value(): string {
    return this._value;
  }
  set value(value: string) {
    this._value = value;
    this._changeDetectorRef.markForCheck();
  }

  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    this._disabled = disabled;
    this._changeDetectorRef.markForCheck();
  }

  private _changeDetectorRef = inject(ChangeDetectorRef);
  private searchSubject: Subject<string> = new Subject();

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(200)).subscribe((value) => {
      this.value = value;
      this._onChange(value);
    });

    if (this.focusKeyEnabled) {
      window.addEventListener('keyup', this._onKeyEvent.bind(this), true);
    }
  }

  ngOnDestroy(): void {
    this.searchSubject.complete();

    if (this.focusKeyEnabled) {
      window.removeEventListener('keyup', this._onKeyEvent, true);
    }
  }

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
    Promise.resolve().then(() => {
      this._onTouched();
      this._changeDetectorRef.markForCheck();
    });
  }

  protected _onInputEvent(): void {
    this.searchSubject.next(this._inputElement.nativeElement.value);
  }

  protected _onInteractionEvent(event: Event): void {
    event.stopPropagation();
  }

  protected _onKeyEvent(event: KeyboardEvent): void {
    if (event.key === this.focusKey) {
      this._inputElement.nativeElement.focus();
      event.preventDefault();
    }
  }
}
