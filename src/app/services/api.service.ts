import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
    constructor(private httpClient: HttpClient) {
    }

    getData(): object {
        const sum = 1 + 2;
        const res = `${sum} res`;
        return {res: res, status: true};
    }

}
