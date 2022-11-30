import { IRegisterReqData } from '../../types/auth'
import { superCodeValidationMessages } from 'shared/helpers/validations/messages'
import {
    correctPasswordValidation,
    mailValidation,
    passwordValidation,
    usernameValidation,
} from './helpers'

export const registerValidation = (data: IRegisterReqData) => {
    const { mail, password, confirmPassword, name, superCode } = data
    const errors = {} as typeof data

    if (!!mailValidation(mail)) {
        errors.mail = mailValidation(mail)
    }

    if (!!passwordValidation(password)) {
        errors.password = passwordValidation(password)
    }

    if (!!correctPasswordValidation(password, confirmPassword)) {
        errors.confirmPassword = correctPasswordValidation(
            password,
            confirmPassword
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
