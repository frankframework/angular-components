import { Component, Input, numberAttribute } from '@angular/core';

@Component({
  template: '',
  standalone: true,
})
export abstract class IconBaseComponent {
  @Input({ transform: numberAttribute }) width: number = 24;
  @Input({ transform: numberAttribute }) height: number = 24;
  @Input() colour: string = '#000';
}
