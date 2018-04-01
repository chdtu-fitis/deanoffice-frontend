import { Component, OnInit } from '@angular/core';
import {Course} from '../../../models/Course';
import {KnowledgeControl} from '../../../models/KnowlegeControl';
import {CourseName} from '../../../models/CourseName';
import {CourseService} from '../../../services/course.service';
import {KnowledgeControlService} from '../../../services/knowledge-control.service';

@Component({
  selector: 'course-creation',
  templateUrl: './course-creation.component.html',
  styleUrls: ['./course-creation.component.scss'],
  providers: [CourseService, KnowledgeControlService]
})
export class CourseCreationComponent implements OnInit {
  course: Course = new Course();
  knowledgeControl: KnowledgeControl[] = [];

  constructor(private courseService: CourseService, private knowledgeControlService: KnowledgeControlService) {
  }

  ngOnInit() {
    this.knowledgeControlService.getAll().subscribe(kc => {
      this.knowledgeControl = kc;
    })
  }

  createCourse(){
    this.courseService.createCourse(this.course).subscribe(() => {
    })
  }
}
