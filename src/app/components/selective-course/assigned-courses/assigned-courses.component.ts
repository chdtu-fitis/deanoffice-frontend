import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {SelectiveCourse} from '../../../models/SelectiveCourse';
import {SelectiveCourseService} from '../../../services/selective-course.service';
import {TypeCycle} from '../../../models/TypeCycle';
import {EditDialogComponent} from '../edit-dialog/edit-dialog.component';
import {Subscription} from 'rxjs';
import {TableFilterOfNameAndTrainingCycleService} from '../../../services/tableFilterOfNameAndTrainingCycle';

@Component({
  selector: 'assigned-courses',
  templateUrl: './assigned-courses.component.html',
  styleUrls: ['./assigned-courses.component.scss']
})
export class AssignedCoursesComponent implements OnInit {
  @Input() studyYear: string;
  @Input() degreeId: number;
  @Input() semester: number;
  @Output() onSelectedAssignedCoursesChange = new EventEmitter();
  @Input() showEditButton = true;

  nameFilter: string = "";
  trainingCycleFilter: string = "";
  filterSubscription: Subscription;

  isWithYearParameters: boolean;

  typeCycle = TypeCycle;

  selectiveCourses: SelectiveCourse[] = [];
  selectedAssignedCourses: SelectiveCourse[] = [];
  isAllSelected = false;
  disqualifiedCourses: SelectiveCourse[] = [];

  constructor(private modalService: BsModalService,
              private selectiveCourseService: SelectiveCourseService,
              private tableFilterOfNameAndTrainingCycleService: TableFilterOfNameAndTrainingCycleService) {
    this.filterSubscription = tableFilterOfNameAndTrainingCycleService.newFilterAnnounced$.subscribe(
      newFilter => {
           this.nameFilter = newFilter[0];
           this.trainingCycleFilter = newFilter[1];
        });
  }

  ngOnInit() {
    this.load();
  }

  load(): void {
    if (this.studyYear && this.degreeId && this.semester) {
      if (this.isWithYearParameters) {
        this.selectiveCourseService.getSelectiveCoursesWithStudentsCount(this.studyYear, this.degreeId, this.semester, true)
          .subscribe((selectiveCourses: SelectiveCourse[]) => {
            this.initializeSelectiveCourses(selectiveCourses);
          })
      }
      else {
        this.selectiveCourseService.getSelectiveCourses(this.studyYear, this.degreeId, this.semester, true)
          .subscribe((selectiveCourses: SelectiveCourse[]) => {
            this.initializeSelectiveCourses(selectiveCourses);
          });
      }
    }
  }

  private initializeSelectiveCourses(selectiveCourses: SelectiveCourse[]): void {
    this.selectiveCourses = selectiveCourses;

    let isAllSelected = selectiveCourses.length > 0;
    const newSelection = [];

    this.selectiveCourses.forEach(item => {
      const i = this.selectedAssignedCourses.findIndex(selectedItem => item.id === selectedItem.id);
      if (i !== -1) {
        item.selected = true;
        newSelection.push(item);
      } else {
        isAllSelected = false;
      }
    });

    // TODO refactor this part
    // сортую selectiveCourses щоб спочатку виводити ті дисципліни, в яких available === true
    this.selectiveCourses.sort(function(x, y) {
      // true values first
      return (x.available === y.available) ? 0 : x.available ? -1 : 1;
      // false values first
      // return (x === y)? 0 : x? 1 : -1;
    });
    // You must return 0 when a and b both have the same value, -1 if a is true and 1 otherwise.
    this.disqualifiedCourses = this.selectiveCourses.filter(course => course.available === false);

    this.isAllSelected = isAllSelected;
    this.selectedAssignedCourses = newSelection;
    this.onSelectedAssignedCoursesChange.emit(this.selectedAssignedCourses);
  }

  changeAllIsSelected(): void {
    this.selectiveCourses.forEach(item => item.selected = this.isAllSelected);
    this.selectedAssignedCourses = this.isAllSelected ? this.selectiveCourses.slice() : [];
    this.onSelectedAssignedCoursesChange.emit(this.selectedAssignedCourses);
  }

  changeSelectedAssignedCourses(checked: boolean, selectedCourse: SelectiveCourse) {
    const i = this.selectedAssignedCourses.findIndex(item => item.id === selectedCourse.id);

    if (checked) {
      if (i === -1) {
        this.selectedAssignedCourses.push(selectedCourse);
      }
    } else {
      if (i !== -1) {
        this.selectedAssignedCourses.splice(i, 1);
      }
      this.isAllSelected = false;
    }

    this.onSelectedAssignedCoursesChange.emit(this.selectedAssignedCourses);
  }

  changeCourse(course) {
    const initialState = {
      selectiveCourse: course
    };

    const modalRef = this.modalService.show(EditDialogComponent, {initialState, class: 'modal-custom'});
    modalRef.content.onEdit.subscribe(() => {
      this.load();
    });
  }
}
