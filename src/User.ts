export interface UserData {
	id?: string;
	name: string;
	email: string;
	created_at: string;
}

export interface AuthResponse {
	token: string;
	user?: UserData;
}

export class User {
	constructor(
		public name: string,
		public email: string,
		public createdAt: Date,
		public token: string,
		public id?: string,
	) {}

	static fromAuthResponse(response: AuthResponse): User {
		return new User(
			response.user?.name || "",
			response.user?.email || "",
			response.user?.created_at
				? new Date(response.user.created_at)
				: new Date(),
			response.token,
			response.user?.id,
		);
	}

	static fromApiResponse(data: UserData, token: string): User {
		return new User(
			data.name,
			data.email,
			new Date(data.created_at),
			token,
			data.id,
		);
	}

	static fromTokenOnly(token: string): User {
		return new User("", "", new Date(), token);
	}

	isAuthenticated(): boolean {
		return !!this.token && this.token.length > 0;
	}

	requiresLogin(): boolean {
		return !this.isAuthenticated();
	}

	canEditProfile(): boolean {
		return this.isAuthenticated();
	}

	getDisplayName(): string {
		if (this.name && this.name.trim().length > 0) {
			return this.name;
		}
		return this.email.split("@")[0];
	}

	getRegistrationDate(): string {
		return this.createdAt.toLocaleDateString("ja-JP");
	}

	hasCompleteProfile(): boolean {
		return !!(this.name && this.email && this.id);
	}

	async fetchUserInfo(): Promise<User> {
		const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

		const response = await fetch(`${API_URL}/users/me`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.token}`,
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch user info");
		}

		const userData: UserData = await response.json();
		return User.fromApiResponse(userData, this.token);
	}

	async updateProfile(name: string): Promise<User> {
		const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

		const response = await fetch(`${API_URL}/users/me`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.token}`,
			},
			body: JSON.stringify({ name }),
		});

		if (!response.ok) {
			throw new Error("Failed to update profile");
		}

		const userData: UserData = await response.json();
		return User.fromApiResponse(userData, this.token);
	}

	async apiCall(
		method: string,
		endpoint: string,
		data?: unknown,
	): Promise<Response> {
		const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

		return fetch(`${API_URL}${endpoint}`, {
			method,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${this.token}`,
			},
			body: data ? JSON.stringify(data) : undefined,
		});
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			email: this.email,
			createdAt: this.createdAt.toISOString(),
			token: this.token,
		};
	}
}
