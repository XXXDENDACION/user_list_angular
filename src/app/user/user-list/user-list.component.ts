import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { MatTable } from '@angular/material/table';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { UserService } from '../../../shared/services/user.service';
import { SubscriptionLike, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [
    trigger('openClose', [
      state(
        'close',
        style({
          transform: 'translateX(100%)',
        })
      ),
      state(
        'open',
        style({
          transform: 'translateX(0%)',
        })
      ),
      transition('close=>open', [animate('0.5s')]),
      transition('open=>close', [animate('0.5s')]),
    ]),
  ],
})
export class UserListComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  roles: Role[] = [
    { viewValue: 'Artist' },
    { viewValue: 'Designer' },
    { viewValue: 'Art Manager' },
  ];
  subscriptions: SubscriptionLike[] = [];
  users: User[];
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'role',
    'items',
  ];
  dataSource;
  value = '';
  selectedValue: string;
  user: User;
  isOpen = false;
  error: string;
  isValid: boolean;

  constructor(private dialog: MatDialog, private userService: UserService) {}

  ngOnInit(): void {
    //this.getItemsFromLocal();
    this.getUsers();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

  getUsers(): void {
    this.subscriptions.push(
      this.userService
        .getUsers()
        .pipe(catchError((err) => of([])))
        .subscribe(
          (user) => {
            this.users = user;
            console.log(this.users);
          },
          (err) => {
            console.log(err);
          },
          () => {
            this.dataSource = this.users;
          }
        )
    );
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      width: '800px',
      data: { user: {} },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.subscriptions.push(
          this.userService
            .addUser(result)
            .pipe(
              catchError((err) => {
                console.log(
                  'Handling error locally and rethrowing it...',
                  err.message
                );
                return throwError(err);
              })
            )
            .subscribe(
              (res) => {
                console.log(res);
                this.isValid = true;
                this.error = 'User add!';
                this.isOpen = !this.isOpen;
                setTimeout(() => (this.isOpen = !this.isOpen), 2000);
              },
              (err) => {
                if (err.error.data) {
                  for (let item in err.error.data.errors) {
                    err.error.data.errors[item].forEach((msg) => {
                      this.error = msg;
                      this.isOpen = !this.isOpen;
                      setTimeout(() => (this.isOpen = !this.isOpen), 2000);
                    });
                  }
                } else {
                  this.isValid = true;
                  console.log(err);
                  this.error = err.message;
                  this.isValid = false;
                  this.isOpen = !this.isOpen;
                  setTimeout(() => (this.isOpen = !this.isOpen), 2000);
                }
              },
              () => this.getUsers()
            )
        );
      }
    });
  }

  onUpdate(user: User): void {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      width: '800px',
      data: { user: user },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        console.log(user);
        console.log(user._id);
        this.subscriptions.push(
          this.userService
            .updateUser(user._id, result)
            .pipe(
              catchError((err) => {
                console.log(
                  'Handling error locally and rethrowing it...',
                  err.message
                );
                return throwError(err);
              })
            )
            .subscribe(
              (res) => {
                console.log(res);
                this.isValid = true;
                this.error = 'User update!';
                this.isOpen = !this.isOpen;
                setTimeout(() => (this.isOpen = !this.isOpen), 2000);
              },
              (err) => {
                if (err.error.data) {
                  for (let item in err.error.data.errors) {
                    err.error.data.errors[item].forEach((msg) => {
                      this.error = msg;
                      this.isOpen = !this.isOpen;
                      setTimeout(() => (this.isOpen = !this.isOpen), 2000);
                    });
                  }
                } else {
                  this.isValid = true;
                  console.log(err);
                  this.error = err.message;
                  this.isValid = false;
                  this.isOpen = !this.isOpen;
                  setTimeout(() => (this.isOpen = !this.isOpen), 2000);
                }
              },
              () => this.getUsers()
            )
        );
      }
    });
  }

  deleteUser(user: User) {
    if (confirm('Вы хотите удалить пользователя?')) {
      this.subscriptions.push(
        this.userService.deleteUser(user._id).subscribe(
          (res) => {
            console.log(res);
            this.isValid = true;
            this.error = 'User delete!';
            this.isOpen = !this.isOpen;
            setTimeout(() => (this.isOpen = !this.isOpen), 2000);
          },
          (err) => {
            console.log(err);
            this.isValid = false;
            this.error = err.message;
            this.isOpen = !this.isOpen;
            setTimeout(() => (this.isOpen = !this.isOpen), 2000);
          },
          () => this.getUsers()
        )
      );
    }
  }
}
