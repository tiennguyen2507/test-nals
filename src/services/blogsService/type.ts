export interface TRequest {
  TSearch: {
    dataSearch: string;
  };
  TDetail?: {
    idRequest: string;
  };
}

export interface TRespone {
  TList: never[];
}
