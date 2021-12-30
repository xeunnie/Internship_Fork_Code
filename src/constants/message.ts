export const MESSAGE_TYPE = {
  REQUEST__WEB_TO_CONTENT_SCRIPT: 'REQUEST_WEB_TO_CONTENT_SCRIPT',
  RESPONSE__WEB_TO_CONTENT_SCRIPT: 'RESPONSE__WEB_TO_CONTENT_SCRIPT',
  REQUEST__CONTENT_SCRIPT_TO_BACKGROUND: 'REQUEST__CONTENT_SCRIPT_TO_BACKGROUND',
  RESPONSE__CONTENT_SCRIPT_TO_BACKGROUND: 'RESPONSE__CONTENT_SCRIPT_TO_BACKGROUND',
  REQUEST__BACKGROUND_TO_POPUP: 'REQUEST__BACKGROUND_TO_POPUP',
  RESPONSE__BACKGROUND_TO_POPUP: 'RESPONSE__BACKGROUND_TO_POPUP',

  IN_MEMORY: 'IN_MEMORY',
} as const;

export const LISTENER_TYPE = {
  ACCOUNT_CHANGED: 'accountChanged',
} as const;

export const IN_MEMORY_MESSAGE_TYPE = {
  GET: 'get',
  GET_ALL: 'getAll',
  SET: 'set',
} as const;
