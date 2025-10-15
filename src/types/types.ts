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

export type MessageType = {
  id: number;
  content?: string;
  sender: string;
  time: string;
};

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

export type ResponseType = "ACCEPTED" | "PENDING" | "REJECTED";
