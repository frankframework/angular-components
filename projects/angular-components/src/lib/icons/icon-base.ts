import { Component, Input, numberAttribute } from '@angular/core';

@Component({
  template: '',
  standalone: true,
})
export abstract class IconBaseComponent {
  @Input({ transform: numberAttribute }) width = 24;
  @Input({ transform: numberAttribute }) height = 24;
  @Input() colour = '#000';
}
