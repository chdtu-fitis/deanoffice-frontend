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
  private routeChanges: Observable<string> = this.router.events
    .map((event) => event['url'])
    .filter((url) => url)
    .distinctUntilChanged()
    .map((url) => this.getLastPath(url));

  constructor(private router: Router) { }

  ngOnInit() {
    this.routeChanges .subscribe((feature) => this.feature = features[feature]);
  }

  private getLastPath(url: string): string {
    const paths = url.split('/');
    return paths[paths.length - 1];
  }
}

const features = {
  // login
  'login': 'Вхід',
  // main page
  'dashboard': 'Головна сторінка',
  // start year
  'specialities': 'Спеціальності',
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
