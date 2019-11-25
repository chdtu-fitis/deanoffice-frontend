import {GlobalConfig} from 'ngx-toastr';

export const toastrConfig: Partial<GlobalConfig> = {
  positionClass: 'toast-bottom-right',
  enableHtml: true,
  timeOut: 50000
};
