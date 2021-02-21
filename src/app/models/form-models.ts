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
  min: number;
  max: number;
  enabled: string;
  vcpu: number;
  disk: number;
  memory: number;
  instances: number;
  runningInstances: number;

}


export interface CourseModel{
  //tutto il corso
}
