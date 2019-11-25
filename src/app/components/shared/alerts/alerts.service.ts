import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {AlertOptions, AlertOptionsPartial} from './models/alert-options';
import {ToastrAdapter} from './models/toastr-adapter';

@Injectable()
export class AlertsService {
  constructor(private _toastr: ToastrService) {}

  public showError(options: AlertOptionsPartial) {
    const { body, title, config } = this._formatOptions(options, { title: 'Помилка' });

    this._toastr.error(body, title, config);
  }

  private _formatOptions(optionsOverrides: AlertOptionsPartial, defaults: AlertOptionsPartial): ToastrAdapter {
    const options = {...defaults, ...optionsOverrides} as AlertOptions;
    return new ToastrAdapter(options);
  }

  public showUnknownError() {
    this.showError({ title: 'Невідома помилка' });
  }
}
