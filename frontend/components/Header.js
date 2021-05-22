import { useState } from 'react';
import { APP_NAME } from '../config';
import Link from 'next/link';
import { signout, isAuth } from '../actions/auth';
import Router from 'next/router';

import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText,
} from 'reactstrap';

const Header = (props) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar color="light" light expand="md">
				<Link href="/">
					<NavLink className="font-weight-bold">{APP_NAME}</NavLink>
				</Link>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						{!isAuth() && (
							<>
								<NavItem>
									<NavLink>
										<Link href="/signin">
											<a>Signin</a>
										</Link>
									</NavLink>
								</NavItem>
								<NavItem>
									<NavLink>
										<Link href="/signup">
											<a>Signup</a>
										</Link>
									</NavLink>
								</NavItem>
							</>
						)}
						{/* {JSON.stringify(isAuth())} */}
						{isAuth() && (
							<NavItem>
								<NavLink
									onClick={() => {
										signout(() => {
											Router.replace('/signin');
										});
									}}
								>
									<Link href="/signin">
										<a>Signout</a>
									</Link>
								</NavLink>
							</NavItem>
						)}
					</Nav>
					<NavbarText>Learning fullstack</NavbarText>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default Header;
