
export const addDay = (days) => {
    //创建date
    let nowDate = new Date();
    //添加天数
    nowDate.setDate(nowDate.getDate() + days);
    //返回
    return nowDate
}

export const addMonth= (months) => {
    //创建date
    let nowDate = new Date();
    //添加周数
    nowDate.setMonth(nowDate.getMonth() + months);
    //返回
    return nowDate
}

export const addYear= (years) => {
    //创建date
    let nowDate = new Date();
    //添加年数
    nowDate.setMonth(nowDate.getYear() + years);
    //返回
    return nowDate
}

export const dateFormat = (fmt, date) => {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}