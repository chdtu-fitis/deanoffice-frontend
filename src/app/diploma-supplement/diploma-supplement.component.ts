import { Component, OnInit } from '@angular/core';
import {Degree} from "../model/entity/Degree";
import {DegreeService} from "../model/service/degree.service";

@Component({
  selector: 'diploma-supplement',
  templateUrl: './diploma-supplement.component.html',
  styleUrls: ['./diploma-supplement.component.scss']
})
export class DiplomaSupplementComponent implements OnInit {
  degrees: Degree[];

  constructor(private degreeService: DegreeService) { }

  ngOnInit() {
    this.degrees = this.degreeService.getDegrees();
  }

}
