import type { BaseAPIResponse } from '~/interface/base-response';

export const useMasterDataApi = (token: string) => {
  const config = useRuntimeConfig();
  const baseURL = config.public.siteWarehouseApi;
  const apiURL = `${baseURL}/site-warehouse`;

  const getUnitList = async (projectCode: string) => {
    const response = (await $fetch(`${apiURL}/units`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      query: {
        projectCode,
      },
    })) as BaseAPIResponse;

    if (!(response.status === 'success')) return [];

    return response.data;
  };
  return {
    getUnitList,
  };
};
