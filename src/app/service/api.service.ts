import {Injectable} from '@angular/core';

@Injectable()
export class ApiService {

    constructor() {
    }

    getData(): object {
        const sum = 1 + 2;
        const res = `${sum} sdfs`;
        return {res: res, status: true};
    }

}
