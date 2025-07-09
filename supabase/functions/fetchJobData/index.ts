// 'Supabase Edge Function: Fetch LinkedIn jobs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { DOMParser } from "jsr:@b-fuze/deno-dom";
import { AuthAdminApi, createClient } from 'npm:@supabase/supabase-js'

console.info("Server started");

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  
  // initialise supabase client
  const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const {keywords, location}: {keywords: string, location: string}
  = await req.json();
  
  const url = "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search";
  
  const final_url = `${url}/?keywords=${keywords.toLowerCase().split(' ').join('+')}&location=${encodeURI(location)}`;

  const jobsFetched = await(await fetch(final_url)).text();
  const doc = new DOMParser().parseFromString(jobsFetched, 'text/html');
  const jobs = doc.querySelectorAll('li');

  const final = [] 
  
  interface info {
    title: string,
    company: string,
    location: string, 
    url: string ,
    description: string
  }
  
  for(let i = 0; i < jobs.length; i++) {
    const info:info  = {title: '', company: '', location: '', url: '', description: ''};
    info.title = jobs[i].querySelector('.base-search-card__title')?.innerText ?? 'No title found';
    info.company = jobs[i].querySelector('.hidden-nested-link')?.innerText ?? 'No company found';
    info.location = jobs[i].querySelector('.job-search-card__location')?.innerText ?? 'No Location found';

    const jobsDescUrl: string = jobs[i].querySelector('a')?.getAttribute('href')?.match(/^[^?]+/)?.[0] ?? 'https://example.com';
    info.url = jobsDescUrl;
    
    // Job description
    const jobsDescFetched = await(await fetch(jobsDescUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "text/html",
      },
    })).text();
    const jobsDescDoc = new DOMParser().parseFromString(jobsDescFetched, 'text/html');
    info.description = jobsDescDoc.querySelector('.show-more-less-html')?.innerText || 'No job description found';

    // to get rid of show more/less and remove excess white space and newlines
    for (const [key, value] of Object.entries(info)) {
      info[key as keyof typeof info] = value
      .replace(/Show more|Show less/gi, "")
      //.replace(/\s+/g, " ")
      .trim();
    }
    
    final.push(info)
  }

  // Insert listing into table for later use
  const { data: listingData, error: listingError } =  await supabase
  .from('linkedin_listings')
  .upsert(final, { onConflict: 'url'})
  .select()
  
  if (listingError) { 
    console.error(listingError)
  }
  
  interface query_data {
    listing_id: number,
    role: string,
    location: string,
    user_id: string,
  }
  
  const { data: authData } = await supabase.auth.getUser(req.headers.get('Authorization')!.replace('Bearer ', ''))

  const queryData: Array<query_data> = listingData?.map(listing => {
    const query: query_data =  {
      listing_id: listing.id,
      location: listing.location,
      role: listing.title,
      user_id: authData!.user!.id
    }

    return query
  }) ?? []

  const { data: queryDataReturned, error: queryError } = await supabase
  .from('queries')
  .insert(queryData)
  .select()
  
  console.log('query data inserted successfully', queryDataReturned)

  if (queryError) {
    console.error(queryError)
  }

  return new Response(JSON.stringify(final), { headers: {...corsHeaders, 'Content-Type': 'application/json' } })
})