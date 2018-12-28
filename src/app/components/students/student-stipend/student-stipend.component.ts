import { Component, OnInit } from '@angular/core';
import {StudentService} from "../../../services/student.service";
import {StudentStipendService} from "../../../services/student-stipend.service";
import {StudentStipendInfo} from "../../../models/student-stipend/StudentStipendInfo";

@Component({
  selector: 'app-student-stipend',
  templateUrl: './student-stipend.component.html',
  styleUrls: ['./student-stipend.component.scss']
})
export class StudentStipendComponent implements OnInit {
  studentStipendInfo: StudentStipendInfo[];

  constructor(private studentStipendService: StudentStipendService) {
  }

  ngOnInit() {
     this.studentStipendService.getStudentsStipendInfo().subscribe((studentStipendInfo: StudentStipendInfo[]) => {
       this.studentStipendInfo = studentStipendInfo;
    });
  }

}
