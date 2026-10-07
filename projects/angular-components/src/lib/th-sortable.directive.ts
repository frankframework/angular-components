import { Directive, ElementRef, HostListener, inject, input, linkedSignal, output, QueryList } from '@angular/core';

export type SortDirection = 'ASC' | 'DESC' | 'NONE';
export type SortEvent = {
  column: string | number;
  direction: SortDirection;
};

export const compare = (v1: string | number, v2: string | number): 1 | -1 | 0 => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

/** Non-primitive types won't be covered correctly (null, undefined, object, etc), maybe this function should be extended at some point */
export const anyCompare = <T>(v1: T, v2: T): 1 | -1 | 0 => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export function updateSortableHeaders(headers: QueryList<ThSortableDirective>, column: string | number | symbol): void {
  for (const header of headers) {
    if (header.columnName() !== column) {
      header.updateDirection('NONE');
    }
  }
}

export function basicTableSort<T extends Record<string, string | number>>(
  array: T[],
  headers: QueryList<ThSortableDirective>,
  { column, direction }: SortEvent,
): T[] {
  updateSortableHeaders(headers, column);

  if (direction == 'NONE' || column == '') return array;

  return [...array].toSorted((a, b) => {
    const order = compare(a[column], b[column]);
    return direction === 'ASC' ? order : -order;
  });
}

/** Doesn't support all keyof types sadly, for now only string | number */
export function basicAnyValueTableSort<T>(
  array: T[],
  headers: QueryList<ThSortableDirective>,
  { column, direction }: SortEvent,
): T[] {
  updateSortableHeaders(headers, column);

  if (direction == 'NONE' || column == '') return array;

  return [...array].toSorted((a, b) => {
    const order = anyCompare(a[column as keyof T], b[column as keyof T]);
    return direction === 'ASC' ? order : -order;
  });
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'th[sortable]',
  standalone: true,
})
export class ThSortableDirective {
  public columnName = input<string>('');
  public directionInput = input<SortDirection>('NONE');
  public sorted = output<SortEvent>();

  protected direction = linkedSignal<SortDirection>(() => this.directionInput());

  private elementReference: ElementRef<HTMLTableCellElement> = inject(ElementRef);
  private THElement = this.elementReference.nativeElement;

  @HostListener('click') nextSort(): void {
    this.updateDirection(this.nextSortOption(this.direction()));
    this.sorted.emit({ column: this.columnName(), direction: this.direction() });
  }

  updateIcon(direction: SortDirection): void {
    const icon = this.THElement.querySelector('span.sort-icon');
    if (icon) {
      icon.remove();
    }
    if (direction === 'NONE') return;
    const iconElement = document.createElement('span');
    iconElement.classList.add('sort-icon');
    iconElement.innerHTML = direction == 'ASC' ? '&uarr;' : '&darr;';
    this.THElement.append(iconElement);
  }

  updateDirection(newDirection: SortDirection): void {
    this.direction.set(newDirection);
    this.updateIcon(newDirection);
  }

  private nextSortOption(sortOption: SortDirection): SortDirection {
    switch (sortOption) {
      case 'NONE': {
        return 'ASC';
      }
      case 'ASC': {
        return 'DESC';
      }
      default: {
        return 'NONE';
      }
    }
  }
}
