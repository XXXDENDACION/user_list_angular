import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAddComponent } from '../user-add/user-add.component';
import {User} from '../../models/user';
import {Role} from '../../models/role';
import { MatTable } from '@angular/material/table';



const ELEMENT_DATA: User[] = [
  {firstName: "Den", lastName: 'Wes', email: "test@test.ru", role: 'Art Manager', },
  {firstName: "Ivan", lastName: 'Wes', email: "test@test.ru", role: 'Art Manager',},
  {firstName: "Roma", lastName: 'Wes', email: "test@test.ru", role: 'Art Manager', },
  {firstName: "Alex", lastName: 'Wes', email: "test@test.ru", role: 'Art Manager',},
];

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
   @ViewChild(MatTable) table: MatTable<any>;
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
      ELEMENT_DATA.push(this.user);
      this.dataSource = ELEMENT_DATA;
      this.table.renderRows();
      }
    });
  }

  deleteUser(user: User) {
    if(confirm("Вы хотите удалить пользователя?")) {
      this.dataSource = this.dataSource.filter(item => {
        return item != user;
      });
    }
  }

}
