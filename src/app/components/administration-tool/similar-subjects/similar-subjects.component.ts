import { Component, OnInit } from '@angular/core';
import {AdministrationToolService, SimilarCourse} from '../../../services/administration-tool.service';

@Component({
  selector: 'similar-subjects',
  templateUrl: './similar-subjects.component.html',
  styleUrls: ['./similar-subjects.component.scss']
})
export class SimilarSubjectsComponent implements OnInit {

  private similarCourses: SimilarCourse[][] = [];

  constructor(private administrationToolService: AdministrationToolService,
  ) {
  }

  ngOnInit() {
    this.administrationToolService.getSimilarCourse()
      .subscribe(value => {
        this.similarCourses = value.sort((a, b) => a[0].name.localeCompare(b[0].name));
      });
  }

  public getSimilarCourse(): SimilarCourse[][] {
    return this.similarCourses;
  }

  padId(id: number, similarCourses: SimilarCourse[]): string {
    return this.padStart(`${id}`, similarCourses.reduce(
      (previousValue, currentValue) => Math.max(previousValue, currentValue.id.toString().length),
      0
    ));
  }

  padStart(line: string, toLength: number): string {
    while (line.length !== toLength) {
      line = ' ' + line;
    }
    return line;
  }
}
