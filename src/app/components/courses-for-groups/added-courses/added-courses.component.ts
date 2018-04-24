import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {CourseForGroup} from '../../../models/CourseForGroup';
import {StudentGroup} from '../../../models/StudentGroup';
import {CourseForGroupService} from '../../../services/course-for-group.service';

@Component({
  selector: 'added-courses',
  templateUrl: './added-courses.component.html',
  styleUrls: ['./added-courses.component.scss'],
  providers: [CourseForGroupService]
})
export class AddedCoursesComponent implements OnInit {

  coursesForGroup: CourseForGroup[] = [];
  coursesForGroupForDelete: CourseForGroup[] = [];
  @Input() selectedCoursesForGroups: CourseForGroup[];
  @Input() selectedGroup: StudentGroup;
  @Input() selectedSemester: number;
  @Output() onCoursesForDeleteChange = new EventEmitter();
  @Output() onCoursesForGroup = new EventEmitter();
  @Output() onTeacherChange = new EventEmitter();

  constructor(private courseForGroupService: CourseForGroupService) { }

  ngOnInit() {}

  parseToDate(timestamp: number) {
    if (timestamp==0||timestamp==undefined||timestamp==null) return "";
    else {
      let date = new Date(timestamp);
      let month = '' + (date.getMonth() + 1);
      let day = '' + date.getDate();
      let year = date.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [day, month, year].join('.');
    }
  }

  getNameWithInitials(surname:String, name:String, patronimic:String){
    if (surname==""||surname==undefined||surname==null) return "";
    else if (name==""||name==undefined||name==null) return new String(surname);
    else if (patronimic==""||patronimic==undefined||patronimic==null) return new String (surname+" "+name.substring(0, 1)+".");
    else return new String (surname+" "+name.substring(0, 1)+". "+patronimic.substring(0,1)+".");
  }

  getCoursesForGroup() {
    this.courseForGroupService.getCoursesForGroupAndSemester(this.selectedGroup.id, this.selectedSemester).subscribe(courses => {
      this.coursesForGroup = courses;
      this.onCoursesForGroup.emit(this.coursesForGroup);
    });
  }

  addNewCoursesForGroup(){
    for (let courseForAdd of this.selectedCoursesForGroups) {
      if (this.selectedCoursesForGroups.length > 0) {
        let courseIsAdded = false;
        for (let courseForGroup of this.coursesForGroup) {
          if (courseForGroup.course.id === courseForAdd.course.id) {
            courseIsAdded = true;
          }
        }
        if (!courseIsAdded) {
          this.coursesForGroup.push(courseForAdd);
        }
      }
      else this.coursesForGroup.push(courseForAdd);
    }
  }

  changeCoursesForDelete(checked: boolean, selectedCourse: CourseForGroup){
    if (!checked) {
      for (let course of this.coursesForGroupForDelete)
        if (course.id === selectedCourse.id) {
          this.coursesForGroupForDelete.splice(this.coursesForGroupForDelete.indexOf(course), 1);
        }
    }
    else {
      this.coursesForGroupForDelete.push(selectedCourse);
    }
    this.onCoursesForDeleteChange.emit(this.coursesForGroupForDelete);
  }

  changeTeacher(index){
    this.onTeacherChange.emit({show: true, index: index});
  }
}
