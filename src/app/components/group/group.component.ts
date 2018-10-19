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
  selectedGroups: StudentGroup[] = [];
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

  /**
   * handle click on checkbox in the table
   * params: $event.group [, $event.reset]
   */
  handleSelectedChange($event): void {
    if ($event.reset) {
      for (let i = 0; i < this.groups.length; i++) {
        this.groups[i].selected = false;
      }
    }
    $event.group.selected = !$event.group.selected;
    this.selectedGroups = this.getSelectedGroups();
  }

  getSelectedGroups() {
    const selectedGroups = [];
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].selected) {
        selectedGroups.push(this.groups[i]);
      }
    }
    return selectedGroups;
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
