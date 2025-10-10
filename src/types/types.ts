export type FriendMessageCardType = {
  userId?: string;
  avatar?: string;
  userName?: string;
  message?: string;
  sentTime?: string;
  isSented?: boolean;
  isTyping?: boolean;
  newMessageCount?: number;
};

export type MessageType = {
  id: number;
  content?: string;
  sender: string;
  time: string;
};
