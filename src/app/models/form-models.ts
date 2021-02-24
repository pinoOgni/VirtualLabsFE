export interface LoginModel {
  username: string;
  password: string;
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