import { type AuthResponse, User } from "./User";

const API_URL = import.meta.env.VITE_API_URL;

export async function loginUser(
	email: string,
	password: string,
): Promise<User> {
	const url = `${API_URL}/auth`;
	const res = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	});
	if (!res.ok) throw new Error("ログイン失敗");
	const data: AuthResponse = await res.json();
	return User.fromAuthResponse(data);
}

export async function registerUser(
	name: string,
	email: string,
	password: string,
): Promise<User> {
	const url = `${API_URL}/users`;
	const res = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ name, email, password }),
	});
	if (!res.ok) throw new Error("登録失敗");
	const data: AuthResponse = await res.json();
	return User.fromAuthResponse(data);
}

// Legacy functions for backward compatibility
export async function login(email: string, password: string) {
	const url = `${API_URL}/auth`;
	const res = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	});
	if (!res.ok) throw new Error("ログイン失敗");
	return res.json();
}

export async function register(name: string, email: string, password: string) {
	const url = `${API_URL}/users`;
	const res = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ name, email, password }),
	});
	if (!res.ok) throw new Error("登録失敗");
	return res.json();
}

// User-based task functions
export async function fetchTasksForUser(user: User) {
	const response = await user.apiCall("GET", "/tasks");
	return response.json();
}

export async function addTaskForUser(user: User, content: string) {
	const response = await user.apiCall("POST", "/tasks", { content });
	return response.json();
}

export async function deleteTaskForUser(user: User, id: number) {
	await user.apiCall("DELETE", `/tasks/${id}`);
}

// Legacy token-based functions for backward compatibility
export async function fetchTasks(token: string) {
	const url = `${API_URL}/tasks`;
	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return res.json();
}

export async function addTask(token: string, content: string) {
	const url = `${API_URL}/tasks`;
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ content }),
	});
	return res.json();
}

export async function deleteTask(token: string, id: number) {
	const url = `${API_URL}/tasks/${id}`;
	await fetch(url, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export async function fetchUserInfo(token: string) {
	const url = `${API_URL}/users/me`;
	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	if (!res.ok) throw new Error("ユーザー情報の取得に失敗しました");
	return res.json();
}

export async function updateUserProfile(token: string, name: string) {
	const url = `${API_URL}/users/me`;
	const res = await fetch(url, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ name }),
	});
	if (!res.ok) throw new Error("ユーザー情報の更新に失敗しました");
	return res.json();
}
