"use client";

import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import { getTasks } from "../../services/tasksApi";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch {
        setError("Tasks татахад алдаа гарлаа.");
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  function validateTask() {
    if (!title.trim()) return "Task title заавал оруулна.";
    if (title.trim().length < 3) return "Title хамгийн багадаа 3 тэмдэгт байна.";
    return "";
  }

  function handleSubmit(e) {
    e.preventDefault();

    const message = validateTask();
    if (message) {
      setError(message);
      return;
    }

    setSubmitting(true);

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      done: false,
      createdAt: new Date().toISOString(),
    };

    setTasks([newTask, ...tasks]);
    setTitle("");
    setError("");

    setTimeout(() => {
      setSubmitting(false);
    }, 400);
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Todo жагсаалт харах, нэмэх, done болгох, устгах хэсэг.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <Input
            label="Task title"
            placeholder="Жишээ: Homework хийх"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError("");
            }}
            errorMessage={error}
          />

          <div className="flex items-end">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Нэмж байна..." : "Add Task"}
            </Button>
          </div>
        </form>
      </Card>

      <section className="mt-6 grid gap-4">
        {loading && <p>Loading tasks...</p>}

        {!loading &&
          tasks.map((task) => (
            <Card key={task.id}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2
                    className={`text-lg font-semibold ${
                      task.done ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.title}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Status: {task.done ? "done" : "undone"}
                  </p>

                  <p className="text-sm text-gray-500">
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => toggleTask(task.id)}>
                    Toggle
                  </Button>

                  <Button variant="danger" onClick={() => deleteTask(task.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
      </section>
    </main>
  );
}