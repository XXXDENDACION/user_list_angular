import { Injectable } from '@angular/core';
import { Effect, Actions, createEffect, ofType, act } from '@ngrx/effects';
import {
  userActionsType,
  UserGetActionSucces,
  UserGetActionFailed,
  UserReloadAction,
  UserAddActionCall,
  UserAddActionSucces,
  UserAddACtionFailed,
  UserUpdateActionCall,
  UserUpdateActionSuccess,
  UserUpdateActionFailed,
  UserDeleteActionCall,
  UserDeleteActionFailed,
  UserDeleteActionSuccess,
} from '../actions/user.actions';
import {
  map,
  tap,
  switchMap,
  catchError,
  takeUntil,
  switchAll,
  mergeMap,
} from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { of, never, Subject } from 'rxjs';
import { PopUpService } from 'src/shared/services/popup.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private popUpService: PopUpService
  ) {}

  selectedValue: string;
  value: string;
  isValid: boolean = false;
  isOpen: boolean = false;

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        UserReloadAction,
        UserAddActionSucces,
        UserUpdateActionSuccess,
        UserDeleteActionSuccess
      ),
      mergeMap(({ searchData }) => {
        this.selectedValue = searchData.selectedValue;
        this.value = searchData.value;
        return this.userService.getUsers(this.selectedValue, this.value).pipe(
          map((user) =>
            UserGetActionSucces({
              user: user,
            })
          ),
          catchError((error) =>
            of(
              UserGetActionFailed({
                error: error,
              })
            )
          )
        );
      })
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserAddActionCall),
      switchMap(({ user }) => {
        console.log('user', user);
        return this.userService.addUser(user).pipe(
          map((res) => {
            this.popUpService.setData(!this.isValid, !this.isOpen, 'User add!');
            return UserAddActionSucces({
              searchData: {
                selectedValue: this.selectedValue,
                value: this.value,
              },
            });
          }),
          catchError((err) => {
            if (err.error.data) {
              for (let item in err.error.data.errors) {
                err.error.data.errors[item].forEach((msg) => {
                  this.popUpService.setData(this.isValid, !this.isOpen, msg);
                });
              }
              return of(
                UserAddACtionFailed({
                  error: err,
                })
              );
            }
          })
        );
      })
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserUpdateActionCall),
      switchMap(({ id, user }) => {
        return this.userService.updateUser(id, user).pipe(
          map((res) => {
            this.popUpService.setData(
              !this.isValid,
              !this.isOpen,
              'User update!'
            );
            return UserUpdateActionSuccess({
              searchData: {
                selectedValue: this.selectedValue,
                value: this.value,
              },
            });
          }),
          catchError((err) => {
            if (err.error.data) {
              for (let item in err.error.data.errors) {
                err.error.data.errors[item].forEach((msg) => {
                  this.popUpService.setData(this.isValid, !this.isOpen, msg);
                });
              }
              return of(
                UserUpdateActionFailed({
                  error: err,
                })
              );
            }
          })
        );
      })
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserDeleteActionCall),
      switchMap(({ id }) => {
        return this.userService.deleteUser(id).pipe(
          map(
            (res) => {
              this.popUpService.setData(true, !this.isOpen, 'User delete!');
              return UserDeleteActionSuccess({
                searchData: {
                  selectedValue: this.selectedValue,
                  value: this.value,
                },
              });
            },
            catchError((err) => {
              this.popUpService.setData(false, !this.isOpen, err.message);
              return of(
                UserDeleteActionFailed({
                  error: err,
                })
              );
            })
          )
        );
      })
    )
  );
}
