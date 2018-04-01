import { Component, OnInit } from '@angular/core';
import {Course} from '../../../models/Course';
import {KnowledgeControl} from '../../../models/KnowlegeControl';
import {CourseName} from '../../../models/CourseName';
import {CourseService} from '../../../services/course.service';

@Component({
  selector: 'course-creation',
  templateUrl: './course-creation.component.html',
  styleUrls: ['./course-creation.component.scss'],
  providers: [CourseService]
})
export class CourseCreationComponent implements OnInit {
  course: Course = new Course();
  knowledgeControl: KnowledgeControl;

  constructor(private courseService: CourseService) {
  }

  ngOnInit() {

  }

  createCourse(){
    this.courseService.createCourse(this.course).subscribe(() => {

    })
  }
}
