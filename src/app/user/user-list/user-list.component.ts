import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/shared/models/user';
import { MatTable } from '@angular/material/table';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { UserService } from '../../../shared/services/user.service';
import {
  SubscriptionLike,
  of,
  throwError,
  range,
  timer,
  Subject,
  Observable,
} from 'rxjs';
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
import { UserState } from 'src/shared/store/reducers/user.reducer';
import { Store, select } from '@ngrx/store';
import {
  UserGetActionSucces,
  UserReloadAction,
  UserAddActionCall,
  UserUpdateActionCall,
  UserDeleteActionCall,
} from 'src/shared/store/actions/user.actions';
import {
  selectUsers,
  selectUser,
} from '../../../shared/store/selectors/user.selectors';
import { Role } from 'src/shared/models/role';
import { selectRoles } from '../../../shared/store/selectors/role.selectors'
import { RoleGetActionCall } from 'src/shared/store/actions/role.actions';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  @ViewChild(MatTable) table: MatTable<any>;
  roles;
  searchRoles;
  public getUsers$: Observable<User[]> = this.store$.pipe(select(selectUsers));
  public getRoles$: Observable<Role[]> = this.store$.pipe(select(selectRoles));
  //public createUser$: Observable<User> = this.store$.pipe(select(selectUser));
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
  selectedValue: string = 'All';
  user: User;
  isOpen = false;
  error: string;
  isValid: boolean;
  isLoad: boolean = false;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private rolesService: RolesService,
    private popUpService: PopUpService,
    private store$: Store<UserState>
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
    this.store$.dispatch(RoleGetActionCall({}));
    this.getRoles$
    .pipe(
      tap(
        (res) => {
          console.log(res);
          this.roles = res;
            this.searchRoles = [...res];
            this.isLoad = !this.isLoad;
        },
        (err) => console.log(err),
        () => {
          
          this.searchRoles.unshift({ viewValue: 'All' });
        }
      ),takeUntil(this.unsubscribe$)
    ).subscribe()
    
    this.rolesService
      .getRoles()
      .pipe(
        tap(
          (res) => {
            console.log(res);
            this.roles = res;
            this.searchRoles = [...res];
            this.isLoad = !this.isLoad;
          },
          (err) => {
            this.popUpService.setData(this.isValid, !this.isOpen, err.message);
            return throwError(err);
          },
          () => {
            this.searchRoles.unshift({ viewValue: 'All' });
          }
        ),
        takeUntil(this.unsubscribe$)
      )

      .subscribe();
  }

  getEvent() {
    this.inputChanged
      .pipe(debounceTime(1000), takeUntil(this.unsubscribe$))
      .subscribe(() => this.getUsers());
  }

  getWaitToInvoke(): void {
    this.inputChanged.next();
  }

  getUsers(): void {
    const searchData = {
      selectedValue: this.selectedValue,
      value: this.value,
    };

    this.store$.dispatch(UserReloadAction({ searchData }));
    this.getUsers$
      .pipe(
        tap(
          (res) => (this.dataSource = res),
          (err) =>
            this.popUpService.setData(this.isValid, !this.isOpen, err.message)
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
        console.log("UserListComponent -> onAdd -> result", result)
        this.store$.dispatch(UserAddActionCall({ user: result }));
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
        console.log("UserListComponent -> onUpdate -> result", result)
        this.store$.dispatch(UserUpdateActionCall({id: user._id ,user: result}))
      }
    });
  }

  deleteUser(user: User) {
    if (confirm('Вы хотите удалить пользователя?')) {
     this.store$.dispatch(UserDeleteActionCall({id: user._id}))
    }
  }

}
