export interface IPollOptionModel {
  option_id: string;
  poll_id: string;
  description: string;
}

export interface IPollModel {
  poll_id: string;
  creator_id: string;
  title: string;
  multi_selection: boolean;
}
