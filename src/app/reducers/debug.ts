import { ActionReducer } from '@ngrx/store';

// console.log all actions
export function debug<T>(reducer: ActionReducer<T>): ActionReducer<T> {
  return (state, action) => {
    // console.log(`state: ${JSON.stringify(state)}, action: ${JSON.stringify(action.type)}`);
    return reducer(state, action);
  };
}
