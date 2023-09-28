"use client";
import { ChangeEvent, FormEvent, useState } from "react";
export default function Home() {
  const [pdf, setPdf] = useState(false);
  const [name, setName] = useState<string | undefined>();
  function handleName(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
    setPdf(false);
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`/generate`, {
      method: "POST",
      body: JSON.stringify({
        name,
      }),
    }).then((response: any) => setPdf(true));
  };
  // useEffect(() => {
  //   fetch(`/generate`, {
  //     method: "POST",
  //   }).then((response: any) => setPdf(response));
  // }, []);
  console.log(pdf);
  return (
    <main className="min-h-screen flex bg-zinc-700 justify-center items-center flex-col">
      <form onSubmit={handleSubmit} className="flex gap-2 h-fit">
        <input
          type="text"
          value={name}
          onChange={handleName}
          className="bg-zinc-500 text-zinc-200 rounded-sm pl-2"
        />
        <button type="submit" className="rounded-lg w-32 bg-zinc-400">
          Enviar
        </button>
      </form>
      {pdf && (
        <embed
          src={`/assets/${name}.pdf`}
          width="100%"
          height="500"
          type="application/pdf"
        />
      )}
    </main>
  );
}
