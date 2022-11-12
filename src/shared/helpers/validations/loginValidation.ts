import { ILoginReqData } from '../../types/auth'
import { mailValidation } from './helpers'
import { passwordValidationMessages } from './messages'

export const loginValidation = (data: ILoginReqData) => {
    const { email, password } = data
    const errors = {} as typeof data

    if (!!mailValidation(email)) {
        errors.email = mailValidation(email)
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
