import { mockMonthlyReport, mockWeeklyReport } from '@/data/mock/reports';
import { simulate } from '@/services/api/mock-client';
import type { MonthlyReport, WeeklyReport } from '@/types';

export const reportsService = {
  getWeekly(): Promise<WeeklyReport> {
    return simulate(mockWeeklyReport, 500);
  },
  getMonthly(): Promise<MonthlyReport> {
    return simulate(mockMonthlyReport, 500);
  },
};
