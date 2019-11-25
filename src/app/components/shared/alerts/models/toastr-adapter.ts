import {AlertOptions} from './alert-options';
import {IndividualConfig} from 'ngx-toastr';

export class ToastrAdapter {
  public title: string;
  public body?: string;
  public config?: Partial<IndividualConfig>;

  static new(options: AlertOptions): ToastrAdapter {
    return new ToastrAdapter(options);
  }

  constructor({ title, body, ...config }: AlertOptions) {
    this.title = title;

    if (body) { this.body = body }

    if ( Object.keys(config).length ) {
      this.config = { timeOut: config.timeout }
    }
  }
}
