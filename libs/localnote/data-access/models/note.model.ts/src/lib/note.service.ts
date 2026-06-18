import { Injectable, resource } from '@angular/core';

export interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
}

@Injectable({ providedIn: 'root' })
export class HolidayService {
  
  holidayResource = resource({
    loader: async () => {
      const response = await fetch('https://date.nager.at/api/v3/PublicHolidays/2025/DE');
      return (await response.json()) as Holiday[];
    },
  });

  constructor() {}
}