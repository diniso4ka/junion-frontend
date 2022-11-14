import { IRegisterReqData } from '../../types/auth'
import { superCodeValidationMessages } from 'shared/helpers/validations/messages'
import {
    correctPasswordValidation,
    mailValidation,
    passwordValidation,
    usernameValidation,
} from './helpers'

export const registerValidation = (data: IRegisterReqData) => {
    const { email, password, correctPassword, name, superCode } = data
    const errors = {} as typeof data

    if (!!mailValidation(email)) {
        errors.email = mailValidation(email)
    }

    if (!!passwordValidation(password)) {
        errors.password = passwordValidation(password)
    }

    if (!!correctPasswordValidation(password, correctPassword)) {
        errors.correctPassword = correctPasswordValidation(
            password,
            correctPassword
        )
    }

    if (!!usernameValidation(name)) {
        errors.name = usernameValidation(name)
    }

    if (!superCode) {
        errors.superCode = superCodeValidationMessages.empty
    }

    if (errors && Object.keys(errors).length === 0) {
        return null
    } else {
        return errors
    }
}
