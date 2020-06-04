import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmployeesService {
    constructor(private http: HttpClient) { }

    getEmployeesData(){
        return this.http.get('https://my-json-server.typicode.com/darshanp40/employeedb/employees');
    }

    saveEmployeeData(employeeData){
        return this.http.post('https://my-json-server.typicode.com/darshanp40/employeedb/employees/'+ employeeData.id, employeeData);
    }
}