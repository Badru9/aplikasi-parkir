export interface Vehicle {
  id?: number;
  licensePlate: string;
  timeIn: string;
  timeOut?: string;
  cost?: number;
}

export interface Pegawai {
  id?: number;
  role?: {
    name: string;
  };
  name: string;
  username: string;
  email: string;
  password: string;
}
