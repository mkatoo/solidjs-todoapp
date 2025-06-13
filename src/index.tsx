/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import { createSignal } from "solid-js";

import "./index.css";
import TaskList from "./components/TaskList";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		"Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
	);
}

const [token, setToken] = createSignal("");

if (root) {
	render(
		() => (
			<Router>
				<Route
					path="/"
					component={() => <TaskList token={token} setToken={setToken} />}
				/>
				<Route
					path="/login"
					component={() => <LoginForm token={token} setToken={setToken} />}
				/>
				<Route
					path="/register"
					component={() => <RegisterForm token={token} setToken={setToken} />}
				/>
			</Router>
		),
		root,
	);
}
