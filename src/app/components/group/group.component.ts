import {Component, OnInit, ViewChild} from '@angular/core';
import {StudentGroup} from '../../models/StudentGroup';
import {GroupService} from '../../services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  @ViewChild('table') table;

  loadedGroups: StudentGroup[] = [];
  groups: StudentGroup[] = [];
  selectedGroups: StudentGroup[] = [];
  actualGroups = true;
  searchText: string;
  loadingGroups = true;
  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups(): void {
    this.selectedGroups = [];
    const onlyActual = false;
    this.loadingGroups = true;
    this.groupService.getGroups(onlyActual)
      .subscribe((loadedGroups: StudentGroup[]) => {
        this.loadedGroups = loadedGroups;
        this.loadingGroups = false;
        this.updateGroups()
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
