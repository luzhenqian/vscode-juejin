export type GET_POST_LIST_TYPE = "INIT" | "NEXT";

export type PageName = "post";

export type Action = {
  type: GET_CATEGORORIES | GET_POST_LIST | GET_POST | SEND_CATEGORORIES;
  payload?: any;
};

export type Reducer = (action: Action) => any;

export type GET_CATEGORORIES = "GET_CATEGORIES";
export type GET_POST_LIST = "GET_POST_LIST";
export type GET_POST = "GET_POST";

export type SEND_CATEGORORIES = "SEND_CATEGORIES";

export type Category = {
  id: string;
  name: string;
};

export type RawData = {
  status: number;
  data: { err_no: number; data: any };
};
