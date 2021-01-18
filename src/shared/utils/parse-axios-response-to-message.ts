import { AxiosResponse } from 'axios';

import { Message, MessageType } from '../types/Message';

type ParseAxiosResponseToMessage = (error: AxiosResponse, msgType: MessageType) => Message;
export const parseAxiosResponseToMessage: ParseAxiosResponseToMessage = (error, msgType) => ({
  type: msgType,
  text: error.data?.message || error.status?.toString() || msgType,
});
