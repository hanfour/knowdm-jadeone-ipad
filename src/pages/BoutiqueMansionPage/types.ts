import { ReactNode } from 'react';

export interface EquipmentItem {
  id: string;
  name: string;
  englishName: string;
  icon: ReactNode;
  link: string;
}

export interface EquipmentCategory {
  items: EquipmentItem[];
}
