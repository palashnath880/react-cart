import { createClient } from "@/lib/supabase/server";
import { loginFormSchema } from "@/schemas/login.schema";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const supabase = await createClient();

    // body validation with zod
    const { data, error } = await loginFormSchema.safeParseAsync(body);

    // if error found
    if (error) {
      return NextResponse.json(
        { message: z.treeifyError(error) },
        { status: 400 }
      );
    }

    // login user
    const res = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    // if error is found
    if (res.error) {
      return NextResponse.json(
        {
          message: res.error.message,
        },
        { status: res.error.status }
      );
    }

    return NextResponse.json({
      user: res.data.user,
      session: res.data.session,
    });
  } catch (err: unknown) {
    console.log(err);
    const message =
      err instanceof Error ? err.message : "Internal server error.";
    return NextResponse.json({ message: message }, { status: 500 });
  }
}
