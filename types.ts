export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  image: string;
}

export enum BookingStatus {
  IDLE = 'IDLE',
  CONFIRMING = 'CONFIRMING',
  SUCCESS = 'SUCCESS'
}

export interface BookingDetails {
  serviceId: string | null;
  date: string;
  time: string;
  name: string;
  email: string;
}