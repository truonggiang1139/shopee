import axios, { AxiosError, HttpStatusCode } from "axios";

export function isAxiosError<T>(error: any): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error);
}

export function isAxiosUnprocessableEntityError<FormError>(error: any): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
}
