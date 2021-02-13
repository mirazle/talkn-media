type stateType = {
  innerHeight: number;
};

type actionType = {
  type: string;
} & stateType;

export const reducer = (state: stateType, action: actionType): stateType => ({ ...state, ...action });
