import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';

const features = {
  // login
  'login': 'Вхід',
  // start year
  'specialities': 'Спеціальності',
  'specializations': 'Спеціалізації (освітні програми)',
  'courses-for-groups': 'Предмети для груп',
  // during year
  'students': 'Студенти',
  'expelled': 'Відраховані студенти',
  'in-vacation': 'Студенти в академ. відпустці',
  'grades': 'Оцінки',
  // documents
  'diploma-supplement': 'Додатки до диплому',
  'exam-report': 'Відомості'
};


@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private feature$: Observable<string>;

  constructor(router: Router) {
    this.feature$ = router.events
      .pipe(
        map(getUrlFromEvent),
        filter(isExist),
        distinctUntilChanged(),
        map(getLastPath),
        map(toFeature)
      );
  }
}

const getUrlFromEvent = (event) => event['url'] as string;

const isExist = (url: string): boolean => Boolean(url);

const getLastPath = (url: string): string => url.split('/').reverse()[0];

const toFeature = (path: string): string => {
  const feature: string | undefined = features[path];
  return (feature) ? ` - ${feature}` : '';
};
