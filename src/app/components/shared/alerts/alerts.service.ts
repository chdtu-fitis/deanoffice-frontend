import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {AlertOptions, AlertOptionsPartial} from './models/alert-options';
import {pipe} from '../utils';
import {ToastrAdapter} from './models/toastr-adapter';

@Injectable()
export class AlertsService {
  constructor(private _toastr: ToastrService) {}

  public showError(options: AlertOptionsPartial) {
    const { body, title, config } = this._formatOptions(options, { title: 'Помилка' });

    this._toastr.error(body, title, config);
  }

  private _formatOptions(options: AlertOptionsPartial, defaults: AlertOptionsPartial): ToastrAdapter {
    return pipe(options, [ this._setDefaultsOptions(defaults), ToastrAdapter.new ]);
  }

  private _setDefaultsOptions(defaults: AlertOptionsPartial): (options: AlertOptionsPartial) => AlertOptions {
    return (alertOptions: AlertOptions) => ({ ...defaults, ...alertOptions });
  }

  public showUnknownError() {
    this.showError({ title: 'Невідома помилка' });
  }
}
