import fetch from "../config/fetch";
/**
 * 登录
 */
export const login = data => fetch("/user/login", data, "POST");

/**
 * 根据邮箱获取用户信息
 */
export const findOneByEmail = data => fetch("/user/findOne", data)

/**
 * 发送验证码
 */
export const sendCode = data => fetch("/email/send", data, "POST")

/**
 * 注册用户
 */
export const registerUser = data => fetch("/user/addUser", data, "POST")

/**
 * 获取已上线的网站类型
 * 
 */
export const findAllByOnLine = () => fetch("/websiteType/findAllByOnLine")

/**
 * 根据网站类型查询已上线的网站总名称
 */
export const findTitleByTypeId = data => fetch("/contentName/findByTypeIdAndOnLine", data)

/**
 * 根据网站总名称id查询已上线的网站信息
 */
export const findWebsiteByTitle = data => fetch("/website/findByContentIdAndOnLine", data)

/**
 * 上传网站信息 
 */
export const uploadWebsite = data => fetch("/userUrl/addUserUrl", data, "POST")

/**
 * 查询所有已上线的网站信息
 */
export const findAllIsOnLine = data => fetch("/website/findAllIsOnLine", data)