import type { BaseAPIResponse } from '~/interface/base-response';

export const useMasterDataApi = (token: string) => {
  const config = useRuntimeConfig();
  const baseURL = config.public.siteWarehouseApi;
  const apiURL = `${baseURL}/master-data`;

  const getProjectList = async () => {
    const response = (await $fetch(`${apiURL}/projects`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })) as BaseAPIResponse;

    if (!(response.status === 'success')) return [];

    return response.data;
  };
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
  const getCostCenterList = async (projectCode: string) => {
    const response = (await $fetch(`${apiURL}/cost-centers`, {
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
    getProjectList,
    getUnitList,
    getCostCenterList,
  };
};
