'use client'
export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }){
  return (<div className="min-h-[60vh] grid place-items-center p-8 text-center">
    <div><h1 className="text-3xl font-bold">Что-то пошло не так</h1>
    <p className="mt-2 text-neutral-400">Попробуйте обновить страницу.</p>
    <button onClick={()=>reset()} className="mt-4 px-4 py-2 rounded-xl bg-violet-600">Обновить</button></div></div>)
}