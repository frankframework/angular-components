import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { SearchComponent } from './search/search.component';

const components = [ButtonComponent, SearchComponent];

@NgModule({
  declarations: [],
  imports: components,
  exports: components,
  providers: [],
})
export class LibraryModule {}
