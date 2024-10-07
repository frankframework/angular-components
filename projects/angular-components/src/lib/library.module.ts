import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { SearchComponent } from './search/search.component';
import { AlertComponent } from './alert/alert.component';

const components = [ButtonComponent, SearchComponent, AlertComponent];

@NgModule({
  declarations: [],
  imports: components,
  exports: components,
  providers: [],
})
export class LibraryModule {}
