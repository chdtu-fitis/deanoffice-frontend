import {Component, OnInit} from '@angular/core';
import {StudentGroup} from '../../models/StudentGroup';
import {GroupService} from '../../services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  groups: StudentGroup[] = [];
  actualGroups: boolean | true;
  searchText: string;
  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.getActualGroups();
  }

  getActualGroups(): void {
    this.getGroups();
  }

  getAllGroups(): void {
    this.getGroups(false)
  }

  private getGroups(onlyActual: boolean = true): void {
    this.groupService.getGroups(onlyActual)
      .subscribe((groups: StudentGroup[]) => {
        this.groups = groups;
        this.actualGroups = onlyActual;
      });
  }
}
