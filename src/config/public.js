/**
 * 获取当前时间格式化
 */
export const getTime = () => {
    let date = new Date()
    return date.getFullYear() + "-" +
        (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + date.getMinutes()
}

/**
 * 生成验证码
 */
export const createVerificationCode = () => {
    var verificationCode = ""
    for (let i = 0; i < 6; i++)
        verificationCode += Math.floor(Math.random() * 10);
    return verificationCode
}