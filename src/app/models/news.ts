export interface News {
  id?: string;
  title: string;
  content: string;
  public_date?: Date;
  image?: string;
  status: 'urgent' | 'priority' | 'events' | 'common';
  author?: string;
}
