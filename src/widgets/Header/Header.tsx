import cls from 'classnames';
import { useRef, useState } from 'react';

import { useLocation, useNavigate } from 'react-router';
import { Link as LinkButton } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/store/config/StateSchema';
import { getAuthData, getInitialize } from 'entities/User';
import { thunkLogout } from 'entities/User/model/services/Logout';
import { ProfileMenu } from 'entities/User/ui/ProfileMenu/ProfileMenu';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { useClickOutside } from 'shared/hooks/useClickOutside';
import { Link } from 'shared/ui';

import arrow from 'shared/assets/images/icons/Arrow.svg';
import logo from 'shared/assets/images/logo/logo-header.svg';
import avatar from 'shared/assets/images/user/User.svg';

import s from './Header.module.scss';

interface HeaderProps {
	onClick?: (e) => void;
}

const Header: React.FC<HeaderProps> = ({ onClick }) => {
	const [profileIsOpen, setProfileIsOpen] = useState(false);
	const navigate = useNavigate();
	const authData = useAppSelector(getAuthData);
	const initialize = useAppSelector(getInitialize);
	const dispatch = useAppDispatch();
	const location = useLocation();
	const links = [
		{ label: 'Log In', path: routeConfig.LOGIN },
		{ label: 'Sign Up', path: routeConfig.REGISTER },
	];

	const ref = useRef();
	useClickOutside(ref, () => setProfileIsOpen(false));
	const onClickLogout = async () => {
		dispatch(thunkLogout());
		navigate(routeConfig.HOME);
		setProfileIsOpen(false);
	};
	const onClickChangePassword = async () => {
		setProfileIsOpen(false);
	};

	if (authData) {
		return (
			<header className={s.wrapper}>
				<div className={s.contentWrapper}>
					<LinkButton to={routeConfig.HOME}>
						<div className={s.image}>
							<img src={logo} alt='Logo' />
						</div>
					</LinkButton>
					<nav ref={ref} className={s.links}>
						<div onClick={onClick} className={s.user}>
							<div className={s.userInfo}>
								<img src={avatar} />
								<label>{authData.name}</label>
							</div>
							<img
								onClick={() => setProfileIsOpen(!profileIsOpen)}
								className={cls(s.arrow, {
									[s.arrowRotated]: profileIsOpen,
								})}
								src={arrow}
							/>
						</div>
						<ProfileMenu
							data={authData}
							onClickLogout={onClickLogout}
							isOpened={profileIsOpen}
							onClickChangePassword={onClickChangePassword}
						/>
					</nav>
				</div>
			</header>
		);
	}

	return (
		<header className={s.wrapper}>
			<div className={s.contentWrapper}>
				<LinkButton to={routeConfig.HOME}>
					<div className={s.image}>
						<img src={logo} alt='Logo' />
					</div>
				</LinkButton>
				<nav className={s.links}>
					{initialize &&
						links.map((link) => (
							<div key={link.path} className={s.navItem}>
								<Link variant={'clear'} to={link.path}>
									{link.label}
								</Link>
							</div>
						))}
				</nav>
			</div>
		</header>
	);
};

export default Header;
