import {Component, OnInit, ViewChild} from '@angular/core';

import {NotificationsService} from 'angular2-notifications';
import { BsModalService } from 'ngx-bootstrap/modal';

import {StudentGroup} from '../../models/StudentGroup';
import {Course} from '../../models/Course';
import {Teacher} from '../../models/Teacher';
import {CourseForGroup} from '../../models/CourseForGroup';
import {GroupService} from '../../services/group.service';
import {CourseService} from '../../services/course.service';
import {CourseForGroupService} from '../../services/course-for-group.service';
import {AddedCoursesComponent} from './added-courses/added-courses.component';
import {CourseCreationComponent} from './course-creation/course-creation.component';
import {CopyCoursesDialogComponent} from './copy-courses-dialog/copy-courses-dialog.component';
import {StudiedCoursesComponent} from './studied-courses/studied-courses.component';
import {TeacherDialogComponent} from './teacher-dialog/teacher-dialog.component';

@Component({
  selector: 'courses-for-groups',
  templateUrl: './courses-for-groups.component.html',
  styleUrls: ['./courses-for-groups.component.scss'],
  providers: [CourseService, GroupService]
})
export class CoursesForGroupsComponent implements OnInit {
  changesExistence = false;
  indexForDate: number;
  groups: StudentGroup[];
  selectedGroup: StudentGroup;
  selectedSemester: number;
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
  @ViewChild(AddedCoursesComponent) addedCoursesChild: AddedCoursesComponent;
  @ViewChild(StudiedCoursesComponent) studiedCoursesChild: StudiedCoursesComponent;
  @ViewChild(CourseCreationComponent) courseCreationChild: CourseCreationComponent;
  studiedCoursesLoading = false;
  showPage = false;
  alertOptions = {
    showProgressBar: false,
    timeOut: 5000,
    pauseOnHover: false,
    clickToClose: true,
    maxLength: 10,
    maxStack: 3
  };

  constructor(private courseService: CourseService,
              private courseForGroupService: CourseForGroupService,
              private groupService: GroupService,
              private _service: NotificationsService,
              private modalService: BsModalService) {}

  ngOnInit() {
    this.groupService.getGroups().subscribe(groups => {
      this.groups = groups;
      this.showPage = true;
    })
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
    setTimeout(() => {
      this.addedCoursesChild.getCoursesForGroup();
    }, 0);
  }

  onGroupChange() {
    this.changeSemesters();
    this.refresh();
    if (this.selectedSemester) {
      this.onSemesterChange();
    }
  }

  onSemesterChange() {
    this.studiedCoursesLoading = true;
    if (this.selectedSemester) {
      this.courseService.getCoursesBySemester(this.selectedSemester).subscribe(cfg => {
        this.courses = cfg;
        this.studiedCoursesLoading = false;
      })
    }
    this.getCoursesForGroup();
    this.courseCreationChild.course.semester = this.selectedSemester;
  }

  changeCoursesForGroup(event) {
    for (let i = 0; i < event.length; i++) {
      this.coursesForGroup.push(event[i])
    }
  }

  changeCoursesForDelete(event) {
    this.coursesForDelete = event;
  }

  checkAddedCoursesForDeleting() {
    for (let deletedCourse of this.coursesForDelete) {
      let coursesIsAdded = false;
      for (let addedCourse of this.coursesForAdd)
        if (addedCourse.course.id === deletedCourse.course.id) coursesIsAdded = true;
      this.deleteCourseFromCoursesForGroups(coursesIsAdded, deletedCourse);
    }
    this.changesExistence = true;
    this.addedCoursesChild.coursesForGroupForDelete = [];
    this.addedCoursesChild.allRowsIsSelected = false;
    this.coursesForDelete = [];
    this.sortCoursesForGroup();
  }

  private deleteCourseFromCoursesForGroups(courseIsAdded: boolean, deletedCourse){
    this.coursesForGroup.splice(this.coursesForGroup.indexOf(deletedCourse), 1);
    this.addedCoursesChild.coursesForGroup.splice(this.addedCoursesChild.coursesForGroup.indexOf(deletedCourse), 1);
    if (courseIsAdded){
      this.coursesForAdd.splice(this.coursesForAdd.indexOf(deletedCourse), 1);
    }
    else {
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
    for (let deletedCourseId of this.deleteCoursesIdsForCheck) {
      if (deletedCourseId === addedCourse.id) courseIsDeleted = true;
    }
    return courseIsDeleted;
  }

  addCoursesToCoursesForGroup() {
    for (let course of this.selectedCourses) {
      let newCourseForGroup = this.transferCourseToCourseForGroup(course);
      let courseIsExist = false;
      if (this.coursesForGroup.length) {
        for (let courseForGroup of this.coursesForGroup) {
          if (newCourseForGroup.course.id === courseForGroup.course.id) courseIsExist = true;
        }
      }
      if (this.coursesForAdd.length) {
        let courseIsAdded = false;
        for (let courseForAdd of this.coursesForAdd)
          if (newCourseForGroup.course.id === courseForAdd.course.id) courseIsAdded = true;
        if (!courseIsAdded && !courseIsExist)
          this.addCourse(newCourseForGroup, this.checkIfAddedCourseIsInDeleted(newCourseForGroup.course));
      } else if (!courseIsExist)
        this.addCourse(newCourseForGroup, this.checkIfAddedCourseIsInDeleted(newCourseForGroup.course));
      if (courseIsExist) this.showErrorAlert('Предмет "' + course.courseName.name + '" не було додано, тому що він існує');
    }
    this.sortCoursesForGroup();
    this.studiedCoursesChild.courses.forEach(course => course.selected = false);
    this.studiedCoursesChild.selectedCourses = [];
    this.selectedCourses = [];
  }

  sortCoursesForGroup() {
    this.addedCoursesChild.coursesForGroup.sort((a, b) => {
      if (a.course.courseName.name > b.course.courseName.name) return 1;
      if (a.course.courseName.name < b.course.courseName.name) return -1;
      return 0;
    })
  }

  addCourse(newCourseForGroup: CourseForGroup, isDeleted: boolean) {
    this.changesExistence = true;
    if (isDeleted) {
      let id = newCourseForGroup.id;
      this.deleteCoursesIds.splice(this.deleteCoursesIds.indexOf(id), 1)
    }
    else this.coursesForAdd.push(newCourseForGroup);
    this.coursesForGroup.push(newCourseForGroup);
    this.addedCoursesChild.coursesForGroup.push(newCourseForGroup);
  }

  transferCourseToCourseForGroup(course: Course) {
    let newCourseForGroup = new CourseForGroup();
    let teacher = new Teacher();
    newCourseForGroup.course = course;
    newCourseForGroup.teacher = teacher;
    return newCourseForGroup;
  }

  showErrorAlert(alertString: String) {
    this._service.error('Помилка',
      alertString,
      this.alertOptions);
  }

  saveCoursesForGroup() {

    class courseForGroupNewCoursesType {
      course: { id: number };
      teacher: { id: number };
      examDate: Date
    }

    class courseForGroupUpdateCoursesType {
      id: number;
      course: { id: number };
      teacher: { id: number };
      examDate: Date
    }

    let newCourses: courseForGroupNewCoursesType[] = [];
    let updatedCourses: courseForGroupUpdateCoursesType[] = [];
    for (let newCourse of this.coursesForAdd) {
      newCourses.push({
        course: {id: newCourse.course.id},
        teacher: {id: newCourse.teacher.id},
        examDate: newCourse.examDate
      })
    }
    for (let updateCourse of this.updatedCourses) {
      updatedCourses.push({
        id: updateCourse.id,
        course: {id: updateCourse.course.id},
        teacher: {id: updateCourse.teacher.id},
        examDate: updateCourse.examDate
      })
    }
    this.courseForGroupService.createCoursesForGroup(this.selectedGroup.id, {
      newCourses: newCourses,
      updatedCourses: updatedCourses,
      deleteCoursesIds: this.deleteCoursesIds
    }).subscribe(() => {
        this.refresh();
        setTimeout(() => {
          this.onSemesterChange();
        }, 10);
      },
      error => {
        if (error.status === 422) {
          this.showErrorAlert('Предмет вже існує або дані введені невірно!');
        } else {
          this.showErrorAlert('Невідома помилка при сбереженні');
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
      this.courseService.getCoursesBySemester(this.selectedSemester).subscribe(cfg => {
        this.courses = cfg;
        this.studiedCoursesLoading = false;
      })
    }
  }

  changeTeacher(event) {
    const initialState = {courseForGroups: event};
    const modalRef = this.modalService.show(TeacherDialogComponent, {initialState, class: 'modal-custom'});
    modalRef.content.onTeacherSelect.subscribe(($event) => {
      this.updateCoursesForGroupWithNewTeacher($event);
    });
  }

  updateCoursesForGroupWithNewTeacher(event) {
    let isAdded = false;
    for (let addedCourse of this.coursesForAdd) {
      if (event.course.id === addedCourse.course.id) {
        addedCourse.teacher = event.teacher;
        isAdded = true;
      }
    }
    if (!isAdded){
      this.changesExistence = true;
      this.updatedCourses.push(event);
    }
    for (let course of this.coursesForGroup) {
      if (course.course.id === event.course.id) course.teacher = event.teacher;
    }
  }

  changeDate(event) {
    let isAdded: boolean;
    isAdded = false;
    this.indexForDate = event.index;
    for (let course of this.coursesForGroup) {
      if (this.coursesForGroup.indexOf(course) == this.indexForDate) {
        for (let addedCourse of this.coursesForAdd) {
          if (course.course.id === addedCourse.course.id) {
            addedCourse.examDate = course.examDate;
            isAdded = true;
          }
        }
        if (!isAdded) {
          this.changesExistence = true;
          if (course.teacher == undefined) {
            let teacher = new Teacher();
            course.teacher = teacher;
          }
          this.updatedCourses.push(course);
        }
      }
    }
  }

  copyCourses() {
    this.changesExistence = true;
    const initialState = {groups: this.groups, selectedSemesterTo: this.selectedSemester,
      selectedSemesterFrom: this.selectedSemester, coursesForGroups: this.coursesForGroup};
    const bsModalRef = this.modalService.show(CopyCoursesDialogComponent, {initialState, class: 'modal-custom'});
    bsModalRef.content.copiedCourse.subscribe(($event) => {
      this.addCourse($event, this.checkIfAddedCourseIsInDeleted($event.course));
    });
    bsModalRef.content.alertMessage.subscribe(($event) => {
      this.showErrorAlert($event);
    });
  }
}
