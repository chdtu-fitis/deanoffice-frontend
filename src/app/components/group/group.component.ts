import {Component, OnInit} from '@angular/core';
import {StudentGroup} from '../../models/StudentGroup';
import {GroupService} from '../../services/group.service';

@Component({
  selector: 'group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  groups: StudentGroup[] = [];

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.groupService.getGroups()
      .subscribe((groups: StudentGroup[]) => this.groups = groups);
  }


}
