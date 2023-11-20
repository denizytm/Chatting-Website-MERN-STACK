
export const server = "http://localhost:8000"

export const registerRoute = `${server}/api/auth/register`
export const loginRoute = `${server}/api/auth/login`
export const setAvatarRoute = `${server}/api/auth/setAvatar`
export const getUserRoute = `${server}/api/auth/getUsers/user`
export const getUsersRoute = `${server}/api/auth/getUsers/users`
export const setUsersRoute = `${server}/api/auth/setUsers/users`
export const getRequestsRoute = `${server}/api/auth/getUsers/requests`
export const getLastMessagesRoute = `${server}/api/messages/getLastMsg`
export const getMessagesRoute = `${server}/api/messages/getMsg`
export const sendMessageRoute = `${server}/api/messages/sendMsg`
export const deleteMessageRoute = `${server}/api/messages/deleteMsg`
export const sendPhotoRoute = `${server}/api/photos/sendPhoto`
export const setBackgroundRoute = `${server}/api/auth/setImages/setBackgroundImage`
export const setProfileImageRoute = `${server}/api/auth/setImages/setProfileImage`
export const logOutRoute = `${server}/api/auth/logout`