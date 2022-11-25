import s from './CustomCheckbox.module.scss'

const CustomCheckbox = () => {
    return (
        <>
            <input type='checkbox' className={s.real} />
            <span className={s.custom}></span>
        </>
    )
}

export default CustomCheckbox
