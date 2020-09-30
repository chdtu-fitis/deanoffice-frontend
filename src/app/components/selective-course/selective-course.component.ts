import {Component, OnInit} from "@angular/core";
import {SelectiveCourseService} from "../../services/selective-course.service";
import {SelectiveCourse} from "../../models/SelectiveCourse";

@Component({
  selector: 'selective-course',
  templateUrl: './selective-course.component.html',
  styleUrls: ['./selective-course.component.scss']
})

export class SelectiveCourseComponent implements OnInit {
  selectiveCourses: SelectiveCourse[];

  constructor(private selectiveCourseService: SelectiveCourseService) { }

  ngOnInit(): void {
    this.selectiveCourseService.getSelectiveCourses('2020').subscribe((selectiveCourses: SelectiveCourse[]) => {
      this.selectiveCourses = selectiveCourses;
    });
  }
}
