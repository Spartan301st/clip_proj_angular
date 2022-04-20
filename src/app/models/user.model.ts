// defining a model for our users
export default interface IUser {
  name: string;
  email: string;
  password?: string;
  age: number;
  phoneNumber: string;
}
// // we can also use classes to create a model
// export default class IUser {
//   name?: string;
//   email?: string;
//   password?: string;
//   age?: number;
//   phoneNumber?: string;
// }
