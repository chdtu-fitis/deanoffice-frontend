import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

export function forObservable<T>(operation = 'operation', result?: T) {
  return function (error: any): Observable<T> {
    forPromise(operation)(error);
    return of(result as T);
  }
}

export function forPromise(operation = 'operation'): (error: any) => void {
  return function (error: any) {
    let english = /^[A-Za-z0-9]+$/;
    let message;
    if (error.error) {
      if (english.test(error.error.substr(0,1)))
        message = ERRORS[error.status];
      else
        message = error.error;
    }
    alert(`${operation}: ${message}`);
  }
}

const ERRORS = {
  0: 'Немає відповіді від сервера!',
  400: 'Неправильний запит до сервера!',
  401: 'Доступ заборонено! Будь-ласка, авторизуйтесь в системі',
  403: 'Відмовлено в доступі! У вас немає прав на доступ до цього ресурсу',
  404: 'Ресурс не знайдено!',
  422: 'Будь-ласка, перевірте правильність введених даних!',
  500: 'Помилка сервера!',
  503: 'Служба тимчасово недоступна, будь-ласка, зачекайте або зверніться до адміністратора!'
};

