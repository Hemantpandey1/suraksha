
export interface User {
  name: string;
  passportNumber: string;
  digitalId: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}
