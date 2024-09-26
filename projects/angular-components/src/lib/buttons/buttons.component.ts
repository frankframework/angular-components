import { Component } from '@angular/core';

export const STYLES = ['primary', 'secondary'] as const;
export type ButtonStyle = (typeof STYLES)[number];

export const STATE = ['normal', 'active', 'disabled'] as const;
export type ButtonState = (typeof STATE)[number];

@Component({
  selector: 'ff-buttons',
  standalone: true,
  imports: [],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css',
})
export class ButtonsComponent {}
