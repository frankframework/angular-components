import { HostListener, SimpleChanges } from '@angular/core';
import { Option } from './combobox.component';

export class ComboboxBase {
  protected input = '';
  protected filteredOptions: Option[] = [];
  protected selectedIndex = -1;
  protected listShown = false;
  protected showError = false;

  protected showListDisplay(): void {
    if (this.listShown) return;
    this.listShown = true;
    this.filterListItems();
    this.highlightItemMatchingInput();
  }

  protected onUpdateInput(): void {
    this.filterListItems();
    this.highlightItemMatchingInput();
  }

  protected clickItem(index: number): void {
    this.selectItem(index);
    this.hideListDisplay();
  }

  protected clearSelectedItem(): void {
    this.selectedIndex = -1;
    this.input = '';
    this.setSelectedOption('');
    this.hideListDisplay();
  }

  protected hideListDisplay(): void {
    if (!this.listShown) return;
    this.listShown = false;
    this.setSelectedOption(this.input);
    this.validateInput();
  }

  protected resetListItems(): void {
    this.filteredOptions = this.options;
  }

  protected selectItem(index: number): void {
    if (index < 0 || index >= this.filteredOptions.length) return;
    this.input = this.filteredOptions[index].label;
    this.setSelectedOption(this.input);
  }

  protected setSelectedOption(option: string): void {
    this.selectedOption = option;
    this.selectedOptionChange.emit(this.selectedOption);
  }

  protected filterListItems(): void {
    this.filteredOptions = this.options.filter(({ label }) => label.toLowerCase().startsWith(this.input.toLowerCase()));
  }

  protected validateInput(): void {
    this.showError = !!(this.input || this.required) && !this.options.some(({ label }) => label === this.input);
    if (this.showError) this.resetListItems();
  }

  protected highlightItemMatchingInput(): void {
    if (!this.listShown) return;
    const matchingItem = this.filteredOptions.findIndex(({ label }) => label === this.input);
    if (matchingItem === -1) {
      this.selectedIndex = -1;
    } else {
      this.selectItemInListDisplay(matchingItem);
    }
  }

  protected selectItemInListDisplay(index: number): void {
    this.selectedIndex = index;
    this.comboboxOptionsRef?.nativeElement
      .querySelectorAll('.list-item')
      [this.selectedIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  protected selectNext(): void {
    if (this.filteredOptions.length <= 0) {
      return;
    }
    this.selectItemInListDisplay((this.selectedIndex + 1) % this.filteredOptions.length);
  }

  protected selectPrevious(): void {
    if (this.filteredOptions.length <= 0) {
      return;
    }
    if (this.selectedIndex === -1) this.selectedIndex = 0;
    if (this.selectedIndex <= 0) {
      this.selectedIndex = this.filteredOptions.length + this.selectedIndex;
    }
    this.selectItemInListDisplay((this.selectedIndex - 1) % this.filteredOptions.length);
  }
}
