export default class User {

    getUserCredentail(body) {
        return {
            username: body.username,
            password: body.password,
            loginTime: new Date().valueOf()
        }
    }
}