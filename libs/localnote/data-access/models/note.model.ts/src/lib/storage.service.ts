import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  save<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  load<T>(key: string, defaultValue: T): T {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  }
}