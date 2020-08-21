import {createFeatureSelector, createSelector} from '@ngrx/store';
import { RoleState } from '../reducers/role.reducer';
import { User } from '../../models/user';
import { Role } from '../../models/role';

export const selectCountFeature = createFeatureSelector<RoleState>('role');

export const selectRoles = createSelector(
    selectCountFeature,
    (state: RoleState):Role[] => state.roles
)
