export interface DashboardData {
  userName: string;
  emailCount: number;
  recentEmails: {
    subject: string;
  }[];
}
