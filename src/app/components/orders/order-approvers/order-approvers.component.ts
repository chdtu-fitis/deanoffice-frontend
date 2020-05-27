import { Component, OnInit } from '@angular/core';
import {OrderApproversService} from "../../../services/order-approvers.service";
import {OrderApprover} from "../../../models/order/OrderApprover";
import {Observable} from "rxjs";


@Component({
  selector: 'order-approvers',
  templateUrl: './order-approvers.component.html',
  styleUrls: ['./order-approvers.component.scss']
})
export class OrderApproversComponent implements OnInit {
  universityApprovers: OrderApprover[];
  facultyApprovers: OrderApprover[];
  active: boolean = true;

  constructor(private orderApproversService: OrderApproversService) { }

  ngOnInit() {
    this.orderApproversService.getApprovers().subscribe(approvers=> {
      this.universityApprovers = [];
      this.facultyApprovers = [];
      for (let approver of approvers) {
        if (approver.faculty === null) {
          this.universityApprovers.push(approver);
        } else {
          this.facultyApprovers.push(approver);
        }
      }
    });
  }

  onCreateOrderApprover(approver: OrderApprover) {
    this.facultyApprovers.push(approver);
  }

  removeOrder(id: number) {
    this.orderApproversService.deleteApprover(id).subscribe(() =>{
      let deleteIndex = this.facultyApprovers.findIndex(approver => approver.id == id );
      this.facultyApprovers.splice(deleteIndex, 1);
    });
  }
}

// columnDefs = [
//   {headerName: "Прізвище", field: "surname", sortable: true, filter: true},
//   {headerName: "Імя", field: "name", sortable: true, filter: true},
//   {headerName: "По батькові", field: "patronymic", sortable: true, filter: true},
//   {headerName: "Кафедра", field: "department", sortable: true, filter: true},
//   {headerName: "Посада", field: "position", sortable: true, filter: true}
// ];
//
// rowData = [
//   {surname: "Pogor", name:"Vladyslav", patronymic:"Vladymirovich", department: "IT", position: "BigdBoss" },
//   {surname: "", name:"", patronymic:"", department: "", position: "" },
//   {surname: "", name:"", patronymic:"", department: "", position: "" },
//   {surname: "", name:"", patronymic:"", department: "", position: "" },
//   {surname: "", name:"", patronymic:"", department: "", position: "" }
// ];
