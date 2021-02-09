import { InputFile } from "./input-file.model";

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
  name: string;
  min: string;
  max: string;
  enabled: string;
  vcpu: number;
  disk: number;
  memory: number;


}


export interface CourseModel{
  //tutto il corso
}
