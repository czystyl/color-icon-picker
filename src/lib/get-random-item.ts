import type { IconPickerData } from '@/components/icon-picker';
import type { IconName } from 'lucide-react/dynamic';
import { iconsData } from './icons-data';
import { defaultColors } from './default-colors';

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function getRandomIcon(): IconPickerData {
  return {
    name: getRandomItem(iconsData).name as IconName,
    color: getRandomItem(defaultColors).color,
  };
}
