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
  public collapse = input.required<HTMLElement>();
  public collapsed = input(false, { transform: booleanAttribute });
  public animationSpeed = input(300, { transform: numberAttribute });
  public collapsedChange = output<boolean>();

  protected isCollapsed = linkedSignal(() => this.collapsed());

  private collapseAnimation: Animation | null = null;
  private clientHeight = 0;
  private readonly renderer: Renderer2 = inject(Renderer2);

  @HostListener('click')
  onClick(): void {
    const collapsed = !this.isCollapsed();
    this.isCollapsed.set(collapsed);
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

    if (this.isCollapsed()) {
      this.clientHeight = this.collapse().clientHeight;
      this.collapseElement();
    } else {
      this.expandElement();
    }
  }

  private setInitialState(): void {
    if (!this.isCollapsed()) return;
    const element = this.collapse();
    this.clientHeight = element.clientHeight;
    this.renderer.addClass(element, 'collapsed');
  }

  private collapseElement(): void {
    const element = this.collapse();
    element.classList.add('transforming');
    this.collapseAnimation = element.animate(
      { height: [`${this.clientHeight}px`, '0px'] },
      { duration: this.animationSpeed(), easing: 'ease-in-out' },
    );
    this.collapseAnimation.finished
      .then(() => {
        this.renderer.addClass(element, 'collapsed');
      })
      .finally(() => {
        this.renderer.removeClass(element, 'transforming');
        this.collapseAnimation = null;
      });
  }

  private expandElement(): void {
    const element = this.collapse();
    this.collapseAnimation = element.animate(
      { height: ['0px', `${this.clientHeight}px`] },
      { duration: this.animationSpeed(), easing: 'ease-in-out' },
    );
    this.collapseAnimation.finished
      .then(() => {
        this.renderer.removeClass(element, 'collapsed');
      })
      .finally(() => {
        this.collapseAnimation = null;
      });
  }
}
