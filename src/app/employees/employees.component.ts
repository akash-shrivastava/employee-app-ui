import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './employees.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employee= {
    id:0,
    firstName: "",
    lastName: "",
    jobTitleName: "",
    emailAddress: "",
    employeeCode: "",
    phoneNumber: "",
    region: "",
    dob: "",
  };
  sort = {
    id: true,
    name: true,
    jobTitle: true,
    email: true,
  }
  isEmployeeID:boolean= false;
  searchText:any;
  isSelected="Id";
  employeeData =[];
  currentPage = 1;
  numPages = 0;
  displayEmployeeData:any;
  updatedEmployeeData = {
    firstName: "",
    lastName: "",
    jobTitleName: "",
    emailAddress: "",
    phoneNumber: "",
    region: "",
    dob: "",
  }
  constructor(private employeesService: EmployeesService) { }

  ngOnInit(): void {
    this.getEmployeeData();
  }

  getEmployeeData() {
    this.employeesService.getEmployeesData().subscribe((response: any) => {
      this.employeeData = response[0];
      console.log(this.employeeData);
    });
  }

  createEmployee() {
    if(this.employee.id){
      this.employeesService.saveEmployeeData(this.employee).subscribe((response: any) => {
          console.log(response.status);
          this.getEmployeeData();
      },(err:any)=>{
          var tempEmployee= {
            id: this.employee.id,
            firstName: this.employee.firstName,
            lastName: this.employee.lastName,
            jobTitleName: this.employee.jobTitleName,
            emailAddress: this.employee.emailAddress,
            phoneNumber: this.employee.phoneNumber,
            employeeCode: `E${this.employee.id}`,
            region: this.employee.region,
            dob: this.employee.dob,
          };
            this.employeeData.push(tempEmployee);
          $('.closeModel').click();
      } 
      );
    }else{
      this.isEmployeeID=true;
    }

  }

  displayEmployee(index){
    var result = this.employeeData.filter(obj => {
      return obj.id === index
    })
    this.displayEmployeeData=result[0];
  }

  deleteEmployee(index){
    this.employeeData.splice(index,1);
  }

  displayUpdatedEmployee(index){
    var result = this.employeeData.filter(obj => {
      return obj.id === index
    })
    this.updatedEmployeeData=result[0];
  }

  updateEmployee(){
   this.employeeData.map(emp => {
     if(emp.id == this.displayEmployeeData.id){
       emp.firstName = this.updatedEmployeeData.firstName ? this.updatedEmployeeData.firstName : emp.firstName,
       emp.lastName = this.updatedEmployeeData.lastName ? this.updatedEmployeeData.lastName : emp.lastName,
       emp.jobTitleName = this.updatedEmployeeData.jobTitleName ? this.updatedEmployeeData.jobTitleName : emp.jobTitleName,
       emp.emailAddress = this.updatedEmployeeData.emailAddress ? this.updatedEmployeeData.emailAddress : emp.emailAddress,
       emp.phoneNumber = this.updatedEmployeeData.phoneNumber ? this.updatedEmployeeData.phoneNumber : emp.phoneNumber,
       emp.region = this.updatedEmployeeData.region ? this.updatedEmployeeData.region : emp.region,
       emp.dob = this.updatedEmployeeData.dob ? this.updatedEmployeeData.dob : emp.dob
     }
   })
   $('.closeModel').click();
  }

  empId(event){
    this.employee.id = event.target.value;
    this.isEmployeeID=false;
  }

  fname(event,flag){
    if(flag=== "C"){
      this.employee.firstName = event.target.value;
    }
    if(flag=== "U"){
      this.updatedEmployeeData.firstName = event.target.value;
    }
  }

  lname(event,flag){
    if(flag=== "C"){
      this.employee.lastName = event.target.value;
    }
    if(flag=== "U"){
      this.updatedEmployeeData.lastName = event.target.value;
    }
  }

  title(event,flag){
    if(flag=== "C"){
      this.employee.jobTitleName = event.target.value;
    }
    if(flag=== "U"){
      this.updatedEmployeeData.jobTitleName = event.target.value;
    }
  }

  email(event,flag){
    if(flag=== "C"){
      this.employee.emailAddress = event.target.value;
    }
    if(flag=== "U"){
      this.updatedEmployeeData.emailAddress = event.target.value;
    }
  }

  phoneNumber(event,flag){
    if(flag=== "C"){
      this.employee.phoneNumber = event.target.value;
    }
    if(flag=== "U"){
      this.updatedEmployeeData.phoneNumber = event.target.value;
    }
  }

  region(event,flag){
    if(flag=== "C"){
      this.employee.region = event.target.value;
    }
    if(flag=== "U"){
      this.updatedEmployeeData.region = event.target.value;
    }
  }

  dob(event,flag){
    if(flag=== "C"){
      this.employee.dob = event.target.value.split("-").reverse().join("/");;
    }
    if(flag=== "U"){
      this.updatedEmployeeData.dob = event.target.value.split("-").reverse().join("/");;
    }
    
  }

  selected(item){
    this.isSelected=item;
  }

  searchEmp(){
    let empData=[];
    if(this.searchText){
      if(this.isSelected==="Id"){
        this.employeeData.forEach(emp=>{
          if(emp.id == this.searchText.replace(/EM/g,'')){
            empData.push(emp);
          }
        })
      }
      if(this.isSelected==="Name"){
        this.employeeData.forEach(emp=>{
          let name = `${emp.firstName} ${emp.lastName}`;
          let searchName = name.toLowerCase();
          if(searchName.includes(this.searchText.toLowerCase())){
            empData.push(emp);
          }
        })
      }
      if(this.isSelected==="Job Title"){
        this.employeeData.forEach(emp=>{
          if(emp.jobTitleName === this.searchText){
            empData.push(emp);
          }
        })
      }
      if(this.isSelected==="Region"){
        this.employeeData.forEach(emp=>{
          if(emp.region === this.searchText){
            empData.push(emp);
          }
        })
      }
      if(this.isSelected==="Email"){
        this.employeeData.forEach(emp=>{
          if(emp.emailAddress === this.searchText){
            empData.push(emp);
          }
        })
      }
      if(empData.length>0){
        this.employeeData=empData;
      }
    }
  }

  sortByName(sortKey){
    if(sortKey==="name"){
      this.employeeData.sort((a,b) => {
        if(a.firstName < b.firstName) { return this.sort.name ? 1 : -1; }
        if(a.firstName > b.firstName) { return this.sort.name ? -1 : 1; } 
        return 0;
      })
    }
    if(sortKey==="id"){
      this.employeeData.sort((a,b) => {
        if(a.id < b.id)  { return this.sort.id ? 1 : -1; }
        if(a.id > b.id)  { return this.sort.id ? -1 : 1; }
        return 0;
      })
    }
    if(sortKey==="jobTitle"){
      this.employeeData.sort((a,b) => {
        if(a.jobTitleName < b.jobTitleName)  { return this.sort.jobTitle ? 1 : -1; }
        if(a.jobTitleName > b.jobTitleName)  { return this.sort.jobTitle ? -1 : 1; }
        return 0;
      })
    }
    if(sortKey==="email"){
      this.employeeData.sort((a,b) => {
        if(a.emailAddress < b.emailAddress)  { return this.sort.email ? 1 : -1; }
        if(a.emailAddress > b.emailAddress)  { return this.sort.email ? -1 : 1; }
        return 0;
      })
    }
  }
}
