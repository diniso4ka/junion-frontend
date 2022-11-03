import s from './Preloader.module.scss'

export const Preloader = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.loaderWrapper}>
                <div className={s.ldsRoller}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}
