import { LISTENER_TYPE, MESSAGE_TYPE } from '~/constants/message';
import type {
  ContentScriptToBackgroundEventMessage,
  ListenerMessage,
  MessageType,
  RequestMessage,
  ResponseMessage,
  WebtoContentScriptEventMessage,
} from '~/types/message';

/** WebPage -> ContentScript -> Background */

// Once Message
window.addEventListener('message', (event: MessageEvent<WebtoContentScriptEventMessage<RequestMessage>>) => {
  // console.log('contentScript window.addEventListener');
  if (event.data?.isCosmostation && event.data?.type === MESSAGE_TYPE.REQUEST__WEB_TO_CONTENT_SCRIPT) {
    const { data } = event;
    console.log('content-script', event);

    const toBackgroundMessage: ContentScriptToBackgroundEventMessage<RequestMessage> = {
      type: MESSAGE_TYPE.REQUEST__CONTENT_SCRIPT_TO_BACKGROUND,
      origin: event.origin,
      messageId: data.messageId,
      message: data.message,
    };
    chrome.runtime.sendMessage(toBackgroundMessage);
  }
});

/** Background -> ContentScript -> WebPage */

// Once Message
chrome.runtime.onMessage.addListener((request: ContentScriptToBackgroundEventMessage<ResponseMessage>) => {
  console.log('once contentScript', request);
  if (request?.type === MESSAGE_TYPE.RESPONSE__CONTENT_SCRIPT_TO_BACKGROUND) {
    const toWebMessage: WebtoContentScriptEventMessage<ResponseMessage> = {
      message: request.message,
      messageId: request.messageId,
      isCosmostation: true,
      type: MESSAGE_TYPE.RESPONSE__WEB_TO_CONTENT_SCRIPT,
    };

    window.postMessage(toWebMessage);
  }
});

// On Message
chrome.runtime.onMessage.addListener((request: ListenerMessage<ResponseMessage>) => {
  console.log('on contentScript', request);
  const types = Object.values(LISTENER_TYPE);
  if (types.includes(request?.type)) {
    const toWebMessage: ListenerMessage<ResponseMessage> = {
      type: request.type,
      isCosmostation: true,
      message: request.message,
    };

    window.postMessage(toWebMessage);
  }
});

// injectScript
const rootElement = document.head || document.documentElement;
const scriptElement = document.createElement('script');

scriptElement.src = chrome.runtime.getURL('js/injectScript.js');
scriptElement.type = 'text/javascript';
rootElement.appendChild(scriptElement);
scriptElement.remove();
