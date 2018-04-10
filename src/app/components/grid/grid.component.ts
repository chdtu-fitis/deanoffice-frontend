import { Component } from '@angular/core';

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent {
    buttonText = 'Показати неактуальні';
    isActual = true;
    selected = [];
    rows = [
        {name: 'Austin', secret: 'Male', company: 'Swimlane'},
        {name: 'Dany', secret: 'Male', company: 'KFC'},
        {name: 'Molly', secret: 'Female', company: 'Burger King'}
    ];
    columns = [
        {name: 'Шифр', prop: 'secret'},
        {name: 'Назва', prop: 'name'},
        {name: 'Назва Англійською', prop: 'company'},
        {name: 'Галузь Знань', prop: 'company'},
        {name: 'Галузь Знань Англійською', prop: 'company'}
    ];

    onSelect({selected}) {
        console.log('Select Event', selected, this.selected);

        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }

    actual() {
        this.isActual = !this.isActual;
        this.buttonText = this.isActual ? 'Показати неактуальні' : 'Показати актуальні';
    }

}
