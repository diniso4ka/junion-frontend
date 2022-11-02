import { mailRegex, passwordRegex, usernameRegex } from './validationRegex'
import { IRegisterReqData } from './types'

export const registerValidation = (data: IRegisterReqData) => {
    const { email, password, correctPassword, username } = data
    const errors = {} as typeof data

    if (email) {
        if (!mailRegex(email)) {
            errors.email = 'Your email address  is incorrect'
        }
    } else {
        errors.email = 'Please, enter the email address'
    }

    if (password) {
        if (!passwordRegex(password)) {
            errors.password =
                'The password setting does not meet the requirements'
        }
    } else {
        errors.password = 'Please, enter the password'
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

    if (username) {
        if (!usernameRegex(username)) {
            errors.username = 'Please enter 1-60 alphabetical characters'
        }
    } else {
        errors.username = 'Please enter 1-60 alphabetical characters'
    }

    if (errors && Object.keys(errors).length === 0) {
        return null
    } else {
        return errors
    }
}