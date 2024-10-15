import type { BaseAPIResponse } from '~/interface/base-response';
import { fileHandler } from '../utils/fileHandler';
import { useErrorHandler } from '../utils/errorHandler';

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
export type IDownloadSiteWarehouseTransactionReportDto = {
  projectCode: string;
  unit: string;
  model: string;
  costCenter: string;
  transactionTypeId: string; //'ReceiptTransaction', 'RequestGITransaction', 'RequestGIReorderTransaction', 'RequestGIWithoutOrderTransaction', 'RequestDummyTransaction'
  documentRef: string;
  flagOverBom: boolean;
  reasonId: string;
  materialGroup: string;
  materialCode: string;
  transactionDateFrom: string;
  transactionDateTo: string;
};
export type IDownloadSiteWarehouseStockReportDto = {
  projectCode: string;
  materialCodes: string[];
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
    try {
      return await $fetch(`${apiURL}/requests/dummy/map-request-dummy`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
    } catch (error) {
      throw useErrorHandler(error);
    }
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
  const downloadTransactionReport = async (data: IDownloadSiteWarehouseTransactionReportDto) => {
    const response = (await $fetch(`${apiURL}/reports/download/transaction`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      responseType: 'blob',
    })) as any;
    if ((!response as any).ok) {
      throw new Error('Network response was not ok');
    }
    fileHandler().downloadHandler(response, 'transaction-report');
  };
  const downloadStockReport = async (data: IDownloadSiteWarehouseStockReportDto) => {
    const response = (await $fetch(`${apiURL}/reports/download/stock`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
      responseType: 'blob',
    })) as any;
    if ((!response as any).ok) {
      throw new Error('Network response was not ok');
    }
    fileHandler().downloadHandler(response, 'stock-report');
  };
  const getOverBomReasons = async () => {
    const response = (await $fetch(`${apiURL}/kv/request-overbom-reasons`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })) as BaseAPIResponse;

    if (!(response.status === 'success')) return [];

    return response.data;
  };
  const getNCRReasons = async () => {
    const response = (await $fetch(`${apiURL}/kv/request-ncr-reasons`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })) as BaseAPIResponse;

    if (!(response.status === 'success')) return [];

    return response.data;
  };
  const getFixCustomerReasons = async () => {
    const response = (await $fetch(`${apiURL}/kv/request-fix-customer-reasons`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })) as BaseAPIResponse;

    if (!(response.status === 'success')) return [];

    return response.data;
  };
  const getMaterialGroups = async () => {
    const response = (await $fetch(`${apiURL}/kv/material-groups`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })) as BaseAPIResponse;

    if (!(response.status === 'success')) return [];

    return response.data;
  };
  const getSapMaterialGroups = async (projectCode: string, unit?: string, costCenter?: string) => {
    const response = (await $fetch(`${apiURL}/material-info/material-groups`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      query: {
        projectCode,
        ...(unit && { unit }),
        ...(costCenter && { costCenter }),
      },
    })) as BaseAPIResponse;

    if (!(response.status === 'success')) return [];

    return response.data;
  };
  const getSapMaterialBoms = async (projectCode: string, po: string, unit?: string, costCenter?: string) => {
    const response = (await $fetch(`${apiURL}/material-info/material-boms`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      query: {
        projectCode,
        po,
        ...(unit && { unit }),
        ...(costCenter && { costCenter }),
      },
    })) as BaseAPIResponse;

    if (!(response.status === 'success')) return [];

    return response.data;
  };
  const getNotify = async (projectCode?: string) => {
    const response = (await $fetch(`${apiURL}/notifies`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      query: {
        ...(projectCode && { projectCode }),
      },
    })) as BaseAPIResponse;

    if (!(response.status === 'success')) return [];

    return response.data;
  };

  return {
    getUnitList,
    getRequestDummyList,
    getRequestDummyDetail,
    mapRequestDummyToGI,
    getStock,
    createTransfer,
    downloadTransactionReport,
    downloadStockReport,
    getOverBomReasons,
    getNCRReasons,
    getFixCustomerReasons,
    getMaterialGroups,
    getSapMaterialGroups,
    getSapMaterialBoms,
    getNotify,
  };
};
