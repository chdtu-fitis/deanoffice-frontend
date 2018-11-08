import {Component, OnInit, ViewChild} from '@angular/core';
import {StudentGroup} from '../../models/StudentGroup';
import {GroupService} from '../../services/group.service';
import {NotificationsService} from 'angular2-notifications';
import {TuitionTerm} from '../../models/tuition-term.enum';
import {TuitionForm} from '../../models/tuition-form.enum';
import {Specialization} from '../../models/Specialization';
import {SpecializationService} from '../../services/specialization.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  @ViewChild('table') table;
  @ViewChild('addGroup') addGroup;

  loadedGroups: StudentGroup[] = [];
  groups: StudentGroup[] = [];
  selectedGroups: StudentGroup[] = [];
  actualGroups = true;
  searchText: string;
  loadingGroups = true;
  alertOptions = {
    showProgressBar: false,
    timeOut: 50000,
    pauseOnHover: false,
    clickToClose: true,
    maxLength: 10,
    maxStack: 3
  };

  specializations: Specialization[];

  tuitionForms;
  tuitionFormsKeys;

  tuitionTerms;
  tuitionTermsKeys;

  constructor(
    private groupService: GroupService,
    private notificationsService: NotificationsService,
    private specializationService: SpecializationService) { }

  ngOnInit() {
    this.specializationService.getSpecializations(true).subscribe(
      (specializations: Specialization[]) => this.specializations = specializations,
      null,
      () => {
        this.addGroup.form.form.controls.specialization.setValue(this.specializations[0].id);
      }
    );

    this.tuitionFormsKeys = Object.keys(TuitionForm);
    this.tuitionForms = this.tuitionFormsKeys.map(key => TuitionForm[key]);
    this.tuitionTermsKeys = Object.keys(TuitionTerm);
    this.tuitionTerms = this.tuitionTermsKeys.map(key => TuitionTerm[key]);

    this.loadGroups();
  }

  showErrorAlert($event) {
    this.notificationsService.error('Помилка',
      $event.message,
      this.alertOptions);
  }

  loadGroups(): void {
    this.selectedGroups = [];
    const onlyActual = false;
    this.loadingGroups = true;
    this.groupService.getGroups(onlyActual)
      .subscribe((loadedGroups: StudentGroup[]) => {
        this.loadedGroups = loadedGroups;
        this.loadingGroups = false;
        this.updateGroups();
      });
  }

  updateGroups(): void {
    this.groups = this.loadedGroups.filter((item) => {
      if (this.actualGroups && !item.active) {
        return false;
      }
      if (this.searchText) {
        if (!item.name.includes(this.searchText)) {
          return false;
        }
      }
      return true;
    });
    this.deselectGroups();
    this.table.updateTable(this.groups);
  }

  /**
   * handle click on checkbox in the table
   * params: $event.group [, $event.reset]
   */
  handleSelectedChange($event): void {
    if ($event.reset) {
      for (let i = 0; i < this.groups.length; i++) {
        if (this.groups[i] !== $event.group) {
          this.groups[i].selected = false;
        }
      }
    }
    $event.group.selected = !$event.group.selected;
    this.updateSelectedGroups();
  }

  updateSelectedGroups(): void {
    const selectedGroups = [];
    for (let i = 0; i < this.groups.length; i++) {
      if (this.groups[i].selected) {
        selectedGroups.push(this.groups[i]);
      }
    }
    this.selectedGroups = selectedGroups;
  }

  deselectGroups() {
    for (let i = 0; i < this.groups.length; i++) {
      this.deselectGroup(this.groups[i]);
    }
  }

  deselectGroup(group) {
    group.selected = false;
    const index = this.selectedGroups.indexOf(group);
    if (index > -1) {
      this.selectedGroups.splice(index, 1);
    }
  }

}
