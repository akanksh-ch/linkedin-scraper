/* test-url: https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=software+engineer&location=London,%20United%20Kingdom */
async function fetchLinkedInJobs(url) {
    const jobsHTML = fetch(url)
    const doc = DOMParser().parseFromString(jobsHTML, 'text/html')
    let final = []
    const jobs = doc.querySelectorAll('li')
    for (let i = 0; i < jobs.length; i++) {
        let data = {} 
        data.title = jobs[i].querySelector('.base-search-card__title').innerText
        data.company = jobs[i].querySelector('.hidden-nested-link').innerText
        data.location = jobs[i].querySelector('.job-search-card__location').innerText
        /* url.match(/^[^?]+/) */
        const job_descHTML = await fetch(jobs[i].querySelector('a').href.match(/^[^?]+/))
        const dec_parser = DOMParser().parseFromString(job_descHTML)
        data.description = dec_parser.querySelector('.show-more-less-html').innerText
    }
    
    return final
}

// test

console.log(fetchLinkedInJobs('https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=software+engineer&location=London,%20United%20Kingdom'))