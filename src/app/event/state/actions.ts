import { createAction } from '@ngrx/store';
import { createGenerateActionType } from 'app/state/utils';

export const SPINNER_PREFIX = 'SPINNER';

export const generateActionType = createGenerateActionType(SPINNER_PREFIX);

export const startSpinner = createAction(generateActionType('startSpinner'));
export const stopSpinner = createAction(generateActionType('stopSpinner'));
