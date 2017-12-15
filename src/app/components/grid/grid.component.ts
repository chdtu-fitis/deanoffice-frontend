import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../service/api.service';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css'],
    providers: [ApiService]
})
export class GridComponent implements OnInit {

    public title = 'hello';

    constructor(public apiService: ApiService) {
    }

    ngOnInit() {
    }

    getData() {
        this.title = this.apiService.getData()['res'];
    }

}
