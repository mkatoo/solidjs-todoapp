import { createSignal } from "solid-js";

const TOKEN_COOKIE_NAME = "auth_token";

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

function getStoredToken(): string {
	return getCookie(TOKEN_COOKIE_NAME) || "";
}

function setStoredToken(token: string): void {
	if (token) {
		setCookie(TOKEN_COOKIE_NAME, token);
	} else {
		deleteCookie(TOKEN_COOKIE_NAME);
	}
}

const [token, setToken] = createSignal(getStoredToken());

const updateToken = (newToken: string) => {
	setToken(newToken);
	setStoredToken(newToken);
};

export { token, updateToken };
