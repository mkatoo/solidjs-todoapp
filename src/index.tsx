import { Route, Router } from "@solidjs/router";
/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import { token, updateToken } from "./auth";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import TaskList from "./components/TaskList";
import UserProfile from "./components/UserProfile";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		"Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
	);
}

if (root) {
	render(
		() => (
			<Router>
				<Route
					path="/"
					component={() => <TaskList token={token} setToken={updateToken} />}
				/>
				<Route
					path="/login"
					component={() => <LoginForm token={token} setToken={updateToken} />}
				/>
				<Route
					path="/register"
					component={() => (
						<RegisterForm token={token} setToken={updateToken} />
					)}
				/>
				<Route
					path="/profile"
					component={() => <UserProfile token={token} setToken={updateToken} />}
				/>
			</Router>
		),
		root,
	);
}
