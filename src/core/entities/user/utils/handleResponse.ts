export interface IResponse {
  success: boolean;
  message: string;
  status: number;
  data: any;
  token?: string;
}
interface status {
  success: 200;
  error: 400;
  notFound: 404;
}
export function handleResponse(params: IResponse | null) {
  if (!!params) {
    const optionalData = {
      data: params.data,
      token: params.token,
    };
    return {
      sucess: params.success,
      message: params.message,
      status: params.status,
      ...optionalData,
    };
  }
}
