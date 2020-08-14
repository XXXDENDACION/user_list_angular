import {createFeatureSelector, createSelector} from '@ngrx/store';
import {USER_REDUCER_NODE, UserState} from '../reducers/user.reducer';
import { User } from '../../models/user';

export const selectCountFeature = createFeatureSelector<UserState>(USER_REDUCER_NODE);

export const selectUsers = createSelector(
    selectCountFeature,
    (state: UserState):User[] => state.user
)

export const selectUser = createSelector(
    selectCountFeature,
    (state: UserState): User => state.usr
) 


