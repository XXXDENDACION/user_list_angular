import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAddComponent } from '../user-add/user-add.component';
import {User} from '../../models/user';
import {Role} from '../../models/role';



const ELEMENT_DATA: User[] = [
  {firstName: "Den", lastName: 'Wes', email: "test@test.ru", role: 'Art Manager', },
  {firstName: "Den", lastName: 'Wes', email: "test@test.ru", role: 'Art Manager',},
  {firstName: "Den", lastName: 'Wes', email: "test@test.ru", role: 'Art Manager', },
  {firstName: "Den", lastName: 'Wes', email: "test@test.ru", role: 'Art Manager',},
];

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
   roles: Role[] = [
  
    {value:"artist",viewValue: 'Artist'},
    {value:"designer",viewValue: 'Designer'},
    {value:"artManager",viewValue: 'Art manager'}
];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'items'];
  dataSource = ELEMENT_DATA;
  value = '';
  selectedValue: string;
  user: User;
  
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onAdd() : void {
    const dialogRef = this.dialog.open(UserAddComponent, {
      width: '800px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      this.user = result;
      console.log(this.user);
      }
    });
  }

}
