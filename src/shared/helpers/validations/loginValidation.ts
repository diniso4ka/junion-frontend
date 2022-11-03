import { mailRegex, passwordRegex } from './validationRegex'
import { ILoginReqData } from './types'

export const loginValidation = (data: ILoginReqData) => {
    const { email, password } = data
    const errors = {} as typeof data

    if (email) {
        if (!mailRegex(email)) {
            errors.email = 'Your email address  is incorrect'
        }
    } else {
        errors.email = 'Please, enter the email address'
    }

    if (!password) {
        errors.password = 'Please, enter the password'
    }

    if (errors && Object.keys(errors).length === 0) {
        return null
    } else {
        return errors
    }
}
