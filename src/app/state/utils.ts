export const createGenerateActionType =
  (prefix: string) => (actionType: string) =>
    `[${prefix}]${actionType}`;
