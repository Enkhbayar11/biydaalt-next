"use client";

import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import { getNotes } from "../../services/notesApi";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        const data = await getNotes();
        setNotes(data);
      } finally {
        setLoading(false);
      }
    }

    loadNotes();
  }, []);

  function validateNote() {
    const nextErrors = {};

    if (!title.trim()) {
      nextErrors.title = "Note title заавал оруулна.";
    }

    if (body.trim().length < 10) {
      nextErrors.body = "Body хамгийн багадаа 10 тэмдэгт байна.";
    }

    return nextErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = validateNote();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);

    const newNote = {
      id: Date.now(),
      title: title.trim(),
      body: body.trim(),
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setBody("");
    setErrors({});

    setTimeout(() => {
      setSubmitting(false);
    }, 400);
  }

  function deleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Notes</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Notes жагсаалт харах, нэмэх, устгах хэсэг.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <Input
            label="Note title"
            placeholder="Гарчиг"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors({ ...errors, title: "" });
            }}
            errorMessage={errors.title}
          />

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Body
            </label>

            <textarea
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
                setErrors({ ...errors, body: "" });
              }}
              placeholder="Тэмдэглэлийн дэлгэрэнгүй..."
              className="min-h-28 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />

            {errors.body && <p className="text-sm text-red-600">{errors.body}</p>}
          </div>

          <div>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Нэмж байна..." : "Add Note"}
            </Button>
          </div>
        </form>
      </Card>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        {loading && <p>Loading notes...</p>}

        {!loading &&
          notes.map((note) => (
            <Card key={note.id}>
              <h2 className="text-lg font-semibold">{note.title}</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {note.body.length > 120 ? note.body.slice(0, 120) + "..." : note.body}
              </p>

              <div className="mt-4">
                <Button variant="danger" onClick={() => deleteNote(note.id)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
      </section>
    </main>
  );
}