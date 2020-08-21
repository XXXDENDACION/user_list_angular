import { Injectable } from '@angular/core';
import { RolesService } from '../../services/roles.service';
import { Effect, Actions, createEffect, ofType, act } from '@ngrx/effects';
import {
  RoleGetActionCall,
  RoleGetActionSuccess,
  RoleGetActionFailed,
} from '../actions/role.actions';
import {
  map,
  tap,
  switchMap,
  catchError,
  takeUntil,
  switchAll,
  mergeMap,
} from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class RoleEffects {
  constructor(private actions$: Actions, private roleService: RolesService) {}

  getRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleGetActionCall),
      switchMap(() => {
        return this.roleService.getRoles().pipe(
          map((role) => {
              console.log(role);
            return RoleGetActionSuccess({
              roles: role,
            })
        }
          ),
          catchError((err) => {
           return of(
              RoleGetActionFailed({
                error: err,
              })
            );
          })
        );
      })
    )
  );
}
