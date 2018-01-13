import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.css'],
    providers: [ApiService]
})
export class GridComponent implements OnInit {

    rows = [
        { name: 'Austin', gender: 'Male', company: 'Swimlane' },
        { name: 'Dany', gender: 'Male', company: 'KFC' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
    ];
    columns = [
        { prop: 'name' },
        { name: 'Gender' },
        { name: 'Company' }
    ];

    constructor(public apiService: ApiService) {
    }

    ngOnInit() {
    }

    getData() {
        // this.title = this.apiService.getData()['res'];
    }

}
