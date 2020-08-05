import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  items: string
}

interface Food {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {firstName: "Den", lastName: 'Wes', email: "test@test.ru", role: 'Art Manager', items: ''},
  {firstName: "Den", lastName: 'Wes', email: "test@test.ru", role: 'Art Manager', items: ''},
  {firstName: "Den", lastName: 'Wes', email: "test@test.ru", role: 'Art Manager', items: ''},
  {firstName: "Den", lastName: 'Wes', email: "test@test.ru", role: 'Art Manager', items: ''},
];

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'items'];
  dataSource = ELEMENT_DATA;
  value = 'Clear me';
  selectedValue: string;
  constructor() { }

  ngOnInit(): void {
  }

}
