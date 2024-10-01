import { Component } from '@angular/core';
import { LibraryModule } from 'angular-components';
import { SvgAddIconComponent } from './svg-add-icon/svg-add-icon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LibraryModule, SvgAddIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {}

  protected toggleTheme(): void {
    document.body.classList.toggle('ff-dark-theme');
  }
}
