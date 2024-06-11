export interface Vehicle {
  id?: number;
  plat_no: string;
  jam_masuk: string;
  jam_keluar?: string;
  biaya?: number;
}

export interface Pegawai {
  id?: number;
  role?: string;
  nama: string;
  alamat: string;
  username: string;
  tanggal_lahir: string;
  email: string;
  password: string;
}
