import { Directive, inject, Input, TemplateRef } from '@angular/core';

export type DtContent<T> = {
  rowElement: T;
};

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[dtContent]',
  standalone: true,
})
export class DtContentDirective<T> {
  @Input() dtContent?: string;
  public templateReference = inject<TemplateRef<DtContent<T>>>(TemplateRef);
}
