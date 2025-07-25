import { CampaignData } from "../Types/CampaignTypes";

export const validateCampaign = (data: CampaignData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.senderMail?.trim()) {
    errors.push("Sender email is required");
  } else if (!isValidEmail(data.senderMail)) {
    errors.push("Invalid sender email format");
  }

  if (!data.campaignName?.trim()) {
    errors.push("Campaign name is required");
  }

  if (!data.subject?.trim()) {
    errors.push("Subject is required");
  }

  if (!data.content?.trim()) {
    errors.push("Content is required");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
