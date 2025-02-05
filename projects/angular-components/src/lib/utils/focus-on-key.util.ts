export type FocusOnKeyConfig = {
  key: string;
  ctrl: boolean;
  shift: boolean;
  force: boolean;
};

export class FocusOnKeyUtil {
  constructor(
    private config: FocusOnKeyConfig = { key: 'k', ctrl: true, shift: false, force: false },
    private focusElement?: HTMLElement,
  ) {}

  setFocusElement(focusElement: HTMLElement): void {
    this.focusElement = focusElement;
  }

  updateConfig(config: Partial<FocusOnKeyConfig>): void {
    this.config = { ...this.config, ...config };
  }

  enable(): void {
    if (!this.focusElement) console.warn('No focus element set');
    window.addEventListener(this.config.force ? 'keydown' : 'keyup', this._onKeyEvent.bind(this));
  }

  disable(): void {
    window.removeEventListener('keydown', this._onKeyEvent);
    window.removeEventListener('keyup', this._onKeyEvent);
  }

  private _onKeyEvent(event: KeyboardEvent): void {
    if (!this.focusElement) return;
    if (event.key === this.config.key) {
      this.focusElement.focus();
      event.preventDefault();
    }
  }
}
