import { Action, createAction, props } from '@ngrx/store';
import { User } from '../../models/user';

interface searchString {
  selectedValue: string;
  value: string;
}

export enum userActionsType {
  getUsers = '[USER] get',
  reload = '[USER] reload',
  create = '[USER] create',
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
    props<{user: User}>()
)

export const UserAddActionCall = createAction(
    userActionsType.create,
    props<{user: User}>()
)

export const UserReloadAction = createAction(
  userActionsType.reload,
  props<{ searchData: searchString }>()
);
