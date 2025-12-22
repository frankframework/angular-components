import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconAltArrowDownComponent } from '../icons/icon-alt-arrow-down/icon-alt-arrow-down.component';
import { ComboboxBase } from './combobox-base';

export type Option = {
  label: string;
  description?: string;
};

@Component({
  selector: 'ff-combobox',
  imports: [NgClass, FormsModule, IconAltArrowDownComponent],
  standalone: true,
  templateUrl: './combobox.component.html',
})
export class Combobox extends ComboboxBase implements OnInit, OnChanges {
  @Input({ required: true }) options!: Option[];
  @Input() required = true;
  @Input() name = '';
  @Input() id = '';
  @Input() disabled = false;
  @Input() selectedOption?: string;
  @Output() selectedOptionChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('comboboxOptions') comboboxOptionsRef!: ElementRef;
  @ViewChild('comboboxDropdownIcon') comboboxDropdownIcon!: ElementRef;

  @HostListener('keydown.enter', ['$event'])
  protected onEnter(event: Event): void {
    event.preventDefault();
    this.selectItem(this.selectedIndex);
    this.hideListDisplay();
  }

  @HostListener('keydown.escape')
  protected onEscape(): void {
    this.clearSelectedItem();
    this.hideListDisplay();
  }

  @HostListener('keydown.arrowUp')
  protected onArrowUp(): void {
    this.selectPrevious();
  }

  @HostListener('keydown.arrowDown')
  protected onArrowDown(): void {
    this.selectNext();
  }

  ngOnInit(): void {
    this.resetListItems();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedOption']) {
      this.input = changes['selectedOption'].currentValue ?? '';
    }
  }
}
