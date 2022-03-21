import { MESSAGE_TYPE } from '~/constants/message';
import type { BackgroundToContentScriptEventMessage, ListenerMessage, ResponseMessage } from '~/types/message';

export function responseToWeb<T>(data: Omit<BackgroundToContentScriptEventMessage<T>, 'type'>) {
  console.log('popup response', data);
  const toContentScriptMessage: BackgroundToContentScriptEventMessage<T> = {
    origin: data.origin,
    messageId: data.messageId,
    message: data.message,
    type: MESSAGE_TYPE.RESPONSE__CONTENT_SCRIPT_TO_BACKGROUND,
  };

  if (data.tabId) {
    chrome.tabs.sendMessage(data.tabId, toContentScriptMessage);
  } else {
    chrome.tabs.query({ url: `${data.origin}/*` }, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, toContentScriptMessage);
        }
      });
    });
  }
}

export function emitToWeb(data: Omit<ListenerMessage<ResponseMessage>, 'isCosmostation'>) {
  console.log('editToWeb(background)');
  const toContentScriptMessage: ListenerMessage<ResponseMessage> = {
    isCosmostation: true,
    message: data.message,
    type: data.type,
  };

  chrome.tabs.query({ url: '<all_urls>' }, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, toContentScriptMessage);
      }
    });
  });
}
