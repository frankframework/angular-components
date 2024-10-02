import { Component, Input } from '@angular/core';

@Component({
  template: '',
})
export class IconBaseComponent {
  @Input() width: number = 24;
  @Input() height: number = 24;
  @Input() colour: string = '#000';
}
