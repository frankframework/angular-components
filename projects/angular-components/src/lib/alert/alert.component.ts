import { Component, Input } from '@angular/core';
import { IconInfoCircleComponent } from '../icons/icon-info-circle/icon-info-circle.component';
import { IconWarningCircleComponent } from '../icons/icon-warning-circle/icon-warning-circle.component';
import { IconSuccessCircleComponent } from '../icons/icon-success-circle/icon-success-circle.component';
import { IconErrorCircleComponent } from '../icons/icon-error-circle/icon-error-circle.component';
import { NgClass } from '@angular/common';

export const ALERT_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;
export type AlertType = (typeof ALERT_TYPES)[keyof typeof ALERT_TYPES];

@Component({
  selector: 'ff-alert',
  standalone: true,
  imports: [
    IconInfoCircleComponent,
    IconWarningCircleComponent,
    IconSuccessCircleComponent,
    IconErrorCircleComponent,
    NgClass,
  ],
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  @Input() type: AlertType = ALERT_TYPES.WARNING;
  protected iconSize = 18;
}
