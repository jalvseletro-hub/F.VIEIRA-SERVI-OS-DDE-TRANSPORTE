import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function cleanObject<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => cleanObject(item)) as unknown as T;
  }

  const result = { ...obj } as any;
  Object.keys(result).forEach((key) => {
    if (result[key] === undefined) {
      delete result[key];
    } else if (result[key] !== null && typeof result[key] === 'object') {
      result[key] = cleanObject(result[key]);
    }
  });
  return result;
}
