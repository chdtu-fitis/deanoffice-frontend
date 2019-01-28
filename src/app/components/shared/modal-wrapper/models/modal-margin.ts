export class ModalMargin {
  'margin-top': string;
  'margin-left': string;
  'margin-bottom': string;
  'margin-right': string;

  constructor(
    top: string = '0',
    left: string = '0',
    bottom: string = '0',
    right: string = '0'
  ) {
    this['margin-top'] = top;
    this['margin-left'] = left;
    this['margin-bottom'] = bottom;
    this['margin-right'] = right;
  }
}
