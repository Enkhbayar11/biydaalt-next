import Card from "../../components/ui/Card";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Card>
        <h1 className="text-3xl font-bold">About Mini TaskHub</h1>

        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Mini TaskHub нь Tasks болон Notes удирдах жижиг бүтээгдэхүүн маягийн
          Next.js апп юм. Энэ project-д routing, state management, form
          validation, API integration, Context API, responsive UI, reusable
          components ашигласан.
        </p>

        <ul className="mt-5 list-disc space-y-2 pl-5 text-gray-600 dark:text-gray-300">
          <li>Tasks: list, add, toggle done, delete</li>
          <li>Notes: list, add, delete</li>
          <li>API: JSONPlaceholder /todos болон /posts</li>
          <li>Theme: light / dark toggle</li>
          <li>UI: Button, Input, Card reusable components</li>
        </ul>
      </Card>
    </main>
  );
}