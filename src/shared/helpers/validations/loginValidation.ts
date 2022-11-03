import { mailRegex } from './validationRegex'
import { ILoginReqData } from './types'
import { mailValidationMessages, passwordValidationMessages } from './messages'

export const loginValidation = (data: ILoginReqData) => {
    const { email, password } = data
    const errors = {} as typeof data

    if (email) {
        if (!mailRegex(email)) {
            errors.email = mailValidationMessages.incorrect
        }
    } else {
        errors.email = mailValidationMessages.empty
    }

    if (!password) {
        errors.password = passwordValidationMessages.empty
    }

    if (errors && Object.keys(errors).length === 0) {
        return null
    } else {
        return errors
    }
}
