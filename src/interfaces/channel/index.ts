import { SuggestedChangeInterface } from 'interfaces/suggested-change';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ChannelInterface {
  id?: string;
  name: string;
  budget_allocation: number;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  suggested_change?: SuggestedChangeInterface[];
  organization?: OrganizationInterface;
  _count?: {
    suggested_change?: number;
  };
}

export interface ChannelGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  organization_id?: string;
}
