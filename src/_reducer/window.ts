import { actionBaseType } from '_reducer';

export type windowStateType = {
  innerHeight?: number;
  scrollTop?: number;
};

export type actionType = actionBaseType & windowStateType;

const windowReducer = (state: windowStateType, action: actionType): windowStateType => ({ ...state, ...action });

export const initialWindow: windowStateType = {
  innerHeight: 0,
  scrollTop: 0,
};

export default windowReducer;
