export type GET_POST_LIST_TYPE = "INIT" | "NEXT";

export type PageName = "post";

export type ActionType =
  | "SET_CURRENT_CATEGORY_ID"
  | "GET_INITIAL"
  | "SEND_INITIAL"
  | GET_CATEGORIES
  | GET_POST_LIST
  | "GET_POST_LIST_V2"
  | GET_POST
  | SEND_CATEGORIES
  | SEND_POST_LIST
  | "SEND_POST"
  | "RELOAD"
  | "CHECK_IN"
  | "SEARCH_POST"
  | "SET_CURRENT_SORT";
  
export type Action = {
  type: ActionType;
  payload?: any;
};

export type Dispatch = (action: Action) => any;
export type Reducer = (action: Action, dispatch: Dispatch) => any;

export type GET_CATEGORIES = "GET_CATEGORIES";
export type GET_POST_LIST = "GET_POST_LIST";
export type GET_POST = "GET_POST";

export type SEND_CATEGORIES = "SEND_CATEGORIES";
export type SEND_POST_LIST = "SEND_POST_LIST";

export type Category = {
  id: string;
  name: string;
};

export type Post = {
  id: string;
  info: {
    title: string;
    briefContent: string;
    coverImage: string;
    viewCount: string;
    diggCount: number;
    commentCount: number;
    collectCount: number;
    hotIndex: number;
    rankIndex: number;
    createdAt: string;
  };
  author: {
    id: string;
    avatar: string;
    name: string;
  };
  category: any;
  tags: any;
};

export type CheckInResponse = {
  success: boolean;
  incrPoint: number;
  sumPoint: number;
};

export type LotteryConfig = {
  freeCount: number;
};

export type Draw = {
  name: string;
  image: string;
};

export type RawData = {
  status: number;
  data: { err_no: number; data: any };
};

export type RequestConfig = Action;

export type SortType = 200 | 300 | 3;

export type SearchPostParams = {
  sortType: SortType;
  cursor?: string;
  keywords: string;
};

export type GetPostListParams = {
  sortType: SortType;
  cursor?: string;
  categoryID: string;
};
