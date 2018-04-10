import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

export class HandleError {
  public static forObservable<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      HandleError.forPromise(error, operation);
      return of(result as T);
    }
  }

  public static forPromise = (error: any, operation = 'operation') => {
    const httpError: HttpError = new HttpError(operation, error.status);
    console.error(httpError);
    alert(`${httpError.operation}: ${httpError.message}`);
  };

}

const ERRORS = {
  0: 'Нет ответа от сервера, обратитесь в техническую поддержку',
  400: 'Некоректный запрос!',
  401: 'Доступ запрещен! Пожалуйста, выполните вход в свою учтенную запись, или, если это уже сделано, то выйдите с неё и зайдите в снова',
  403: 'Отказ в доступе! У вас нет прав на доступ к этому ресурсу',
  404: 'Не найдено!',
  422: 'Пожалуйста, проверьте введенные данные на правильность',
  500: 'Ошибка сервера!',
  503: 'Служба временно недоступна, пожалуйста, пропробуйте пойже или свяжитесь с технической поддержкой'
};

class HttpError {
  operation: string;
  status: number;
  message: string;

  constructor(operation: string, status: number) {
    this.operation = operation;
    this.status = status;
    this.message = ERRORS[status];
  }
}
