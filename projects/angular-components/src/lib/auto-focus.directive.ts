import { Directive, ElementRef, inject, AfterViewInit, booleanAttribute, input } from '@angular/core';

@Directive({
  selector: '[ffAutoFocus]',
  standalone: true,
})
export class AutoFocusDirective implements AfterViewInit {
  public ffAutoFocus = input<boolean>(false, { transform: booleanAttribute });
  private element: ElementRef = inject(ElementRef);

  ngAfterViewInit(): void {
    if (this.ffAutoFocus()) {
      this.element.nativeElement.focus();
    }
  }
}
