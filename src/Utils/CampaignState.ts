import { CampaignData } from "../Types/CampaignTypes";

// Campaign state management
export class CampaignStateManager {
  private static instance: CampaignStateManager;
  private campaignData: CampaignData | null = null;

  private constructor() {}

  static getInstance(): CampaignStateManager {
    if (!CampaignStateManager.instance) {
      CampaignStateManager.instance = new CampaignStateManager();
    }
    return CampaignStateManager.instance;
  }

  setCampaignData(data: Partial<CampaignData>): void {
    this.campaignData = { ...this.campaignData, ...data } as CampaignData;
  }

  getCampaignData(): CampaignData | null {
    return this.campaignData;
  }

  clearCampaignData(): void {
    this.campaignData = null;
  }

  // Convert HTML content to EJS template
  convertToEJS(htmlContent: string): string {
    // Basic conversion - you can enhance this based on your EJS requirements
    return htmlContent
      .replace(/<h1>/g, '<h1><%= title %>')
      .replace(/<h2>/g, '<h2><%= subtitle %>')
      .replace(/<p>/g, '<p><%= content %>')
      .replace(/class="([^"]*)"/g, 'class="<%= classes %>"');
  }
}

export const campaignState = CampaignStateManager.getInstance(); 