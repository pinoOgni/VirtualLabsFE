export interface LoginModel {
  username: string;
  password: string;
}

export interface RegisterModel {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  password2: string;
  id: string;
}

export interface EditCourseModel{
  acronym: string;
  fullName: string;
  minStudentsForTeam: string;
  maxStudentsForTeam: string;
  // heldBy: number[]; // da aggiungere poi forse la di aggiungere altri prof
  enabled: string;
  vcpus: number;
  diskSpace: number;
  ramSize: number;


}



export interface CourseModel{
  //tutto il corso
}
