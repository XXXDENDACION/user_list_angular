import { Injectable } from '@angular/core';
import { Effect, Actions,createEffect, ofType, act } from '@ngrx/effects';
import {
  userActionsType,
  UserGetActionSucces,
  UserGetActionFailed,
  UserReloadAction,
  UserAddActionCall,
  UserAddActionSucces,
} from '../actions/user.actions';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { of, never } from 'rxjs';


@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  @Effect()
  getUsers$ = createEffect(() => this.actions$.pipe(
      ofType(UserReloadAction),
      switchMap(({searchData}) => {
        return this.userService
          .getUsers(searchData.selectedValue, searchData.value)
          .pipe(
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
  )) 
  createUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserAddActionCall),
    switchMap(({user}) => {
        console.log(user);
      return this.userService.addUser(user)
          .pipe(
              map((user) => UserAddActionSucces({
                  user: user
              }))
          )
    }
)
  )) 
}
