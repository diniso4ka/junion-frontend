import { mailRegex, passwordRegex } from './validationRegex'
import { ILoginReqData } from './types'

export const loginValidation = (data: ILoginReqData) => {
    const { email, password } = data
    const errors = {} as typeof data

    if (email) {
        if (!mailRegex(email)) {
            errors.email = 'Specify correct email address'
        }
    } else {
        errors.email = 'Please, enter the email address'
    }

    if (password) {
        if (!passwordRegex(password)) {
            errors.password = 'Please, enter the correct password'
        }
    } else {
        errors.password = 'Please, enter the password'
    }

    if (errors && Object.keys(errors).length === 0) {
        return null
    } else {
        return errors
    }
}
