import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GridComponent} from './grid.component';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [GridComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
  ],
  exports: [GridComponent]
})

export class GridModule {
}
