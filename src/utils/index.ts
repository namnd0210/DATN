export const buildApiUrl = (params: any): string => {
  let url: string = '';
  if (params && Object.keys(params).length > 0) {
    Object.keys(params).forEach((key, i) => {
      let prefix = i === 0 ? `?` : `&`;
      url += `${prefix}${key}=${params[key]}`;
    });
  }
  return url;
};
