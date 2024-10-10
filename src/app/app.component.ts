import { Component } from '@angular/core';
import { LibraryModule } from 'angular-components';
import { SvgAddIconComponent } from './svg-add-icon/svg-add-icon.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, LibraryModule, SvgAddIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected searchText: string = '';

  constructor() {}

  protected toggleTheme(): void {
    document.body.classList.toggle('ff-dark-theme');
  }
}
