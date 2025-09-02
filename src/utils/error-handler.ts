export const getErrorMessage = (
  error: unknown,
  defaultMessage: string = 'Неизвестная ошибка'
): string => {
  if (error instanceof Error) {
    return error.message || defaultMessage;
  }
  if (typeof error === 'string') {
    return error || defaultMessage;
  }
  return defaultMessage;
};
