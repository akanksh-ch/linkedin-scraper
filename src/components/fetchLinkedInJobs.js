/* test-url: https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=software+engineer&location=London,%20United%20Kingdom */
async function fetchLinkedInJobs(url) {
    const jobsHTML = fetch(url)
    const doc = DOMParser().parseFromString(jobsHTML, 'text/html')
    let final = []
    doc.querySelectorAll('li').forEach(function(elem) {
        let data = {} 
        data.title = elem.querySelector('.base-search-card__title').innerText
        data.company = elem.querySelector('.hidden-nested-link').innerText
        data.location = elem.querySelector('.job-search-card__location').innerText
    })
}