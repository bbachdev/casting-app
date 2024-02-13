export type ServerActionResponse = {
  success: boolean;
  status: number;
  response: Object | string;
};

export function ServerActionResponse(status: number, response: Object | string ): ServerActionResponse {
  return {
    success: status >= 200 && status < 300,
    status,
    response
  }
}