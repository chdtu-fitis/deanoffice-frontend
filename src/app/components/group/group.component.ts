import {Component, OnInit, ViewChild} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';
import {GridReadyEvent, ModelUpdatedEvent, SelectionChangedEvent} from 'ag-grid-community'

import {StudentGroup} from '../../models/StudentGroup';
import {GroupService} from '../../services/group.service';
import {TuitionTerm} from '../../models/tuition-term.enum';
import {TuitionForm} from '../../models/tuition-form.enum';
import {Specialization} from '../../models/Specialization';
import {SpecializationService} from '../../services/specialization.service';
import {COLUMN_DEFINITIONS} from './columns-def';
import {DEFAULT_COLUMN_DEFINITIONS, LOCALE_TEXT} from '../shared/constant';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  @ViewChild('table') table;
  @ViewChild('addGroupModal') addGroupModal;

  groups: StudentGroup[] = [];
  selectedGroups: StudentGroup[] = [];
  active = true;
  searchText: string;
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

  count;
  defaultColDef = DEFAULT_COLUMN_DEFINITIONS;
  columnDefs = COLUMN_DEFINITIONS;
  localeText = LOCALE_TEXT;
  gridApi;
  private gridColumnApi;
  getRowNodeId = (data) => data.id;

  constructor(
    private groupService: GroupService,
    private notificationsService: NotificationsService,
    private specializationService: SpecializationService) {
  }


  onColumnResized() {
    this.gridApi.resetRowHeights();
  }

  ngOnInit() {
    this.specializationService.getSpecializations(true).subscribe(
      (specializations: Specialization[]) => this.specializations = specializations,
      null,
      () => {
        this.addGroupModal.form.form.controls.specialization.setValue(this.specializations[0].id);
      }
    );

    this.tuitionFormsKeys = Object.keys(TuitionForm);
    this.tuitionForms = this.tuitionFormsKeys.map(key => TuitionForm[key]);
    this.tuitionTermsKeys = Object.keys(TuitionTerm);
    this.tuitionTerms = this.tuitionTermsKeys.map(key => TuitionTerm[key]);

    this.loadGroups();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }

  onModelUpdated(params: ModelUpdatedEvent) {
    this.count = params.api.getDisplayedRowCount();
  }

  onSelectionChanged(event: SelectionChangedEvent) {
    this.selectedGroups = event.api.getSelectedRows();
  }

  showErrorAlert(event) {
    this.notificationsService.error('Помилка',
      event.message,
      this.alertOptions);
  }

  loadGroups(active: boolean = true) {
    this.selectedGroups = [];
    this.groupService.getGroups(active)
      .subscribe((groups: StudentGroup[]) => {
        return this.groups = groups;
      });
  }

  onAddGroup(group: StudentGroup) {
    this.gridApi.updateRowData({ add: [group], addIndex: 0 });
  }

  onUpdateGroup(updatedGroup: StudentGroup) {
    const rowNode = this.gridApi.getRowNode(this.selectedGroups[0].id);
    rowNode.setData(updatedGroup);
  }

  onDeleteGroup(deletedGroups: StudentGroup[]) {
    const deletedGroupsIds = deletedGroups.map(group => group.id);
    const groupsForRemove = this.selectedGroups.filter(group => deletedGroupsIds.includes(group.id));
    this.gridApi.updateRowData({ remove: groupsForRemove });

    for (const selectedGroup of this.selectedGroups) {
      if (!deletedGroupsIds.includes(selectedGroup.id)) {
        const message = {message: `Неможливе видалення групи ${selectedGroup.name} <br>(в групі є студенти)`};
        this.showErrorAlert(message);
      }
    }
  }

}
