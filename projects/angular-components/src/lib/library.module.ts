import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { SearchComponent } from './search/search.component';
import { AlertComponent } from './alert/alert.component';
import { ChipComponent } from './chip/chip.component';
import { DatatableComponent } from './datatable/datatable.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DtContentDirective } from './datatable/dt-content.directive';
import { ThSortableDirective } from './th-sortable.directive';
import { CollapseDirective } from './collapse.directive';
import { Combobox } from './combobox/combobox.component';

const components = [
  AlertComponent,
  ButtonComponent,
  CheckboxComponent,
  ChipComponent,
  Combobox,
  DatatableComponent,
  SearchComponent,
  DtContentDirective,
  CollapseDirective,
  ThSortableDirective,
];

@NgModule({
  declarations: [],
  imports: components,
  exports: components,
  providers: [],
})
export class LibraryModule {}
