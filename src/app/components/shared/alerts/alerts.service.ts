import {Injectable} from '@angular/core';
import {IndividualConfig, ToastrService} from 'ngx-toastr';
import {AlertOptions} from './alert-options';

interface AlertAdapter {
  title: string;
  body: string;
  config?: Partial<IndividualConfig>
}

@Injectable()
export class AlertsService {
  constructor(private _toastr: ToastrService) {}

  public showSuccess(options: AlertOptions) {
    const { body, title, config } = this._formatOptions(options);
    this._toastr.success(body, title, config);
  }

  public showError(options: AlertOptions) {
    const { body, title, config } = this._formatOptions(options);
    this._toastr.error(body, title, config);
  }

  private _formatOptions({ title, body, ...config }: AlertOptions): AlertAdapter {
    const options: AlertAdapter = { title, body };
    if ( Object.keys(options).length ) {
      options.config = {
        timeOut: config.timeout
      }
    }
    return options;
  }
}
