// news.model.ts
export interface News {
  _id: string;
  title: string;
  content: string;
  public_date: string;
  image: string;
  status: string;
  author: string;
}

export interface NewsResponse {
  message: string;
  total: number;
  page: number;
  page_size: number;
  data: News[];
}
