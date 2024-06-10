import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private countries = [
    { code: '+1', name: 'USA', flag: 'assets/icons/countries/usa.svg', mask: '(000) 000-0000' },
    { code: '+44', name: 'UK', flag: 'assets/icons/countries/uk.svg', mask: '00 00 00 00 00' },
    { code: '+55', name: 'BR', flag: 'assets/icons/countries/br.svg', mask: '(00) 00000-0000' },
    { code: '+61', name: 'AUS', flag: 'assets/icons/countries/aus.svg', mask: '00 0000 0000' },
    { code: '+91', name: 'IND', flag: 'assets/icons/countries/ind.svg', mask: '0000 000 0000' },
    { code: '+81', name: 'JPN', flag: 'assets/icons/countries/jpn.svg', mask: '0000-0000-0000' },
    { code: '+33', name: 'FRA', flag: 'assets/icons/countries/fra.svg', mask: '00 00 00 00 00' },
    { code: '+49', name: 'GER', flag: 'assets/icons/countries/ger.svg', mask: '00 0000 0000 00' },
    { code: '+39', name: 'ITA', flag: 'assets/icons/countries/ita.svg', mask: '00 0000000000' },
    { code: '+86', name: 'CHN', flag: 'assets/icons/countries/chn.svg', mask: '0000-0000-0000-000' },
    { code: '+27', name: 'SA', flag: 'assets/icons/countries/sa.svg', mask: '00 00 00 00 00' },
    { code: '+54', name: 'ARG', flag: 'assets/icons/countries/arg.svg', mask: '00 0000 0000' },
    { code: '+57', name: 'COL', flag: 'assets/icons/countries/col.svg', mask: '000 000 0000' },
    { code: '+20', name: 'EGY', flag: 'assets/icons/countries/egy.svg', mask: '000 000000' },
    { code: '+64', name: 'NZL', flag: 'assets/icons/countries/nzl.svg', mask: '00 0000 0000' },
    { code: '+353', name: 'IRL', flag: 'assets/icons/countries/irl.svg', mask: '00 000 0000' },
    { code: '+380', name: 'UKR', flag: 'assets/icons/countries/ukr.svg', mask: '00 000 000 00 00' },
    { code: '+81', name: 'KOR', flag: 'assets/icons/countries/kor.svg', mask: '000-0000-0000' },
    { code: '+7', name: 'RUS', flag: 'assets/icons/countries/rus.svg', mask: '000 000 00 00' },
    { code: '+1', name: 'CAN', flag: 'assets/icons/countries/can.svg', mask: '000 000 0000' },
    { code: '+81', name: 'JPN', flag: 'assets/icons/countries/jpn.svg', mask: '0000-0000-0000' },
  ];

  getDefaultCountry() {
    return this.countries.find(country => country.code === '+55');
  }

  getCountryByCode(code: string) {
    return this.countries.find(country => country.code === code);
  }

  getAllCountries() {
    return this.countries;
  }
}
