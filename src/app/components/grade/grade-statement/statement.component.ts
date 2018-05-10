import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {IAppModal} from '../../shared/modal.interface';

@Component({
    selector: 'app-grades-statement',
    templateUrl: './statement.component.html',
    styleUrls: ['./statement.component.scss']
})
export class StatementComponent implements OnInit, IAppModal {
    @ViewChild('modal') modal: ModalDirective;
    @Input() studentsDegree: any = [];
    @Input() courses = [];
    selectedCourseId = 0;

    ngOnInit() {
    }

    setCourse(courseId: number) {
        this.selectedCourseId = courseId;
    }

}
