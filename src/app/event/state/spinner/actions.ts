import { createAction } from '@ngrx/store';
import { createGenerateActionType } from 'app/state/utils';

export const PREFIX = 'SPINNER';

export const generateActionType = createGenerateActionType(PREFIX);

export const startSpinner = createAction(generateActionType('startSpinner'));
export const stopSpinner = createAction(generateActionType('stopSpinner'));
