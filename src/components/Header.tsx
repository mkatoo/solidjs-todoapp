import { type Component, Show } from "solid-js";

type HeaderProps = {
	token: string;
	handleLogout: () => void;
};

const Header: Component<HeaderProps> = (props) => (
	<div class="w-full bg-blue-600 py-4 px-8 flex items-center justify-between fixed top-0 left-0 z-50">
		<span class="text-white text-xl font-bold">Todo App</span>
		<Show when={props.token}>
			<button
				type="button"
				onClick={props.handleLogout}
				class="text-sm text-white hover:underline"
			>
				ログアウト
			</button>
		</Show>
	</div>
);

export default Header;
