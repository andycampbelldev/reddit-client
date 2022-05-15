// return how much time has elapsed from a given epoch date (milliseconds) in seconds, minutes, hours and days
const timeElapsed = date => {
    const response = {}
    response.ms = Date.now() - date;
    response.second = Math.floor(response.ms / 1000);
    response.minute = Math.floor(response.ms / 60000);
    response.hour = Math.floor(response.ms / 3600000);
    response.day = Math.floor(response.ms / 86400000);
    // recommend which unit to use, based on the largest unit of time that is not 0
    response.largestUnit = Object.entries(response).reduce((a,b) => b[1] < a[1] && b[1] > 0 ? b : a)
    
    return response;

}

export default timeElapsed;