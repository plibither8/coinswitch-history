const API_BASE = "http://localhost:3000/";

interface ApiResponse<T = any> {
  data: undefined | T;
  error: undefined | any;
}

export async function fetcher<T = any>(
  endpoint: string
): Promise<ApiResponse<T>> {
  const url = `${API_BASE}${endpoint}`;
  const value: ApiResponse<T> = {
    data: undefined,
    error: undefined,
  };
  try {
    const response = await fetch(url);
    const json = (await response.json()) as T;
    value.data = json;
  } catch (error) {
    value.error = error;
  }
  return value;
}

export default fetcher;
