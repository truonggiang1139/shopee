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
function removeSpecialCharacter(str: string) {
  // eslint-disable-next-line no-useless-escape
  return str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, "");
}

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, "-") + `-i-${id}`;
};

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split("-i-");
  return arr[arr.length - 1];
};

export const getAvatarURL = (avatarName?: string) => {
  return avatarName
    ? `https://api-ecom.duthanhduoc.com/images/${avatarName}`
    : "https://img.freepik.com/free-photo/red-white-cat-i-white-studio_155003-13189.jpg?w=2000";
};
