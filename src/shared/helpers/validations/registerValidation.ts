import { mailRegex, passwordRegex, usernameRegex } from './validationRegex'
import { IRegisterReqData } from './types'
import {
    mailValidationMessages,
    nameValidationMessages,
    passwordValidationMessages,
    superCodeValidationMessages,
} from 'shared/helpers/validations/messages'

export const passwordValidation = (password: string) => {
    let error
    if (password) {
        const { valid, tabs } = passwordRegex(password)
        if (!valid || tabs) {
            error = passwordValidationMessages.incorrect
            return error
        }
    } else {
        error = passwordValidationMessages.empty
        return error
    }
}

export const correctPasswordValidation = (
    password: string,
    correctPassword: string
) => {
    let error
    if (correctPassword) {
        if (!(password === correctPassword)) {
            error = passwordValidationMessages.correct
            return error
        }
    } else {
        error = passwordValidationMessages.correct
        return error
    }
}

export const registerValidation = (data: IRegisterReqData) => {
    const { email, password, correctPassword, name, superCode } = data
    const errors = {} as typeof data

    if (email) {
        if (!mailRegex(email)) {
            errors.email = mailValidationMessages.incorrect
        }
    } else {
        errors.email = mailValidationMessages.empty
    }

    if (password) {
        errors.password = passwordValidation(password)
    }

    if (correctPassword) {
        if (!(password === correctPassword)) {
            errors.correctPassword = passwordValidationMessages.correct
        }
    } else {
        errors.correctPassword = passwordValidationMessages.correct
    }

    if (name) {
        if (!usernameRegex(name)) {
            errors.name = nameValidationMessages.incorrect
        }
    } else {
        errors.name = nameValidationMessages.incorrect
    }

    if (!superCode) {
        errors.superCode = superCodeValidationMessages.incorrect
    }

    if (errors && Object.keys(errors).length === 0) {
        return null
    } else {
        return errors
    }
}
