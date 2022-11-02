import React from 'react'
import cls from 'classnames'
import s from './Register.module.scss'
import { Button, Input } from '../../components'

const Register = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.formItem}>
                <Input
                    onChange={e => console.log(e.target.value)}
                    value={''}
                    placeHolder={'Set the email address as the login name'}
                    variant={'primary'}
                    type={'text'}
                    helperText={
                        '6 to 20 characters. Only letters, numbers or sumbols'
                    }
                    helperClass={'error'}
                    error={true}
                />
            </div>
            <div className={s.formItem}>
                <Input
                    onChange={e => console.log(e.target.value)}
                    value={''}
                    placeHolder={'Enter the password'}
                    variant={'primary'}
                    type={'password'}
                    helperText={
                        '6 to 20 characters. Only letters, numbers or sumbols'
                    }
                    helperClass={'hint'}
                    error={false}
                />
            </div>
            <div className={s.formItem}>
                <Input
                    onChange={e => console.log(e.target.value)}
                    value={''}
                    placeHolder={'Enter the password again'}
                    variant={'primary'}
                    type={'password'}
                    helperText={
                        '6 to 20 characters. Only letters, numbers or sumbols'
                    }
                    helperClass={'success'}
                    error={false}
                />
            </div>
            <div className={s.formItem}>
                <Input
                    onChange={e => console.log(e.target.value)}
                    value={''}
                    placeHolder={'Enter first and last name'}
                    variant={'primary'}
                    type={'text'}
                    helperText={''}
                    helperClass={'error'}
                    error={false}
                />
            </div>
            <div className={s.formButton}>
                <Button className={s.button}>Sign Up</Button>
            </div>
        </div>
    )
}

export default Register
