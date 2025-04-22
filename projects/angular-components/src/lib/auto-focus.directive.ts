import { Directive, ElementRef, inject, AfterViewInit, Input, booleanAttribute } from '@angular/core';

@Directive({
  selector: '[ffAutoFocus]',
})
export class AutoFocusDirective implements AfterViewInit {
  @Input({ transform: booleanAttribute }) ffAutoFocus: boolean = false;
  private element: ElementRef = inject(ElementRef);

  ngAfterViewInit(): void {
    if (this.ffAutoFocus) {
      this.element.nativeElement.focus();
    }
  }
}
