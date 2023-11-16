import {Component, OnInit, ViewChild} from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';

import {StudentGroup} from '../../models/StudentGroup';
import {Course} from '../../models/Course';
import {Teacher} from '../../models/Teacher';
import {CourseForGroup} from '../../models/CourseForGroup';
import {GroupService} from '../../services/group.service';
import {CourseService} from '../../services/course.service';
import {CourseForGroupService} from '../../services/course-for-group.service';
import {AddedCoursesComponent} from './added-courses/added-courses.component';
import {CourseCreationComponent} from '../shared/courses-for/course-creation/course-creation.component';
import {CopyCoursesDialogComponent} from './copy-courses-dialog/copy-courses-dialog.component';
import {StudiedCoursesComponent} from '../shared/courses-for/studied-courses/studied-courses.component';
import {TeacherDialogComponent} from './teacher-dialog/teacher-dialog.component';
import {CurrentUserService} from '../../services/auth/current-user.service';
import {GroupsDifferentDialogComponent} from './groups-different-dialog/groups-different-dialog.component';
import {AlertsService} from '../shared/alerts/alerts.service';

@Component({
  selector: 'courses-for-groups',
  templateUrl: './courses-for-groups.component.html',
  styleUrls: ['./courses-for-groups.component.scss'],
  providers: [CourseService, GroupService]
})
export class CoursesForGroupsComponent implements OnInit {
  changesExistence = false;
  showAcademicDifference = false;
  groups: StudentGroup[];
  groupsForCopy: StudentGroup[];
  selectedGroup: StudentGroup;
  selectedSemester: number;
  selectedHoursPerCredit: number;
  hoursPerCreditCBDisabled = true;
  semesters: number[] = [];
  courses: Course[];
  coursesForAdd: CourseForGroup[] = [];
  coursesForDelete: CourseForGroup[] = [];
  updatedCourses: CourseForGroup[] = [];
  selectedCourses: Course[] = [];
  searchText = '';
  coursesForGroup: CourseForGroup[] = [];
  deleteCoursesIds: number[] = [];
  deleteCoursesIdsForCheck: number[] = [];
  @ViewChild(AddedCoursesComponent, { static: true }) addedCoursesChild: AddedCoursesComponent;
  @ViewChild(StudiedCoursesComponent, { static: false }) studiedCoursesChild: StudiedCoursesComponent;
  @ViewChild(CourseCreationComponent, { static: false }) courseCreationChild: CourseCreationComponent;
  @ViewChild(GroupsDifferentDialogComponent, { static: false }) groupsDifferentDialogComponent: GroupsDifferentDialogComponent;
  studiedCoursesLoading = false;
  showPage = false;

  constructor(private courseService: CourseService,
              private courseForGroupService: CourseForGroupService,
              private groupService: GroupService,
              private _alerts: AlertsService,
              private modalService: BsModalService,
              private currentUserService: CurrentUserService
              ) {}

  ngOnInit() {
    this.selectedHoursPerCredit = 30;
    this.groupService.getGroups().subscribe(groups => {
      this.groups = groups;
      this.showPage = true;
    });
    this.groupService.getGroupsForCopy().subscribe(groupsForCopy => {
      this.groupsForCopy = groupsForCopy;
    });
  }

  private changeSemesters() {
    this.semesters = [];
    for (let i = 0; i < this.selectedGroup.studySemesters; i++) {
      this.semesters.push(i + this.selectedGroup.beginYears * 2 - 1);
    }
    if (!this.semesters.includes(this.selectedSemester)) {
      this.selectedSemester = this.semesters[0];
    }
  }

  getCoursesForGroup() {
    this.addedCoursesChild.getCoursesForGroup(this.selectedGroup, this.selectedSemester, this.showAcademicDifference);
  }

  onGroupChange() {
    this.changeSemesters();
    this.refresh();
    if (this.selectedSemester) {
      this.onSemesterChange();
    }
    this.hoursPerCreditCBDisabled = false;
  }

  loadCoursesBySemester() {
    this.studiedCoursesLoading = true;
    this.courseService.getCoursesBySemesterAndHoursPerCredit(this.selectedSemester, this.selectedHoursPerCredit).subscribe(cfg => {
      this.courses = cfg;
      this.studiedCoursesLoading = false;
    });
  }

  onSemesterChange() {
    this.loadCoursesBySemester();
    this.getCoursesForGroup();
    this.courseCreationChild.form.controls.semester.setValue(this.selectedSemester);
  }

  onChangeHoursPerCredit() {
    this.loadCoursesBySemester();
    this.courseCreationChild.form.controls.hoursPerCredit.setValue(this.selectedHoursPerCredit);
  }

  changeCoursesForGroup(event: CourseForGroup[]) {
    this.coursesForGroup.push(...event);
    this.sortCoursesForGroup();
  }

  changeCoursesForDelete(event: CourseForGroup[]) {
    this.coursesForDelete = event;
  }

  checkAddedCoursesForDeleting() {
    for (const deletedCourse of this.coursesForDelete) {
      let coursesIsAdded = false;
      for (const addedCourse of this.coursesForAdd) {
        if (addedCourse.course.id === deletedCourse.course.id) {
          coursesIsAdded = true;
        }
      }
      this.deleteCourseFromCoursesForGroups(coursesIsAdded, deletedCourse);
    }
    this.changesExistence = true;
    this.addedCoursesChild.coursesForGroupForDelete = [];
    this.addedCoursesChild.allRowsIsSelected = false;
    this.coursesForDelete = [];
    this.sortCoursesForGroup();
  }

  private deleteCourseFromCoursesForGroups(courseIsAdded: boolean, deletedCourse) {
    this.coursesForGroup.splice(this.coursesForGroup.indexOf(deletedCourse), 1);
    this.addedCoursesChild.coursesForGroup.splice(this.addedCoursesChild.coursesForGroup.indexOf(deletedCourse), 1);
    this.addedCoursesChild.loadedCoursesForGroup.splice(this.addedCoursesChild.loadedCoursesForGroup.indexOf(deletedCourse), 1);
    if (courseIsAdded) {
      this.coursesForAdd.splice(this.coursesForAdd.indexOf(deletedCourse), 1);
    } else {
      this.deleteCoursesIds.push(deletedCourse.id);
      this.deleteCoursesIdsForCheck.push(deletedCourse.course.id);
      this.updatedCourses.splice(this.updatedCourses.indexOf(deletedCourse), 1);
    }
  }

  changeSelectedCourses(event) {
    this.selectedCourses = event;
  }

  checkIfAddedCourseIsInDeleted(addedCourse) {
    let courseIsDeleted = false;
    for (const deletedCourseId of this.deleteCoursesIdsForCheck) {
      if (deletedCourseId === addedCourse.id) {
        courseIsDeleted = true;
      }
    }
    return courseIsDeleted;
  }

  addCoursesToCoursesForGroup() {
    for (const course of this.selectedCourses) {
      const newCourseForGroup = this.transferCourseToCourseForGroup(course);
      let courseIsExist = false;
      if (this.coursesForGroup.length) {
        for (const courseForGroup of this.coursesForGroup) {
          if (newCourseForGroup.course.id === courseForGroup.course.id) {
            courseIsExist = true;
          }
        }
      }
      if (this.coursesForAdd.length) {
        let courseIsAdded = false;
        for (const courseForAdd of this.coursesForAdd) {
          if (newCourseForGroup.course.id === courseForAdd.course.id) {
            courseIsAdded = true;
          }
        }
        if (!courseIsAdded && !courseIsExist) {
          this.addCourse(newCourseForGroup, this.checkIfAddedCourseIsInDeleted(newCourseForGroup.course));
        }
      } else if (!courseIsExist) {
        this.addCourse(newCourseForGroup, this.checkIfAddedCourseIsInDeleted(newCourseForGroup.course));
      }
      if (courseIsExist) {
        this._alerts.showError({ body: `Предмет "${course.courseName.name}" вже призначено групі` });
      }
    }
    this.sortCoursesForGroup();
    this.studiedCoursesChild.courses.forEach(course => course.selected = false);
    this.studiedCoursesChild.selectedCourses = [];
    this.selectedCourses = [];
  }

  sortCoursesForGroup() {
    this.addedCoursesChild.coursesForGroup.sort((a, b) =>
      Number(b.academicDifference) - Number(a.academicDifference) ||
      a.course.knowledgeControl.id - b.course.knowledgeControl.id ||
      Number(a.course.courseName.name > b.course.courseName.name));
  }

  addCourse(newCourseForGroup: CourseForGroup, isDeleted: boolean) {
    this.changesExistence = true;
    newCourseForGroup.academicDifference = false;
    if (isDeleted) {
      const id = newCourseForGroup.id;
      this.deleteCoursesIds.splice(this.deleteCoursesIds.indexOf(id), 1)
    } else {
      this.coursesForAdd.push(newCourseForGroup);
    }
    this.coursesForGroup.push(newCourseForGroup);
    this.addedCoursesChild.coursesForGroup.push(newCourseForGroup);
    this.addedCoursesChild.loadedCoursesForGroup.push(newCourseForGroup);
  }

  transferCourseToCourseForGroup(course: Course) {
    const newCourseForGroup = new CourseForGroup();
    const teacher = new Teacher();
    newCourseForGroup.course = course;
    newCourseForGroup.teacher = teacher;
    return newCourseForGroup;
  }

  saveCoursesForGroup() {
    class courseForGroupNewCoursesType {
      course: { id: number };
      teacher: { id: number };
      examDate: Date;
      academicDifference: boolean;
    }

    class courseForGroupUpdateCoursesType {
      id: number;
      course: { id: number };
      teacher: { id: number };
      examDate: Date;
      academicDifference: boolean;
    }

    const newCourses: courseForGroupNewCoursesType[] = [];
    const updatedCourses: courseForGroupUpdateCoursesType[] = [];
    for (const newCourse of this.coursesForAdd) {
      newCourses.push({
        course: {id: newCourse.course.id},
        teacher: {id: newCourse.teacher.id},
        examDate: new Date(newCourse.examDate),
        academicDifference: newCourse.academicDifference
      })
    }
    for (const updateCourse of this.updatedCourses) {
      updatedCourses.push({
        id: updateCourse.id,
        course: {id: updateCourse.course.id},
        teacher: {id: updateCourse.teacher ? updateCourse.teacher.id : 0},
        examDate: new Date(updateCourse.examDate),
        academicDifference: updateCourse.academicDifference
      })
    }
    this.courseForGroupService.createCoursesForGroup(this.selectedGroup.id, {
      newCourses: newCourses,
      updatedCourses: updatedCourses,
      deleteCoursesIds: this.deleteCoursesIds
    }).subscribe(() => {
        this.refresh();
        this.onSemesterChange();
      },
      error => {
        if ( error.status === 422 ) {
          this._alerts.showError({ body: error.error });
        } else {
          this._alerts.showUnknownError();
        }
      });
    this.changesExistence = false;
  }

  refresh() {
    this.coursesForDelete = [];
    this.addedCoursesChild.coursesForGroupForDelete = [];
    this.deleteCoursesIds = [];
    this.deleteCoursesIdsForCheck = [];
    this.coursesForAdd = [];
    this.updatedCourses = [];
    this.coursesForGroup = [];
    this.addedCoursesChild.coursesForGroup = [];
    this.selectedCourses = [];
    this.studiedCoursesChild.selectedCourses = [];
    this.changesExistence = false;
  }

  onCourseCreation() {
    if (this.selectedSemester) {
      this.studiedCoursesLoading = true;
      this.courseService.getCoursesBySemesterAndHoursPerCredit(this.selectedSemester, this.selectedHoursPerCredit).subscribe(cfg => {
        this.courses = cfg;
        this.studiedCoursesLoading = false;
      })
    }
  }

  changeTeacher(event: CourseForGroup) {
    const initialState = {courseForGroup: event};
    const modalRef = this.modalService.show(TeacherDialogComponent, {initialState, class: 'modal-custom'});
    modalRef.content.onTeacherSelect.subscribe(($event) => {
      this.updateCoursesForGroupWithNewTeacher($event);
    });
  }

  courseForGroupUpdate(course: CourseForGroup, field: string) {
    const courseForAdd = this.coursesForAdd.find(courseForAdd => courseForAdd.course.id === course.course.id);
    if (courseForAdd) {
      courseForAdd[field] = course[field];
    } else {
      this.changesExistence = true;
      const isAlreadyUpdated = this.updatedCourses.some(updatedCourse => updatedCourse.id === course.id);
      if (!isAlreadyUpdated) {
        this.updatedCourses.push(course);
      }
    }
  }

  updateCoursesForGroupWithNewTeacher(event: CourseForGroup) {
    this.courseForGroupUpdate(event, 'teacher');
  }

  changeDate(event: CourseForGroup) {
    this.courseForGroupUpdate(event, 'examDate');
  }

  onAcademicDifferenceChange(event: CourseForGroup) {
    this.courseForGroupUpdate(event, 'academicDifference');
  }

  onShowAcademicDifference() {
    this.addedCoursesChild.filterByAcademicDifference(this.showAcademicDifference);
  }

  copyCourses() {
    this.changesExistence = true;
    const initialState = {groups: this.groupsForCopy, selectedSemesterTo: this.selectedSemester,
      selectedSemesterFrom: this.selectedSemester, coursesForGroups: this.coursesForGroup};
    const bsModalRef = this.modalService.show(CopyCoursesDialogComponent, {initialState, class: 'modal-custom'});
    bsModalRef.content.copiedCourse.subscribe(($event) => {
      this.addCourse($event, this.checkIfAddedCourseIsInDeleted($event.course));
    });
    bsModalRef.content.alertMessage.subscribe((message) => {
      this._alerts.showError({ body: message });
    });
  }

  showGroupsDifferencesInCourses(){
    this.changesExistence = true;
    const initialState = {};
    const bsModalRef = this.modalService.show(GroupsDifferentDialogComponent, {initialState, class: 'modal-custom'});
    // bsModalRef.content.showDifferents.subscribe(() => { });
  }
}
