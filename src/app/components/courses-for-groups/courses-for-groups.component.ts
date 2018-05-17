import {Component, OnInit, ViewChild} from '@angular/core';
import {StudentGroup} from '../../models/StudentGroup';
import {Course} from "../../models/Course";
import {GroupService} from "../../services/group.service";
import {CourseService} from "../../services/course.service";
import {CourseForGroup} from "../../models/CourseForGroup";
import {AddedCoursesComponent} from "./added-courses/added-courses.component";
import {CourseForGroupService} from "../../services/course-for-group.service";
import {Teacher} from "../../models/Teacher";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'courses-for-groups',
  templateUrl: './courses-for-groups.component.html',
  styleUrls: ['./courses-for-groups.component.scss'],
  providers: [CourseService, GroupService]
})
export class CoursesForGroupsComponent implements OnInit {
  indexForTeacher: number;
  indexForDate: number;
  groups: StudentGroup[];
  selectedGroup: StudentGroup;
  selectedSemester: number;
  semesters: number[] = [];
  courses: Course[];
  coursesForAdd: CourseForGroup[] = [];
  coursesForDelete: CourseForGroup[] = [];
  updatedCourses: CourseForGroup[] = [];
  selectedCourses: Course[];
  searchText = '';
  coursesForGroup: CourseForGroup[] = [];
  deleteCoursesIds: number[] = [];
  @ViewChild(AddedCoursesComponent) child: AddedCoursesComponent;
  studiedCoursesLoading = false;
  showPage = false;
  showTeacherDialog = false;
  showCopyDialog = false;
  alertOptions = {
    showProgressBar: false,
    timeOut: 5000,
    pauseOnHover: false,
    clickToClose: true,
    maxLength: 10,
    maxStack: 3
  };

  constructor(private courseService: CourseService, private courseForGroupService: CourseForGroupService, private groupService: GroupService, private _service: NotificationsService) {
  }

  ngOnInit() {
    this.groupService.getGroups().subscribe(groups => {
      this.groups = groups;
      this.showPage = true;
    })
  }

  private changeSemesters() {
    this.semesters = [];
    for (let i = 0; i < this.selectedGroup.studySemesters; i++) {
      this.semesters.push(i + 1);
    }
  }

  onGroupChange() {
    this.changeSemesters();
    this.coursesForDelete = [];
    this.child.coursesForGroupForDelete = [];
    this.deleteCoursesIds = [];
    this.coursesForAdd = [];
    this.updatedCourses = [];
    this.coursesForGroup = [];
    this.child.coursesForGroup = [];
    setTimeout(() => {
      if (this.selectedSemester) {
        this.child.getCoursesForGroup();
      }
    }, 0);
  }

  onSemesterChange() {
    this.studiedCoursesLoading = true;
    if (this.selectedSemester) {
      this.courseService.getCoursesBySemester(this.selectedSemester).subscribe(cfg => {
        this.courses = cfg;
        this.studiedCoursesLoading = false;
      })
    }
    setTimeout(() => {
      this.child.getCoursesForGroup();
    }, 0);
  }

  changeCoursesForGroup(event) {
    for (let i = 0; i < event.length; i++) {
      this.coursesForGroup.push(event[i])
    }
  }

  changeCoursesForDelete(event) {
    this.coursesForDelete = event;
  }

  deleteCoursesFromCoursesForGroups() {
    if (this.coursesForDelete){
      for (let deletedCourse of this.coursesForDelete) {
        for (let course of this.coursesForGroup) {
          if (deletedCourse.course.id == course.course.id && deletedCourse.id) {
            this.deleteCoursesIds.push(deletedCourse.id);
            this.coursesForGroup.splice(this.coursesForGroup.indexOf(course), 1);
            this.updatedCourses.splice(this.updatedCourses.indexOf(course), 1);
            this.child.coursesForGroup.splice(this.child.coursesForGroup.indexOf(course), 1);
          }
        }
        for (let addedCourse of this.coursesForAdd)
          if (addedCourse.course.id === deletedCourse.course.id) {
            this.coursesForGroup.splice(this.coursesForGroup.indexOf(addedCourse), 1);
            this.coursesForAdd.splice(this.coursesForAdd.indexOf(addedCourse), 1);
            this.child.coursesForGroup.splice(this.child.coursesForGroup.indexOf(addedCourse), 1);
          }
      }
      this.child.coursesForGroupForDelete = [];
      this.child.allRowsIsSelected = false;
      this.coursesForDelete = [];
    }
    else this.showErrorAlert('Предмети для видалення не були обрані');
  }

  changeSelectedCourses(event) {
    this.selectedCourses = event;
  }

  addCoursesToCoursesForGroup() {
    if (this.selectedCourses) {
      for (let course of this.selectedCourses) {
        let newCourseForGroup = this.transferCourseToCourseForGroup(course);
        let courseIsExist = false;
        if (this.coursesForGroup) {
          for (let courseForGroup of this.coursesForGroup) {
            if (newCourseForGroup.course.id === courseForGroup.course.id) {
              courseIsExist = true;
            }
          }
        }
        if (this.coursesForAdd) {
          let courseIsAdded = false;
          for (let courseForAdd of this.coursesForAdd) {
            if (newCourseForGroup.course.id === courseForAdd.course.id) {
              courseIsAdded = true;
            }
          }
          if (!courseIsAdded && !courseIsExist) {
            this.addCourse(true, newCourseForGroup);
          }
        }
        else if (!courseIsExist) {
          this.addCourse(true, newCourseForGroup);
        }
        if (courseIsExist) this.showErrorAlert('Предмет "' + course.courseName.name + '" не було додано, тому що він існує');
      }
    }
    else this.showErrorAlert('Предмети для призначення не були обрані');
  }

  addCourse(add: boolean, newCourseForGroup: CourseForGroup) {
    this.coursesForAdd.push(newCourseForGroup);
    this.coursesForGroup.push(newCourseForGroup);
    this.child.coursesForGroup.push(newCourseForGroup);
  }

  transferCourseToCourseForGroup(course: Course) {
    let newCourseForGroup = new CourseForGroup();
    let teacher = new Teacher();
    newCourseForGroup.course = course;
    newCourseForGroup.teacher = teacher;
    return newCourseForGroup;
  }

  showErrorAlert(alertString: String) {
    this._service.error(alertString,
      '',
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
      },
      error => {
        if (error.status === 422) {
          this.showErrorAlert('Предмет вже існує або дані введені невірно!');
        }
        else {
          this.showErrorAlert('Невідома помилка при сбереженні');
        }
      });
  }

  refresh() {
    this.coursesForDelete = [];
    this.child.coursesForGroupForDelete = [];
    this.deleteCoursesIds = [];
    this.coursesForAdd = [];
    this.child.coursesForGroup = [];
    this.updatedCourses = [];
    this.coursesForGroup = [];
    setTimeout(() => {
      this.onSemesterChange();
    }, 10);
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
    let isAdded: boolean;
    isAdded = false;
    if (event.show) {
      this.showTeacherDialog = event.show;
      this.indexForTeacher = event.index;
    }
    else {
      for (let updatedCourse of event) {
        if (event.indexOf(updatedCourse) == this.indexForTeacher) {
          for (let addedCourse of this.coursesForAdd) {
            if (updatedCourse.course.id === addedCourse.course.id) {
              addedCourse.teacher = updatedCourse.teacher;
              isAdded = true;
            }
          }
          if (!isAdded) this.updatedCourses.push(updatedCourse);
        }
      }
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
    this.showCopyDialog = true;
  }
}
