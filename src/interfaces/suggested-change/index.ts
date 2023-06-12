import { ChannelInterface } from 'interfaces/channel';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SuggestedChangeInterface {
  id?: string;
  channel_id: string;
  user_id: string;
  old_budget_allocation: number;
  new_budget_allocation: number;
  status: string;
  created_at?: any;
  updated_at?: any;

  channel?: ChannelInterface;
  user?: UserInterface;
  _count?: {};
}

export interface SuggestedChangeGetQueryInterface extends GetQueryInterface {
  id?: string;
  channel_id?: string;
  user_id?: string;
  status?: string;
}
