import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {User} from '../../models/user';
import {Role} from '../../models/role';
import { MatTable } from '@angular/material/table';
import { UserUpdateComponent } from '../user-update/user-update.component';



let ELEMENT_DATA: User[] = [

];

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
   @ViewChild(MatTable) table: MatTable<any>;
   roles: Role[] = [
  
    {viewValue: 'Artist'},
    {viewValue: 'Designer'},
    {viewValue: 'Art Manager'}
];

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'items'];
  dataSource;
  value = '';
  selectedValue: string;
  user: User;
  
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getItemsFromLocal();
  }

  getItemsFromLocal() : void {
    ELEMENT_DATA = JSON.parse(localStorage.getItem('users'))
    this.dataSource = ELEMENT_DATA;
  }

  onAdd() : void {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      width: '800px',
      data: {user:{},str:"Add user"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      this.user = result;
      ELEMENT_DATA.push(this.user);
      localStorage.setItem('users', JSON.stringify(ELEMENT_DATA));
      this.dataSource = ELEMENT_DATA;
      this.table.renderRows();
      }
    });
  }

  onUpdate(user: User) : void {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      width: '800px',
      data: {user:user,str:"Update user"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
      ELEMENT_DATA.forEach((item,index)=>{
        if(item === user) {
          const ind = index;
          ELEMENT_DATA[ind] = result;
        }
      })
      localStorage.setItem('users', JSON.stringify(ELEMENT_DATA));
      this.dataSource = ELEMENT_DATA;
      this.table.renderRows();
      }
    });
  }

  deleteUser(user: User) {
    if(confirm("Вы хотите удалить пользователя?")) {
       ELEMENT_DATA = ELEMENT_DATA.filter(item => {
        return item != user;
      });
      localStorage.setItem('users', JSON.stringify(ELEMENT_DATA));
      this.dataSource = ELEMENT_DATA;

    }
  }

}
