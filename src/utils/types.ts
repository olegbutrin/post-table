export type TRawPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type TRawData = Array<TRawPost>;

export type TApiCallback<T> = (result: T) => void;

export type TFetchPosts = (
  onSuccess: TApiCallback<TRawData>,
  onError: TApiCallback<string>
) => void;

export type TPostsStore = {
  request: boolean;
  error: string;
  posts: TRawData;
};

export type TSortType = "id" | "title" | "body";

export type TSortDirection = "asc" | "desc";

export type TAppstore = {
  sortType: TSortType;
  sortDirection: TSortDirection;
  searchText: string;
  rowCount: number;
}