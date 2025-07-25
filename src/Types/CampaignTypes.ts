export interface CampaignData {
  senderMail: string;
  campaignName: string;
  subject: string;
  content: string;
  status?: 'draft' | 'sent' | 'failed';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CampaignResponse {
  success: boolean;
  message: string;
  campaignId?: string;
  data?: CampaignData;
}
