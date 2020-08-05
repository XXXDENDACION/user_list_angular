import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  items: string
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
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'items'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
