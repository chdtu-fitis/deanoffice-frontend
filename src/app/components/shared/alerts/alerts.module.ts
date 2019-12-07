import {NgModule} from '@angular/core';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {AlertsService} from './alerts.service';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {toastrConfig} from './alerts-config';

@NgModule({
  providers: [
    AlertsService,
    ToastrService
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(toastrConfig)
  ],
  exports: [ ToastrModule ]
})
export class AlertsModule {}
