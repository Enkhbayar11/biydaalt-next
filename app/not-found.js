import Link from "next/link";
import Card from "../components/ui/Card";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <Card>
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Уучлаарай, энэ хуудас олдсонгүй.
        </p>

        <Link
          href="/tasks"
          className="mt-5 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Tasks руу буцах
        </Link>
      </Card>
    </main>
  );
}