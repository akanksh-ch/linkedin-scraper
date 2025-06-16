// 'Supabase Edge Function: Fetch LinkedIn jobs
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
console.info("Server started");
Deno.serve(async (req) => {
  // Parse client JSON input
  const { url } = await req.json();
  // Call job scraping function
  const jobs = await fetchLinkedInJobs(url);
  // Return as JSON response
  return new Response(JSON.stringify(jobs), {
    headers: {
      "Content-Type": "application/json",
    },
  });
});
// Async LinkedIn scraper function using deno_dom
async function fetchLinkedInJobs(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    },
  });
  const jobsHTML = await res.text();
  const doc = new DOMParser().parseFromString(jobsHTML, "text/html");
  if (!doc) return [];
  const final = [];
  const jobs = doc.querySelectorAll("li");
  for (let i = 0; i < jobs.length; i++) {
    const data = {};
    data.title =
      jobs[i].querySelector(".base-search-card__title")?.textContent.trim() ||
      "";
    data.company =
      jobs[i].querySelector(".hidden-nested-link")?.textContent.trim() || "";
    data.location =
      jobs[i].querySelector(".job-search-card__location")?.textContent.trim() ||
      "";
    const linkHref =
      jobs[i].querySelector("a")?.getAttribute("href")?.match(/^[^?]+/)?.[0] ||
      "";
    if (linkHref) {
      const jobDescRes = await fetch(linkHref, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        },
      });
      const jobDescHTML = await jobDescRes.text();
      const descDoc = new DOMParser().parseFromString(jobDescHTML, "text/html");
      data.description =
        descDoc?.querySelector(".show-more-less-html")?.textContent.replace(
          /Show more|Show less/gi,
          "",
        ).replace(/\s+/g, " ").trim() || "";
    } else {
      data.description = "";
    }
    final.push(data);
  }
  return final;
}
