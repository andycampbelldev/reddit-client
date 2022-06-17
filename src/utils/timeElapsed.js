// calculate how many ms, seconds, minutes, hours, and days have passed from a given date. If below the specified maximum units return string 'n units ago'. Otherwise, return local date string.
const timeElapsed = function(date, maxUnit, maxNumUnits) {
    const response = {}
    response.ms = Date.now() - date;
    response.second = Math.floor(response.ms / 1000);
    response.minute = Math.floor(response.ms / 60000);
    response.hour = Math.floor(response.ms / 3600000);
    response.day = Math.floor(response.ms / 86400000);
    // recommend which unit to use, based on the largest unit of time that is not 0
    response.largestUnit = Object.entries(response).reduce((a,b) => b[1] < a[1] && b[1] > 0 ? b : a)
    // return string using largest units subject to max arguments
    response.toPreferredString = function() {
        return this.largestUnit[0] === maxUnit.toLowerCase() && this.largestUnit[1] > maxNumUnits ? date.toLocaleDateString() : `${this.largestUnit[1]} ${this.largestUnit[0]}${this.largestUnit[1] > 1 ? 's' : ''} ago`
    }
    
    return response;

}

export default timeElapsed;