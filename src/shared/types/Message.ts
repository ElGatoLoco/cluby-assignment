export type MessageType = 'success' | 'info' | 'error';
export type Message = {
  type: MessageType;
  text: string;
};
