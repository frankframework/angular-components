import { Component } from '@angular/core';
import { IconBaseComponent } from 'angular-components';

@Component({
  selector: 'app-svg-add-icon',
  imports: [],
  templateUrl: './svg-add-icon.component.html',
  styles: `
    :host {
      display: contents;
    }
    svg {
      flex: 0 0 auto;
    }
  `,
})
export class SvgAddIconComponent extends IconBaseComponent {}
