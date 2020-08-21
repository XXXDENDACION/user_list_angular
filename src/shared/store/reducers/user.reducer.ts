import { Action, createReducer, on, State } from '@ngrx/store';
import { User } from '../../models/user';
import { userActionsType, UserReloadAction } from '../actions/user.actions';
import * as formActions from '../actions/user.actions'



export const USER_REDUCER_NODE = 'user';

export interface UserState {
  user: User[];
  usr: User;
}

const initialState: UserState = {
  user: [],
  usr: null
};

export const userReducer = createReducer(
  initialState,
  on(formActions.UserGetActionSucces,(state, {user}) => ({...state, user})),
  on(formActions.UserReloadAction,state => ({...state})),
  on(formActions.UserGetActionFailed,(state, {error}) => ({...state, error})),
  on(formActions.UserAddActionSucces, (state)=> ({...state})),
  on(formActions.UserAddActionCall, (state)=> ({...state})),
  on(formActions.UserUpdateActionCall, (state)=> ({...state})),
  on(formActions.UserUpdateActionFailed,(state, {error}) => ({...state, error})),
  on(formActions.UserUpdateActionSuccess, (state)=> ({...state})),
  on(formActions.UserDeleteActionCall, (state)=> ({...state})),
  on(formActions.UserDeleteActionFailed,(state, {error}) => ({...state, error})),
  on(formActions.UserDeleteActionSuccess, (state)=> ({...state})),
)

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}

