const API_URL = import.meta.env.VITE_API_URL;

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
