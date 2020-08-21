import { Action, createAction, props } from '@ngrx/store';
import { User } from '../../models/user';
import { Role } from '../../models/role';

interface searchString {
  selectedValue: string;
  value: string;
}

export enum roleActionsType {
  call = '[ROLE] call',
  get = '[ROLE] get'
}

export const RoleGetActionCall = createAction(
    roleActionsType.call,
    props<{}>()
)

export const RoleGetActionSuccess = createAction(
    roleActionsType.get,
    props<{roles: Role[]}>()
);

export const RoleGetActionFailed = createAction(
    roleActionsType.get,
    props<{error: string}>()
);