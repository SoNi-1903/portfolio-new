export default function NotFound(){
  return (<div className="min-h-[60vh] grid place-items-center p-8 text-center">
    <div><h1 className="text-3xl font-bold">Страница не найдена</h1>
    <p className="mt-2 text-neutral-400">Похоже, вы перешли по неверной ссылке.</p>
    <a href="/" className="mt-4 inline-block px-4 py-2 rounded-xl bg-violet-600">На главную</a></div></div>)
}