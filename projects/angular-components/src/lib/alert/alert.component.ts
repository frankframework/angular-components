import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconMagnifierComponent } from '../icons/icon-magnifier/icon-magnifier.component';
import { IconInfoCircleComponent } from '../icons/icon-info-circle/icon-info-circle.component';
import { IconWarningCircleComponent } from '../icons/icon-warning-circle/icon-warning-circle.component';
import { IconSuccessCircleComponent } from '../icons/icon-success-circle/icon-success-circle.component';
import { IconErrorCircleComponent } from '../icons/icon-error-circle/icon-error-circle.component';

export const ALERT_TYPES = ['info', 'success', 'warning', 'error'] as const; // works better with object indices
export type AlertType = (typeof ALERT_TYPES)[number];

@Component({
  selector: 'ff-alert',
  standalone: true,
  imports: [
    CommonModule,
    IconMagnifierComponent,
    IconInfoCircleComponent,
    IconWarningCircleComponent,
    IconSuccessCircleComponent,
    IconErrorCircleComponent,
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  @Input() type: AlertType = ALERT_TYPES[2];
}
