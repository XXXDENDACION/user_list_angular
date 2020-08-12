import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { MatTable } from '@angular/material/table';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { UserService } from '../../../shared/services/user.service';
import { SubscriptionLike, of, throwError, range, timer, Subject } from 'rxjs';
import {
  catchError,
  windowCount,
  mergeAll,
  bufferCount,
  tap,
  takeUntil,
  take,
  debounceTime,
} from 'rxjs/operators';
import { RolesService } from 'src/shared/services/roles.service';
import { PopUpService } from 'src/shared/services/popup.service';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable) table: MatTable<any>;
  roles;
  searchRoles;
  private inputChanged: Subject<string> = new Subject<string>();
  private unsubscribe$ = new Subject();
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
  selectedValue:string =  "All";
  user: User;
  isOpen = false;
  error: string;
  isValid: boolean;
  isLoad: boolean = false;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private rolesService: RolesService,
    private popUpService: PopUpService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
    this.getEvent();
    //this.testFunc();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getRoles(): void {
    this.isLoad = false;
    this.rolesService
      .getRoles()
      .pipe(
        tap(
          (res) => {
            console.log(res);
            this.roles = res;
            this.searchRoles = res;
            this.isLoad = !this.isLoad;
          },
          (err) => {
            this.popUpService.setData(this.isValid, !this.isOpen, err.message);
            return throwError(err);
          },
          () => this.searchRoles.unshift({viewValue: 'All'})
        ),
        takeUntil(this.unsubscribe$)
      )

      .subscribe();
  }


  getEvent() {
    this.inputChanged
    .pipe(
      debounceTime(1000),
      takeUntil(this.unsubscribe$)
    )
    .subscribe(() => this.getUsers());
  }

  getWaitToInvoke() : void {
    this.inputChanged.next()
  }

  getUsers(): void {
    this.userService
      .getUsers(this.selectedValue, this.value)
      .pipe(
        tap(
          (res) => {
            this.users = res;
          },
          (err) => {
            this.popUpService.setData(this.isValid, !this.isOpen, err.message);
            return throwError(err);
          },
          () => {
            this.dataSource = this.users;
          }
        ),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      width: '800px',
      data: { user: {}, roles: this.roles },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService
          .addUser(result)
          .pipe(
            tap(
              (res) => {
                this.popUpService.setData(
                  !this.isValid,
                  !this.isOpen,
                  'User add!'
                );
              },
              (err) => {
                if (err.error.data) {
                  for (let item in err.error.data.errors) {
                    err.error.data.errors[item].forEach((msg) => {
                      this.popUpService.setData(
                        this.isValid,
                        !this.isOpen,
                        msg
                      );
                    });
                  }
                }
                return throwError(err);
              },
              () => this.getUsers()
            ),
            takeUntil(this.unsubscribe$)
          )
          .subscribe();
      }
    });
  }

  onUpdate(user: User): void {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      width: '800px',
      data: { user: user, roles: this.roles },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService
          .updateUser(user._id, result)
          .pipe(
            tap(
              (res) => {
                this.popUpService.setData(
                  !this.isValid,
                  !this.isOpen,
                  'User update!'
                );
              },
              (err) => {
                if (err.error.data) {
                  for (let item in err.error.data.errors) {
                    err.error.data.errors[item].forEach((msg) => {
                      this.popUpService.setData(false, !this.isOpen, msg);
                    });
                  }
                } else {
                  this.popUpService.setData(false, !this.isOpen, err.message);
                }
              },
              () => this.getUsers()
            ),
            takeUntil(this.unsubscribe$)
          )
          .subscribe();
      }
    });
  }

  deleteUser(user: User) {
    if (confirm('Вы хотите удалить пользователя?')) {
      this.userService
        .deleteUser(user._id)
        .pipe(
          tap(
            (res) => {
              this.popUpService.setData(true, !this.isOpen, 'User delete!');
            },
            (err) => {
              this.popUpService.setData(false, !this.isOpen, err.message);
            },
            () => this.getUsers()
          ),
          takeUntil(this.unsubscribe$)
        )
        .subscribe();
    }
  }
  testFunc(): void {
    const numbers$ = timer(1000, 1000);
    numbers$.subscribe((x) => console.log(x));
    const result$ = numbers$.pipe(bufferCount(10));
    result$.subscribe((x) => console.log(x));
  }
}
