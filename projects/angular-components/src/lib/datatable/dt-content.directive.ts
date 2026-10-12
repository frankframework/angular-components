import { Directive, Input, TemplateRef } from '@angular/core';

export type DtContent<T> = {
  rowElement: T;
};

@Directive({
  selector: '[dtContent]',
  standalone: true,
})
export class DtContentDirective<T> {
  @Input() dtContent?: string;
  constructor(public templateReference: TemplateRef<DtContent<T>>) {}
}
