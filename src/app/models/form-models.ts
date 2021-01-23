export interface LoginModel {
  email: string;
  password: string;
}

export interface RegisterModel {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  password2: string;
  idNumber: string;
}

export interface EditCourseModel{
  id: number;
  acronym: string ;
  fullName: string;
  minStudentsForTeam: string;
  maxStudentsForTeam: string;
 // heldBy: number[]; // da aggiungere poi forse la di aggiungere altri prof
  enabled: boolean;


}
