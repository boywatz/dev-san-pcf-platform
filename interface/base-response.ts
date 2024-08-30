// export class BaseAPIResponse<T = any> {
//   statusCode: number;
//   status: string;
//   data: T;

//   constructor(statusCode: number, status: string, data: T) {
//     this.statusCode = statusCode;
//     this.status = status;
//     this.data = data;
//   }
// }

export interface BaseAPIResponse {
  statusCode: number;
  status: string;
  data: any;
}
