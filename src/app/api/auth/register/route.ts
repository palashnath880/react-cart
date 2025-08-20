import { createClient } from "@/lib/supabase/server";
import { registerFormSchema } from "@/schemas/register.schema";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // body validation with zod
    const { data, error } = await registerFormSchema.safeParseAsync(body);

    // if error found
    if (error) {
      return NextResponse.json(
        { message: z.treeifyError(error) },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // create a user
    const newUser = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: { data: { displayName: `${data.fname} ${data.lname}` } },
    });

    // if error is found
    if (newUser.error) {
      return NextResponse.json(
        {
          message: newUser.error.message,
        },
        { status: newUser.error.status }
      );
    }

    return NextResponse.json({ message: "SUCCESS" });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal server error.";
    return NextResponse.json({ message: message }, { status: 500 });
  }
}
