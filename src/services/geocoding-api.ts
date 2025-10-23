import type { LocationData } from "../types/location.ts";
import type { GeoCodingResults } from "../types/geocoding-api.ts";
import { getQueryString } from "../utils/query-string.ts";

class GeocodingApi {
  private baseUrl = "https://api.geoapify.com/v1/geocode/autocomplete";
  private apiKeys = [
    "def7c57530bb4d5a82a42ef9b4bc5ff8",
    "dccb7b9cd82b4ba0931d6fe89901e31d",
    "a2774cf1c4e44e10a95134ec0f50bd84",
    "abc3a7674465496bbf8e3fcc8c39e2aa",
  ];
  async getLocationResults(text: string): Promise<LocationData[]> {
    const url = `${this.baseUrl}${this.buildQueryParams(text)}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch cities");
    }
    const results = (await response.json()).results as GeoCodingResults;
    return results
      .map((result) => ({
        city: result.city,
        country: result.country,
        longitude: result.lon,
        latitude: result.lat,
      }))
      .filter(({ city }) => !!city);
  }

  private buildQueryParams(text: string): string {
    if (!text) return "";
    const queryParams = {
      apiKey: this.apiKeys[Math.floor(Math.random() * this.apiKeys.length)],
      type: "city",
      text: encodeURIComponent(text),
      format: "json",
    };
    return getQueryString(queryParams);
  }
}

export const geocodingApi = new GeocodingApi();
