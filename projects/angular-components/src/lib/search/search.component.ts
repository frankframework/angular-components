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
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconMagnifierComponent } from '../icons/icon-magnifier/icon-magnifier.component';
import { debounceTime, noop, Subject } from 'rxjs';
import { NgClass } from '@angular/common';
import { FocusOnKeyUtil } from '../utils/focus-on-key.util';
import { AutoFocusDirective } from '../auto-focus.directive';

export const SEARCH_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SearchComponent),
  multi: true,
};

@Component({
  selector: 'ff-search',
  standalone: true,
  imports: [FormsModule, NgClass, IconMagnifierComponent, AutoFocusDirective],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SEARCH_CONTROL_VALUE_ACCESSOR],
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  @Input() placeholder: string = 'Search...';
  @Input() focusKey: string = '/';
  @Input({ transform: booleanAttribute }) autofocus: boolean = false;
  @Input({ transform: booleanAttribute }) forceFocus: boolean = false;
  @Input({ transform: booleanAttribute }) focusKeyEnabled: boolean = true;
  @Input({ transform: booleanAttribute }) slim: boolean = false;
  @ViewChild('input') _inputElement!: ElementRef<HTMLInputElement>;

  protected _onChange: (value: string) => void = noop;
  protected _onTouched: () => void = noop;

  private _value: string = '';
  private _disabled: boolean = false;
  private focusKeyUtil = new FocusOnKeyUtil({
    key: '/',
    ctrl: false,
    shift: false,
    force: false,
  });

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
    this.focusKeyUtil.updateConfig({
      key: this.focusKey,
      force: this.forceFocus,
    });
  }

  ngAfterViewInit(): void {
    if (this.focusKeyEnabled) {
      this.focusKeyUtil.setFocusElement(this._inputElement.nativeElement);
      this.focusKeyUtil.enable();
    }
  }

  ngOnDestroy(): void {
    this.searchSubject.complete();

    if (this.focusKeyEnabled) {
      this.focusKeyUtil?.disable();
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
}
