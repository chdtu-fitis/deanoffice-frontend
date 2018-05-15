import {Component, OnInit} from '@angular/core';
import {StudentGroup} from '../../models/StudentGroup';
import {GroupService} from '../../services/group.service';
import {TuitionTerm} from '../../models/tuition-term.enum';
import {TuitionForm} from '../../models/tuition-form.enum';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  groups: StudentGroup[] = [];
  actualGroups: boolean | true;
  searchText: string;
  loadingGroups = true;
  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.getGroups();
  }

  getGroups(onlyActual: boolean = true): void {
    this.loadingGroups = true;
    this.groupService.getGroups(onlyActual)
      .subscribe((groups: StudentGroup[]) => {
        this.groups = groups;
        this.actualGroups = onlyActual;
        this.loadingGroups = false;
        this.setTuitionForm();
        this.setTuitionTerm();
      });
  }

  setTuitionForm() {
    this.groups.map(group => {
      group.tuitionForm = this.translateTuitionForm(group.tuitionForm);
      return group;
    })
  }
  setTuitionTerm() {
    this.groups.map(group => {
      group.tuitionTerm = this.translateTuitionTerm(group.tuitionTerm);
      return group;
    })
  }

  private translateTuitionForm(form: TuitionForm) {
    return TuitionForm[form];
  }

  private translateTuitionTerm(term: TuitionTerm) {
    return TuitionTerm[term];
  }

}
