import { Action } from '@ngrx/store';

export const SET_AUTH = '[Auth] Set Auth';
export const SET_UNAUTH = '[Auth] Set Unauth';

export class SetAuth implements Action {
    readonly type = SET_AUTH;
}

export class SetUnauth implements Action {
    readonly type = SET_UNAUTH;
}

export type AuthActions = SetAuth | SetUnauth;