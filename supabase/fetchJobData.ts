// 'Supabase Edge Function: Fetch LinkedIn jobs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { DOMParser } from "jsr:@b-fuze/deno-dom";
console.info("Server started");

Deno.serve(async (req) => {
  const {keywords, location}: {keywords: string, location: string}
  = await req.json();
  
  const url = "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search";
  
  const final_url = `${url}/?keywords=${keywords.toLowerCase().split(' ').join('+')}&location=${encodeURI(location)}`;

  const jobsFetched = await(await fetch(final_url)).text();
  const doc = new DOMParser().parseFromString(jobsFetched, 'text/html');
  const jobs = doc.querySelectorAll('li');

  const final = [] 
  
  for(let i = 0; i < jobs.length; i++) {
    const info: {title: string, company: string, location: string, description: string} = {title: '', company: '', location: '', description: ''};
    info.title = jobs[i].querySelector('.base-search-card__title')?.innerText ?? 'No title found';
    info.company = jobs[i].querySelector('.hidden-nested-link')?.innerText ?? 'No company found';
    info.location = jobs[i].querySelector('.job-search-card__location')?.innerText ?? 'No Location found';

    const jobsDescUrl: string = jobs[i].querySelector('a')?.getAttribute('href')?.match(/^[^?]+/)?.[0] ?? 'https://example.com';
    const jobsDescFetched = await(await fetch(jobsDescUrl)).text();
    const jobsDescDoc = new DOMParser().parseFromString(jobsDescFetched, 'text/html');
    info.description = jobsDescDoc.querySelector('.show-more-less-html')?.innerText        
    // to get rid of show more/less and remove excess white space and newlines
      .replace(/Show more|Show less/gi, "")
      .replace(/\s+/g, " ")
      .replace(/\n/g, " ")
      .trim()
      ?? 'No job description found';
    
    final.push(info)
  }

  return new Response(JSON.stringify(final), { headers: { 'Content-Type': 'application/json' } })
})