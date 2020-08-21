import { Action, createAction, props } from '@ngrx/store';
import { User } from '../../models/user';

interface searchString {
  selectedValue: string;
  value: string;
}

export enum userActionsType {
  getUsers = '[USER] get',
  reload = '[USER] reload',
  call = '[USER] call create',
  create = '[USER] create',
  update = '[USER] update',
  delete = '[USER] delete',
  callUpdate = '[USER] call update',
  callDelete = '[USER] call delete',
}



export const UserGetActionSucces = createAction(
    userActionsType.getUsers,
    props<{user: User[]}>()
)

export const UserGetActionFailed = createAction(
    userActionsType.getUsers,
    props<{error: string}>()
);

export const UserAddActionSucces = createAction(
    userActionsType.create,
    props<{ searchData: searchString }>()
)

export const UserAddACtionFailed = createAction(
  userActionsType.create,
  props<{error: string}>()
)

export const UserAddActionCall = createAction(
    userActionsType.call,
    props<{user: User}>()
)

export const UserUpdateActionCall = createAction(
  userActionsType.callUpdate,
  props<{id: string,user: User}>()
)

export const UserUpdateActionSuccess = createAction(
  userActionsType.update,
  props<{ searchData: searchString }>()
)

export const UserUpdateActionFailed = createAction(
userActionsType.update,
props<{error: string}>()
)

export const UserDeleteActionCall = createAction(
  userActionsType.callDelete,
  props<{id: string}>()
)

export const UserDeleteActionSuccess = createAction(
  userActionsType.delete,
  props<{ searchData: searchString }>()
)

export const UserDeleteActionFailed = createAction(
userActionsType.delete,
props<{error: string}>()
)

export const UserReloadAction = createAction(
  userActionsType.reload,
  props<{ searchData: searchString }>()
);
