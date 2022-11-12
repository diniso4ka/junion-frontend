import { mailRegex } from './validationRegex'
import { ILoginReqData } from '../../types/auth'
import { mailValidation, passwordValidation } from './helpers'

export const loginValidation = (data: ILoginReqData) => {
    const { email, password } = data
    const errors = {} as typeof data

    if (!!mailValidation(email)) {
        errors.email = mailValidation(email)
    }

    if (!!passwordValidation(password)) {
        errors.password = passwordValidation(password)
    }

    if (errors && Object.keys(errors).length === 0) {
        return null
    } else {
        return errors
    }
}
