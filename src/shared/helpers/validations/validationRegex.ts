export const mailRegex = (mail: string | undefined) => {
    if (mail) {
        return mail
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    }
}

export const passwordRegex = (password: string | undefined) => {
    if (password) {
        return password.match(
            /^.*(?=.{6,20})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/
        )
    }
}
