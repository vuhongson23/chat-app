// Auth provider type
export type AuthValueType = {
  user: UserType | null;
  setUser: (value: UserType | null) => void;
  handleLogout: () => void;
};

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

// Messages
export type MessageType = {
  id: number;
  content?: string;
  sender: string;
  time: string;
};

export type ConversationType = {
  friendId: number;
  name: string;
  avatar: string;
  lastSeen: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
};

// User
export type UserType = {
  id?: number;
  name?: string;
  email?: string;
  avatar?: string;
  bio?: string;
  isOnline?: boolean;
  createdAt?: string;
  updatedAt?: string;
  lastSeen?: string;
};

export type FriendRequestType = {
  id: number;
  status: "ACCEPTED" | "PENDING" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  requesterId: number;
  recipientId: number;
  requester: {
    id: number;
    name: string;
    isOnline: boolean;
    avatar: string;
    bio: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
};

// Request
export type RequestParamsType = {
  url: string;
  params?: any;
};

export type OptionsType = {
  timeout?: number;
  contentType?: "application/json" | "multipart/form-data";
};
