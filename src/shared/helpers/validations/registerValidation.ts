import { mailRegex, passwordRegex, usernameRegex } from './validationRegex'
import { IRegisterReqData } from './types'
import {
    mailValidationMessages,
    passwordValidationMessages,
} from 'shared/config/messages'

export const registerValidation = (data: IRegisterReqData) => {
    const { email, password, correctPassword, name } = data
    const errors = {} as typeof data

    if (email) {
        if (!mailRegex(email)) {
            errors.email = mailValidationMessages.incorrect
        }
    } else {
        errors.email = mailValidationMessages.empty
    }

    if (password) {
        if (!passwordRegex(password)) {
            errors.password = passwordValidationMessages.incorrect
        }
    } else {
        errors.password = passwordValidationMessages.empty
    }

    if (correctPassword) {
        if (!(password === correctPassword)) {
            errors.correctPassword =
                'The two passwords you entered are inconsistent. Enter again'
        }
    } else {
        errors.correctPassword =
            'The two passwords you entered are inconsistent. Enter again'
    }

    if (name) {
        if (!usernameRegex(name)) {
            errors.name = 'Please enter 1-60 alphabetical characters'
        }
    } else {
        errors.name = 'Please enter 1-60 alphabetical characters'
    }

    if (errors && Object.keys(errors).length === 0) {
        return null
    } else {
        return errors
    }
}
