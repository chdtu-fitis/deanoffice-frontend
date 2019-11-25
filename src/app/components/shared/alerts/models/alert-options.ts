export interface AlertOptions {
  title: string;
  body: string;
  timeout: number;
}

export type AlertOptionsPartial = Partial<AlertOptions>;
