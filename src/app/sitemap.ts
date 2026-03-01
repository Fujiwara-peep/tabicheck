import { MetadataRoute } from 'next';
import { getAllCountries } from '@/lib/supabase';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://tabicheck.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const countries = await getAllCountries();

  const countryUrls = countries.map((country) => ({
    url: `${BASE_URL}/country/${country.country_code.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/countries`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...countryUrls,
  ];
}
