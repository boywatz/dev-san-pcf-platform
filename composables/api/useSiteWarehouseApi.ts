import type { BaseAPIResponse } from '~/interface/base-response';

export type IMapRequestDummyToGIDto = {
  projectCode: string;
  requestDummyIds: string[];
  target: {
    unit?: string;
    costCenter?: string;
  };
};
export type ICreateTransferDto = {
  projectCode: string;
  destination: string;
  transferItems: {
    materialCode: string;
    transferQty: number;
  }[];
};
export const useSiteWarehouseApi = (token: string) => {
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
  const getRequestDummyList = async (query?: { projectCode?: string; status?: string }) => {
    const response = (await $fetch(`${apiURL}/requests/dummy`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      query: {
        ...(query?.projectCode && { projectCode: query.projectCode }),
        ...(query?.status && { status: query.status }),
      },
    })) as BaseAPIResponse;

    if (!(response.status === 'success')) return [];

    return response.data;
  };
  const getRequestDummyDetail = async (id: string) => {
    return await $fetch(`${apiURL}/requests/dummy`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id: id,
      },
    });
  };
  const mapRequestDummyToGI = async (data: IMapRequestDummyToGIDto) => {
    return await $fetch(`${apiURL}/requests/dummy/map-to-request-gi/unmatch`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
  };
  const getStock = async (projectCode: string) => {
    const response = (await $fetch(`${apiURL}/stocks`, {
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
  const createTransfer = async (data: ICreateTransferDto) => {
    return await $fetch(`${apiURL}/transfers`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
  };

  return {
    getUnitList,
    getRequestDummyList,
    getRequestDummyDetail,
    mapRequestDummyToGI,
    getStock,
    createTransfer,
  };
};
