import { Injectable, resource, signal } from '@angular/core';

export interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
}

@Injectable({ providedIn: 'root' })

export class HolidayService {


  year = signal('2025');
  country = signal('DE');

  holidayResource = resource({
      params: () => ({ y: this.year(), c: this.country() }), 

    loader: async ({params}) => {
      const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${params.y}/${params.c}`);
      if (!response.ok) throw new Error('ERROR');
      return await response.json();
    },
  });
}


