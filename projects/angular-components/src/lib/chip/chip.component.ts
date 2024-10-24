import { booleanAttribute, Component, Input } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'ff-chip',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
})
export class ChipComponent {
  @Input({ transform: booleanAttribute }) rounded: boolean = false;
  @Input({ transform: booleanAttribute }) slim: boolean = false;

  private bgColour: string = 'rgb(0, 0, 0)';
  private _colour?: string;

  @Input()
  set colour(value: string | undefined) {
    if (value && value.startsWith('#')) {
      this._colour = value.slice(1);
      this.bgColour = this.calculateBackgroundColour(this._colour);
      return;
    } else if (value) {
      this.bgColour = this.calculateBackgroundColour(value);
    }
    this._colour = value;
  }
  get colour(): string | undefined {
    return this._colour;
  }

  calculateColours(): Record<string, string> | null {
    if (!this.colour) return null;
    return {
      'border-color': `#${this.colour}`,
      'background-color': this.bgColour,
    };
  }

  private calculateBackgroundColour(hexColour: string): string {
    const bigint = Number.parseInt(hexColour, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b}, 0.2)`;
  }
}
