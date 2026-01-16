import { describe, expect, it } from 'vitest';
import { calcStreaks, mapDateToPlanDayIndex } from './metrics';
import { DailyLog, UserPlan } from '../store/useAppStore';

const plan: UserPlan = {
  startDateISO: '2024-01-01',
  repeats: true,
  days: Array.from({ length: 14 }).map((_, index) => ({
    index: index + 1,
    masa1: {
      id: `m1-${index}`,
      titlu: 'Masa 1',
      oraImplicita: '12:00',
      ingrediente: [],
      reteta: { pasi: [], prepMinute: 0, cookMinute: 0 },
      caloriiEstimate: 0
    },
    masa2: {
      id: `m2-${index}`,
      titlu: 'Masa 2',
      oraImplicita: '19:00',
      ingrediente: [],
      reteta: { pasi: [], prepMinute: 0, cookMinute: 0 },
      caloriiEstimate: 0
    }
  }))
};

function completeLog(dateISO: string): DailyLog {
  return {
    dateISO,
    masa1Done: true,
    masa2Done: true,
    suplimente: { magneziu: true, vitaminaD: true, omega3: true },
    miscareDone: true,
    updatedAtISO: new Date().toISOString()
  };
}

describe('mapDateToPlanDayIndex', () => {
  it('maps start date to day 1', () => {
    expect(mapDateToPlanDayIndex('2024-01-01', plan)).toBe(1);
  });

  it('maps last day to day 14', () => {
    expect(mapDateToPlanDayIndex('2024-01-14', plan)).toBe(14);
  });

  it('wraps after 14 days', () => {
    expect(mapDateToPlanDayIndex('2024-01-15', plan)).toBe(1);
  });

  it('handles dates before start', () => {
    expect(mapDateToPlanDayIndex('2023-12-31', plan)).toBe(14);
  });
});

describe('calcStreaks', () => {
  it('calculates current and best streaks', () => {
    const logs: Record<string, DailyLog> = {
      '2024-01-01': completeLog('2024-01-01'),
      '2024-01-02': completeLog('2024-01-02'),
      '2024-01-03': completeLog('2024-01-03')
    };
    const result = calcStreaks(logs);
    expect(result.best).toBe(3);
  });
});
