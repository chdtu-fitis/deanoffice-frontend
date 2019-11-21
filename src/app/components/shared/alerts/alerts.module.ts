import {NgModule} from '@angular/core';
import {GlobalConfig, ToastrModule, ToastrService} from 'ngx-toastr';
import {AlertsService} from './alerts.service';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const toastrConfig: Partial<GlobalConfig> = {
  positionClass: 'toast-bottom-right',
  timeOut: 50000
};

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
