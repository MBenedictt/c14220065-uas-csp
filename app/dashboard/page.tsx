import { logout } from "@/actions/auth";
import { createSupabaseServerClient } from "@/lib/supabase";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const supabase = await createSupabaseServerClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) {
        redirect('/login')
    }

    const { data: notes } = await supabase.from('announcements').select()

    return (
        <div className="">
            <div className="w-full h-[70px] bg-gray-200  flex justify-between items-center px-8">
                <h1 className="font-bold text-2xl">Welcome, {user.email}</h1>
                <form action={logout} className="space-y-4">
                    <button
                        type="submit"
                        className=" w-fit px-4 cursor-pointer rounded-lg bg-black py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
                    >
                        {"Logout"}
                    </button>
                </form>
            </div>

            <div className="p-8">
                {(notes || []).length === 0 ? (
                    <p className="text-gray-500">No announcements</p>
                ) : (
                    <ul className="list-disc pl-4">
                        {(notes || []).map(note => (
                            <li key={note.id} className="space-y-2 mb-4">
                                <h2 className="text-lg font-bold">{note.title}</h2>
                                <p className="text-gray-600">{note.content}</p>
                                <p className="text-xs text-gray-400">{new Date(note.created_at).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    )
}
