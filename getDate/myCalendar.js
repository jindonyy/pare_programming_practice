module.exports = class MyCalendar {
    getToday() {
        const now = new Date();
        const today = {
            year: now.getFullYear(),
            month: now.getMonth(),
            date: now.getDate(),
            hour: now.getHours(),
            minute: now.getMinutes(),
            second: now.getSeconds()
        };
        return today;
    }

    inputStrDate(str) {
        if(this.isStrErr(str)) return '날짜를 확인해주세요!';
        return new Date(str);
    }

    inputNumDate(year, month, date) {
        if(arguments.length < 3 || this.isYearErr(year) || this.isMonthErr(month) || this.isDateErr(date)) return '날짜를 확인해주세요!';
        return new Date(year, month, date);
    }

    getKoreaDate(newDate) {
        if(typeof newDate !== 'object') return '입력 형식을 확인해주세요!';
        return newDate.toLocaleString();
    }
    
    getDay(year, month) {
        if(arguments.length < 2 || this.isYearErr(year) || this.isMonthErr(month)) return '날짜를 확인해주세요!';
        const dayArr = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        const dayIdx = new Date(year,month).getDay();
        return dayArr[dayIdx];
    }

    calcDate(year, month) {
        if(arguments.length < 2 || this.isMonthErr(month)) return '날짜를 확인해주세요!';
        const weekArr = [];
        let dayArr = [];
        for(let day = 1; day <= this.getDateLength(year, month); day++) {
            dayArr.push(day);
            if(day % 7 === 0) {
                weekArr.push(dayArr);
                dayArr = [];
            }
        }
        weekArr.push(dayArr);
        return weekArr;
    }

    isYearErr(year) {
        if(year < 1970) return true;
    }

    isMonthErr(month) {
        if(month < 1 || month > 12) return true;
    }

    isDateErr(year, month, date) {
        const dateLength = this.getDateLength(year, month);
        if(date < 1 || date > dateLength) return true;
    }

    isStrErr(str) {
        if(str.length !== 10) return true;
        const strArr = str.split(/[-.\/]/g);
        if(this.isYearErr(strArr[0]) || this.isMonthErr(strArr[1]) || this.isDateErr(strArr[2])) return true;
    }

    getDateLength(year, month) {
        const dateLength = {
            1: 31,
            2: 28,
            3: 31,
            4: 30,
            5: 31,
            6: 30,
            7: 31,
            8: 31,
            9: 30,
            10: 31,
            11: 30,
            12: 31
        };
        if(year % 4 === 0) dateLength[2] = 29;

        return dateLength[month];
    }
}