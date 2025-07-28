export const RouterFunctions = {
  getSearchParams: (data: IterableIterator<[string, string]>) => {
    const paramsObj = Object.fromEntries(data);
    const urlSearchParams = new URLSearchParams(paramsObj);
    return urlSearchParams;
  },
};
