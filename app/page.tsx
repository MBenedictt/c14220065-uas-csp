import { createSupabaseServerClient } from "@/lib/supabase";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  } else {
    redirect("/dashboard");
  }

  return (
    <main>
      <h1>Supabase Connected</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}