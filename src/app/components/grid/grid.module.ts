import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridComponent} from './grid.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [GridComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxDatatableModule
  ],
  exports: [GridComponent]
})

export class GridModule {
}
