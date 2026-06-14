import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { MonthData } from '../types';

export function useMonthNavigator() {
  const { tm } = useI18n();

  const currentMonth = ref<MonthData>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const monthName = computed(() => {
    const months = tm('months') as string[];
    return months[currentMonth.value.month];
  });

  const monthLabel = computed(() => `${monthName.value} ${currentMonth.value.year}`);

  const nextMonth = () => {
    if (currentMonth.value.month === 11) {
      currentMonth.value = { month: 0, year: currentMonth.value.year + 1 };
      return;
    }
    currentMonth.value.month++;
  };

  const prevMonth = () => {
    if (currentMonth.value.month === 0) {
      currentMonth.value = { month: 11, year: currentMonth.value.year - 1 };
      return;
    }
    currentMonth.value.month--;
  };

  const setMonth = (month: number, year: number) => {
    currentMonth.value = { month, year };
  };

  return { currentMonth, monthName, monthLabel, nextMonth, prevMonth, setMonth };
}
