/**
 * localStorage存储用户认证信息
 */

const TokenKey = 'Authorization';

const NickNameKey = 'nikeName'

const UidKey = 'uid'

const RoleKey = 'role'

// token
export const getToken = () => {
    return localStorage.getItem(TokenKey)
}

export const setToken = (token) => {
    return localStorage.setItem(TokenKey, token);
}

export const removeToken = () => {
    localStorage.removeItem(TokenKey)
}

// nickName
export const getNickName = () => {
    return localStorage.getItem(NickNameKey);
}

export const setNickName = (nickName) => {
    localStorage.setItem(NickNameKey, nickName)
}

export const removeNickName = () => {
    localStorage.removeItem(NickNameKey)
}

// uid
export const getUid = () => {
    return localStorage.getItem(UidKey)
}

export const setUid = (uid) => {
    localStorage.setItem(UidKey, uid)
}

export const removeUid = () => {
    localStorage.removeItem(UidKey)
}

// role
export const getRole = () => {
    return localStorage.getItem(RoleKey)
}

export const setRole = (role) => {
    localStorage.setItem(RoleKey, role)
}

export const removeRole = () => {
    localStorage.removeItem(RoleKey)
}


