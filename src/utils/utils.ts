import axios, { AxiosError, HttpStatusCode } from "axios";

export function isAxiosError<T>(error: any): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error);
}

export function isAxiosUnprocessableEntityError<FormError>(error: any): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat("de-DE").format(currency);
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1
  })
    .format(value)
    .replace(".", ",")
    .toLowerCase();
}
export function formatPercent(value: number) {
  return new Intl.NumberFormat("en", { style: "percent" }).format(value);
}
