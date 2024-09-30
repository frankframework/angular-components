import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg-add-icon',
  standalone: true,
  imports: [],
  templateUrl: './svg-add-icon.component.html',
  styles: `
    :host {
      display: contents;
    }
  `,
})
export class SvgAddIconComponent {
  @Input() width: number = 24;
  @Input() height: number = 24;
  @Input() colour: string = '#000';
}
