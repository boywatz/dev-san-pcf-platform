export const useAuthApi = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.authApi;
  const apiKey = config.public.authApiKey;

  const authorize = async () => {
    return await $fetch(`${baseURL}/auth/authorize`, {
      method: 'POST',
      body: {
        apiKey: apiKey,
      },
    });
  };
  const logout = async (token: string) => {
    return await $fetch(`${baseURL}/auth/logout`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  const profile = async (token: string) => {
    return await $fetch(`${baseURL}/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  return {
    authorize,
    profile,
    logout,
  };
};
