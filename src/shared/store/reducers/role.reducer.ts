import { Action, createReducer, on, State } from '@ngrx/store';
import * as formActions from '../actions/role.actions';
import { Role } from '../../models/role';

export interface RoleState {
  roles: Role[];
}

const initialState: RoleState = {
  roles: [],
};

export const roleReducer = createReducer(
    initialState,
    on(formActions.RoleGetActionSuccess,(state, {roles}) => ({...state, roles})),
    on(formActions.RoleGetActionFailed,(state, {error}) => ({...state, error})),
    on(formActions.RoleGetActionCall,(state) => ({...state})),
)

export function reducerRole(state: RoleState | undefined, action: Action) {
  return roleReducer(state, action);
}
