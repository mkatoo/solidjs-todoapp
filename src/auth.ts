import { createSignal } from "solid-js";
import { User } from "./User";

const USER_COOKIE_NAME = "user_data";

function getCookie(name: string): string | null {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) {
		return parts.pop()?.split(";").shift() || null;
	}
	return null;
}

function setCookie(name: string, value: string, days = 30): void {
	const expires = new Date();
	expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

function deleteCookie(name: string): void {
	document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;SameSite=Lax`;
}

function getStoredUser(): User | null {
	const userData = getCookie(USER_COOKIE_NAME);
	if (!userData) return null;

	try {
		const parsed = JSON.parse(decodeURIComponent(userData));
		return new User(
			parsed.name,
			parsed.email,
			new Date(parsed.createdAt),
			parsed.token,
			parsed.id,
		);
	} catch {
		return null;
	}
}

function setStoredUser(user: User | null): void {
	if (user?.isAuthenticated()) {
		const userData = encodeURIComponent(JSON.stringify(user.toJSON()));
		setCookie(USER_COOKIE_NAME, userData);
	} else {
		deleteCookie(USER_COOKIE_NAME);
	}
}

const [user, setUser] = createSignal<User | null>(getStoredUser());

const updateUser = (newUser: User | null) => {
	setUser(newUser);
	setStoredUser(newUser);
};

const logout = () => {
	updateUser(null);
};

// Legacy token accessor for backward compatibility
const token = () => user()?.token || "";
const updateToken = (newToken: string) => {
	if (newToken) {
		const currentUser = user();
		if (currentUser) {
			updateUser(
				new User(
					currentUser.name,
					currentUser.email,
					currentUser.createdAt,
					newToken,
					currentUser.id,
				),
			);
		} else {
			updateUser(User.fromTokenOnly(newToken));
		}
	} else {
		logout();
	}
};

export { user, updateUser, logout, token, updateToken };
