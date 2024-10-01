import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';

const components = [ButtonComponent];

@NgModule({
  declarations: [],
  imports: components,
  exports: components,
  providers: [],
})
export class LibraryModule {}
