import { Directive, Input, TemplateRef } from '@angular/core';

export interface DtContent<T> {
  rowElement: T;
}

@Directive({
  selector: '[dtContent]',
  standalone: true,
})
export class DtContentDirective<T> {
  constructor(public templateReference: TemplateRef<DtContent<T>>) {}
  @Input() dtContent?: string;
}
