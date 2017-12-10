import { Component, OnInit } from '@angular/core';
import {Degree} from "../model/entity/Degree";
import {DegreeService} from "../model/service/degree.service";
import {GroupService} from "../model/service/group.service";
import {StudentGroup} from "../model/entity/StudentGroup";

@Component({
  selector: 'diploma-supplement',
  templateUrl: './diploma-supplement.component.html',
  styleUrls: ['./diploma-supplement.component.scss']
})
export class DiplomaSupplementComponent implements OnInit {
  degrees: Degree[];
  groups: StudentGroup[];

  constructor(private degreeService: DegreeService, private groupService: GroupService) { }

  ngOnInit() {
    this.degrees = this.degreeService.getDegrees();
  }

  onDegreeChange(degreeId: string): void {
    this.groups = this.groupService.getGroupsByDegree(degreeId);
  }

  onGroupChange(): void {

  }
}
