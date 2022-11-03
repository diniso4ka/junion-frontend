import { mailRegex, passwordRegex, usernameRegex } from './validationRegex'
import { IRegisterReqData } from './types'
import {
    mailValidationMessages,
    passwordValidationMessages,
} from 'shared/helpers/validations/messages'
import { errors } from 'workbox-build/build/lib/errors'

export const passwordValidation = (password: string) => {
    let error
    if (password) {
        if (!passwordRegex(password)) {
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
            errors.correctPassword = passwordValidationMessages.correct
        }
    } else {
        errors.correctPassword = passwordValidationMessages.correct
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
