import {
  Directive,
  HostListener,
  booleanAttribute,
  AfterViewInit,
  inject,
  Renderer2,
  input,
  numberAttribute,
  output,
  linkedSignal,
} from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[collapse]',
  standalone: true,
})
export class CollapseDirective implements AfterViewInit {
  public collapse: HTMLElement = input.required<HTMLElement>();
  public collapsedInput = input(false, { transform: booleanAttribute });
  public animationSpeed = input(300, { transform: numberAttribute });
  public collapsedChange = output<boolean>();

  protected collapsed = linkedSignal(() => this.collapsedInput());

  private collapseAnimation: Animation | null = null;
  private clientHeight = 0;
  private readonly renderer: Renderer2 = inject(Renderer2);

  @HostListener('click')
  onClick(): void {
    const collapsed = !this.collapsed();
    this.collapsed.set(collapsed);
    this.collapsedChange.emit(collapsed);
    this.updateState();
  }

  ngAfterViewInit(): void {
    this.setInitialState();
  }

  updateState(): void {
    if (this.collapseAnimation) {
      this.collapseAnimation.cancel();
      return;
    }

    if (this.collapsed()) {
      this.clientHeight = this.collapse.clientHeight;
      this.collapseElement();
    } else {
      this.expandElement();
    }
  }

  private setInitialState(): void {
    if (!this.collapsed) {
      return;
    }

    this.clientHeight = this.collapse.clientHeight;
    this.renderer.addClass(this.collapse, 'collapsed');
  }

  private collapseElement(): void {
    this.collapse.classList.add('transforming');
    this.collapseAnimation = this.collapse.animate(
      { height: [`${this.clientHeight}px`, '0px'] },
      { duration: this.animationSpeed(), easing: 'ease-in-out' },
    );
    this.collapseAnimation.finished
      .then(() => {
        this.renderer.addClass(this.collapse, 'collapsed');
      })
      .finally(() => {
        this.renderer.removeClass(this.collapse, 'transforming');
        this.collapseAnimation = null;
      });
  }

  private expandElement(): void {
    this.collapseAnimation = this.collapse.animate(
      { height: ['0px', `${this.clientHeight}px`] },
      { duration: this.animationSpeed(), easing: 'ease-in-out' },
    );
    this.collapseAnimation.finished
      .then(() => {
        this.renderer.removeClass(this.collapse, 'collapsed');
      })
      .finally(() => {
        this.collapseAnimation = null;
      });
  }
}
