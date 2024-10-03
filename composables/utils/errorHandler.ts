export const useErrorHandler = (error: any) => {
  //handle error with structure from api
  if (error?.data?.error) {
    const e = error.data.error;
    return e.message;
  } else {
    return error?.message || error;
  }
};
