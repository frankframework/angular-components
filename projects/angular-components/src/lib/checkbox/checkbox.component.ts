import { Component, Input } from '@angular/core';
import { IconCheckComponent } from '../icons/icon-check/icon-check.component';

@Component({
  selector: 'ff-checkbox',
  standalone: true,
  imports: [IconCheckComponent],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  @Input() disabled: boolean = false;
  @Input() checked: boolean = false;
  @Input() colour: string = '#000';
  // @Input() backgroundColour: string = '#FDC300';
}
