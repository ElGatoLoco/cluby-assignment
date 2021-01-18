import { useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';

import { Message } from '../types/Message';

type UseToastMessages = (messages: Message[], clearMessages: () => void) => void;
export const useToastMessages: UseToastMessages = (messages, clearMessages) => {
  const { addToast } = useToasts();

  useEffect(() => {
    if (messages && messages.length > 0) {
      messages.forEach((message) => {
        addToast(message.text, { appearance: message.type });
      });
      setTimeout(clearMessages);
    }
  }, [addToast, clearMessages, messages]);
};
