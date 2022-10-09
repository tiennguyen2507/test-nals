import { TSelectOptions } from '@/components/GSelect';

export const pageOptions: TSelectOptions[] = [
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '15', value: '15' },
];

export const softByOptions: TSelectOptions[] = [
  { label: 'id', value: 'id' },
  { label: 'title', value: 'title' },
  { label: 'content', value: 'content' },
  { label: 'created_at', value: 'created_at' },
  { label: 'updated_at', value: 'updated_at' },
];

export const softDirectionOptions: TSelectOptions[] = [
  { label: 'asc', value: 'asc' },
  { label: 'desc', value: 'desc' },
];
