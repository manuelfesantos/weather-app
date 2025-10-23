export type GeoCodingResults = GeoCodingResult[];

export interface GeoCodingResult {
  datasource: Datasource;
  country: string;
  country_code: string;
  city: string;
  iso3166_2: string;
  lon: number;
  lat: number;
  result_type: string;
  formatted: string;
  address_line1: string;
  address_line2: string;
  category: string;
  timezone: Timezone;
  plus_code: string;
  plus_code_short?: string;
  rank: Rank;
  place_id: string;
  bbox: Bbox;
  state?: string;
  postcode?: string;
  ref?: string;
  iso3166_2_sublevel?: string;
  county?: string;
  county_code?: string;
  municipality?: string;
}

export interface Datasource {
  sourcename: string;
  attribution: string;
  license: string;
  url: string;
}

export interface Timezone {
  name: string;
  offset_STD: string;
  offset_STD_seconds: number;
  offset_DST: string;
  offset_DST_seconds: number;
  abbreviation_STD?: string;
  abbreviation_DST?: string;
}

export interface Rank {
  importance: number;
  confidence: number;
  confidence_city_level: number;
  match_type: string;
}

export interface Bbox {
  lon1: number;
  lat1: number;
  lon2: number;
  lat2: number;
}
