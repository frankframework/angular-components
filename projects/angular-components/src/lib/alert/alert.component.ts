import { Component, computed, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { SolarInfoCircle, SolarCheckCircle, SolarDangerCircle, SolarCloseCircle } from '@solar-icons/angular';

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
  imports: [NgClass, SolarInfoCircle, SolarCheckCircle, SolarDangerCircle, SolarCloseCircle],
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  public type = input<AlertType>(ALERT_TYPES.WARNING);
  protected className = computed(() => `ff-alert-${this.type()}`);
  protected iconSize = 18;
}
