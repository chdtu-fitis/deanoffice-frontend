import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  feature: string | '';

  private getUrlFromEvent = (event) => event['url'] as string;

  private isExist = (url: string): boolean => Boolean(url);

  private getLastPath(url: string): string {
    return url.split('/').reverse()[0];
  }

  private routeChanges: Observable<string> = this.router.events
    .map(this.getUrlFromEvent)
    .filter(this.isExist)
    .distinctUntilChanged()
    .map(this.getLastPath);

  constructor(private router: Router) { }

  ngOnInit() {
    this.routeChanges.subscribe(this.updateFeature);
  }

  private updateFeature = (path: string): void => this.feature = features[path];
}

const features = {
  // login
  'login': 'Вхід',
  // main page
  'dashboard': 'Головна сторінка',
  // start year
  'specialities': 'Спеціальності',
  'specializations': 'Спеціалізації',
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
