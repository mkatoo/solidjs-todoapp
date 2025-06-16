import { type Component, For } from "solid-js";
import { createResource, createSignal } from "solid-js";
import { addTask, deleteTask, fetchTasks } from "../api";
import Header from "./Header";
import { useNavigate } from "@solidjs/router";

type Task = {
	id: number;
	content: string;
};

type TaskListProps = {
	token: () => string;
	setToken: (token: string) => void;
};

const TaskList: Component<TaskListProps> = (props) => {
	const navigate = useNavigate();
	if (!props.token()) {
		navigate("/login", { replace: true });
		return;
	}

	const [content, setContent] = createSignal("");
	const [tasks, { refetch }] = createResource(props.token, fetchTasks);
	const [error, setError] = createSignal<string | null>(null);

	const handleAdd = async (e: Event) => {
		e.preventDefault();
		if (!content().trim() || !props.token()) return;
		try {
			await addTask(props.token(), content());
			setContent("");
			refetch();
			setError(null);
		} catch (err) {
			setError("タスクの追加に失敗しました");
		}
	};

	const handleDelete = async (id: number) => {
		if (!props.token()) return;
		if (!window.confirm("本当に削除しますか？")) return;
		try {
			await deleteTask(props.token(), id);
			refetch();
			setError(null);
		} catch (err) {
			setError("タスクの削除に失敗しました");
		}
	};

	return (
		<div class="min-h-screen bg-gray-100 flex items-center flex-col pt-16">
			<Header token={props.token} setToken={props.setToken} />
			<div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mt-8">
				{error() && (
					<div class="border border-red-400 bg-red-50 text-red-500 p-6 rounded mt-4 mb-4 flex items-center">
						<div class="flex-1">{error()}</div>
						<button
							class="ml-4 text-red-400 hover:text-red-600 text-xl cursor-pointer"
							aria-label="閉じる"
							onClick={() => setError(null)}
							type="button"
						>
							✕
						</button>
					</div>
				)}
				<form onSubmit={handleAdd} class="flex gap-2 mb-6">
					<input
						value={content()}
						onInput={(e) => setContent(e.currentTarget.value)}
						placeholder="新しいタスクを入力"
						class="flex-1 border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
					/>
					<button
						type="submit"
						class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
					>
						追加
					</button>
				</form>
				<ul class="space-y-2">
					<For each={tasks()}>
						{(task: Task) => (
							<li class="flex items-center justify-between bg-gray-50 px-4 py-2 rounded shadow-sm">
								<span>{task.content}</span>
								<button
									type="button"
									onClick={() => handleDelete(task.id)}
									class="text-sm text-red-500 hover:underline"
								>
									削除
								</button>
							</li>
						)}
					</For>
				</ul>
			</div>
		</div>
	);
};

export default TaskList;
