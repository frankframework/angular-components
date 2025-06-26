import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, QueryList } from '@angular/core';

export type SortDirection = 'ASC' | 'DESC' | 'NONE';
export type SortEvent = {
  column: string | number;
  direction: SortDirection;
};

export const compare = (v1: string | number, v2: string | number): 1 | -1 | 0 => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

/** Non primitive types won't be covered correctly (null, undefined, object, etc), maybe this function should be extended at some point */
export const anyCompare = <T>(v1: T, v2: T): 1 | -1 | 0 => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export function updateSortableHeaders(headers: QueryList<ThSortableDirective>, column: string | number | symbol): void {
  for (const header of headers) {
    if (header.sortable !== column) {
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

  return [...array].sort((a, b) => {
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

  return [...array].sort((a, b) => {
    const order = anyCompare(a[column as keyof T], b[column as keyof T]);
    return direction === 'ASC' ? order : -order;
  });
}

@Directive({
  selector: 'th[sortable]',
  standalone: true,
})
export class ThSortableDirective implements OnInit {
  @Input() sortable: string = '';
  @Input() direction: SortDirection = 'NONE';
  @Output() sorted = new EventEmitter<SortEvent>();

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
  private headerText = '';

  constructor(private elementReference: ElementRef<HTMLTableCellElement>) {}

  ngOnInit(): void {
    this.headerText = this.elementReference.nativeElement.innerHTML;
  }

  updateIcon(direction: SortDirection): void {
    let updateColumnName = '';
    updateColumnName =
      direction == null
        ? this.headerText
        : this.headerText +
          (direction == 'ASC' ? ' <i class="fa fa-arrow-up"></i>' : ' <i class="fa fa-arrow-down"></i>');
    this.elementReference.nativeElement.innerHTML = updateColumnName;
  }

  updateDirection(newDirection: SortDirection): void {
    this.direction = newDirection;
    this.updateIcon(this.direction);
  }

  @HostListener('click') nextSort(): void {
    this.updateDirection(this.nextSortOption(this.direction));
    this.sorted.emit({ column: this.sortable, direction: this.direction });
  }
}
