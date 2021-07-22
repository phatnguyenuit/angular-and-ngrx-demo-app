// import { combineReducers } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { EventState } from '../event/state/index';

// No need to register all reducers here
// because we registered reducers on the module already
export const reducersMap = {
  router: routerReducer,
};

// const rootReducer = combineReducers<{}>(reducers);
// export type RootState = ReturnType<typeof rootReducer>;

// TODO Update RootState with module State
export interface RootState {
  event: EventState;
}
