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
  0: 'Немає відповіді від сервера!',
  400: 'Невірний запит до сервера!',
  401: 'Доступ заборонено! Будь-ласка, авторизуйтесь в системі',
  403: 'Відказано в доступі! У вас немає прав на доступ до цього ресурсу',
  404: 'Ресурс не знайдено!',
  422: 'Будь-ласка, перевірте правильність введених даних!',
  500: 'Помилка сервера!',
  503: 'Служба тимчасово недоступна, будь-ласка, зачекайте або зверніться до адміністратора!'
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
