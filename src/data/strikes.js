
// api stuff

const API_URL = "https://api.dronestre.am/data"

// get all the strikes
export async function getAllStrikes() {
    try {
    const response = await fetch(API_URL)
        if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
        }
    const data = await response.json()
        return data
  } catch (error) {
        console.error("Error fetching strikes:", error)
    return []
    }
}

// find strike by slug
export async function getStrikeBySlug(slug) {
    const strikes = await getAllStrikes()
  const found = strikes.find(s => s.slug === String(slug))
    if (found) {
    return found
    } else {
        return null
  }
}

// countries list
export async function getCountries() {
  const strikes = await getAllStrikes()
  
    // get unique countries
  let countries = []
    for (let i = 0; i < strikes.length; i++) {
    if (!countries.includes(strikes[i].country)) {
        countries.push(strikes[i].country)
    }
    }
  
    countries.sort()
  return countries
}

// get strikes for one country
export async function getStrikesByCountry(country) {
    const strikes = await getAllStrikes()
  let result = []
    for (let s of strikes) {
        if (s.country === country) {
      result.push(s)
        }
  }
    return result
}

// latest strike
export async function getLatestStrike() {
  const strikes = await getAllStrikes()
    if (strikes.length === 0) {
    return null
    }
  
    // sort by date descending
  let sorted = strikes.sort((a, b) => b.date - a.date)
    return sorted[0]
}

// format date helper
export function formatDate(timestamp) {
    if (!timestamp) {
    return "Unknown date"
    }
  const d = new Date(timestamp)
    return d.toLocaleDateString("en-US", {
    year: "numeric",
        month: "long", 
    day: "numeric"
    })
}

// the api returns weird stuff sometimes so this helps
function safeParseInt(value) {
    if (value === null || value === undefined || value === "") {
    return 0
    }
  const parsed = parseInt(value, 10)
    if (isNaN(parsed)) {
    return 0
    }
  return parsed
}

// stats for homepage
export async function getStats() {
    const strikes = await getAllStrikes()
  
    const totalStrikes = strikes.length
  
    // count countries
  let countryList = []
    strikes.forEach(s => {
    if (!countryList.includes(s.country)) {
        countryList.push(s.country)
    }
    })
  const countryCount = countryList.length
  
    // add up deaths and stuff
  let totalDeaths = 0
    let totalCivilians = 0
  let totalChildren = 0
  
    for (let i = 0; i < strikes.length; i++) {
    let s = strikes[i]
        totalDeaths = totalDeaths + safeParseInt(s.deaths_min)
    totalCivilians = totalCivilians + safeParseInt(s.civilians)
        totalChildren = totalChildren + safeParseInt(s.children)
  }
  
    return {
    totalStrikes: totalStrikes,
        countryCount: countryCount,
    totalDeaths: totalDeaths,
        totalCivilians: totalCivilians,
    totalChildren: totalChildren
    }
}
