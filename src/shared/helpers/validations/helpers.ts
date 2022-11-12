import { mailRegex, passwordRegex, usernameRegex } from './validationRegex'
import {
    mailValidationMessages,
    nameValidationMessages,
    passwordValidationMessages,
} from './messages'

export const mailValidation = (mail: string) => {
    let error
    if (mail) {
        if (!mailRegex(mail)) {
            error = mailValidationMessages.incorrect
            return error
        }
    } else {
        error = mailValidationMessages.empty
        return error
    }
}

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

export const usernameValidation = (username: string) => {
    let error
    if (username) {
        if (!usernameRegex(username)) {
            error = nameValidationMessages.incorrect
            return error
        }
    } else {
        error = nameValidationMessages.empty
        return error
    }
}
