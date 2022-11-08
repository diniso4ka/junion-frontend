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
        return {
            valid: password.match(
                /^.*(?=.{6,20})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%.?/&!-]).*$/
            ),
            tabs: /\s/g.test(password),
        }
    }
}

export const usernameRegex = (username: string | undefined) => {
    console.log(username)
    if (username) {
        const splitOnSybmolsUsername = username.split('')
        if (
            splitOnSybmolsUsername.length > 20 ||
            splitOnSybmolsUsername.length < 3
        ) {
            return false
        }

        const splitOnWordsUsername = username.split(' ')
        if (splitOnWordsUsername.length > 3) {
            return false
        }

        const splitUsername = username.toLowerCase().split(' ')
        const capitalizeFirstLetter = splitUsername.map(
            item => item.charAt(0).toUpperCase() + item.slice(1)
        )
        return capitalizeFirstLetter
    }
}
