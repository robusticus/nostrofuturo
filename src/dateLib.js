// Utility routines that are common 
class DateLib {

    static monthDiff(d1, d2) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months += d2.getMonth() - d1.getMonth();
        return months;
    }

    // Now versus start of algorithm run
    static numMonths(startDate) {
        var monthDiff = this.monthDiff(new Date(startDate), new Date(Date.now()));
        var years = Math.trunc(monthDiff / 12);
        var months = monthDiff % 12;
        return years + "," + months;
    }
}

export default DateLib;