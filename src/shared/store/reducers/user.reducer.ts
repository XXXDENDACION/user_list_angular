import { Action, createReducer, on } from '@ngrx/store';
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
  on(formActions.UserAddActionSucces, (state, {user})=> ({...state, usr: user})),
  on(formActions.UserAddActionCall, (state,{user})=> ({...state, usr: user}))
  
)

