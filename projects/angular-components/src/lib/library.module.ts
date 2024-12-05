import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { SearchComponent } from './search/search.component';
import { AlertComponent } from './alert/alert.component';
import { ChipComponent } from './chip/chip.component';
import { DatatableComponent } from './datatable/datatable.component';
import { CheckboxComponent } from './checkbox/checkbox.component';

const components = [
  ButtonComponent,
  SearchComponent,
  AlertComponent,
  ChipComponent,
  DatatableComponent,
  CheckboxComponent,
];

@NgModule({
  declarations: [],
  imports: components,
  exports: components,
  providers: [],
})
export class LibraryModule {}
