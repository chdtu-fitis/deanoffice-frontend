import {Component, OnInit} from '@angular/core';
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
    this.updateSimilarCourses();
  }

  private updateSimilarCourses() {
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

  resolveSelectMainCourse(table: HTMLTableSectionElement, courseForSelectIndex: number) {
    const nodeList = table.querySelectorAll('input[name="courseForMergeCheckbox"]');
    const elements = [] as HTMLInputElement[];
    for (const i = 0; i < nodeList.length; i++) {
      elements.push(nodeList.item(i));
    }
    elements.filter(value => Number(value.dataset.courseforselect) !== courseForSelectIndex)
      .forEach(value => {
        value.disabled = false;
        value.checked = true;
      });
    elements.filter(value => Number(value.dataset.courseforselect) === courseForSelectIndex)
      .forEach(value => {
        value.disabled = true;
        value.checked = false;
      });
  }

  merge(table: HTMLTableSectionElement) {
    const mainCourseId = (table.querySelector('input[type="radio"]:checked') as HTMLInputElement).dataset.courseid;
    const checkboxes = table.querySelectorAll('input[type="checkbox"]:checked') as NodeList<HTMLInputElement>;
    const mergeCourses: number[] = [];
    for (const i = 0; i < checkboxes.length; i++) {
      mergeCourses.push(+checkboxes.item(i).dataset.courseid);
    }
    const mergeStructure = {};
    mergeStructure[mainCourseId] = mergeCourses;
    this.administrationToolService.mergeSimilarCourses(mergeStructure)
      .subscribe(() => this.updateSimilarCourses())
  }

  updateMergeButtonState(event: MouseEvent) {
    const mergeButton = event.currentTarget
      .querySelector('button[name="merge-button"]') as HTMLButtonElement;
    const amountOfSelectedCourses = event.currentTarget
      .querySelectorAll('input[type=checkbox][name="courseForMergeCheckbox"]:checked')
      .length;
    mergeButton.disabled = amountOfSelectedCourses === 0;
  }
}
