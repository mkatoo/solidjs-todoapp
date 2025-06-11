import { type Component, For } from "solid-js";
import { createResource, createSignal } from "solid-js";
import { addTask, deleteTask, fetchTasks } from "../api";

type Task = {
	id: number;
	content: string;
};

type Props = {
	token: () => string;
};

const TaskList: Component<Props> = (props) => {
	const [content, setContent] = createSignal("");
	const [tasks, { refetch }] = createResource(props.token, fetchTasks);

	const handleAdd = async (e: Event) => {
		e.preventDefault();
		if (!content().trim() || !props.token()) return;
		await addTask(props.token(), content());
		setContent("");
		refetch();
	};

	const handleDelete = async (id: number) => {
		if (!props.token()) return;
		await deleteTask(props.token(), id);
		refetch();
	};

	return (
		<div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mt-8">
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
	);
};

export default TaskList;
