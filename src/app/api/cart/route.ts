import { createClient } from "@/lib/supabase/server";
import { addToCartSchema } from "@/schemas/cart.schema";
import { NextRequest, NextResponse } from "next/server";
import products from "../../../../data/products.json";

// POST route
export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for");

    // body data
    const body = await req.json();

    // create supabase client
    const supabase = await createClient();

    // get session
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // data validation
    const { data, error } = await addToCartSchema.safeParseAsync({
      ...body,
      user_id: user ? user.id : ip,
    });
    if (error) {
      return NextResponse.json(
        {
          message: error.issues.map((i) => i.message).join(" & "),
        },
        { status: 400 }
      );
    }

    // first check product exists in the cart
    const getProduct = await supabase
      .from("carts")
      .select("id,quantity")
      .eq("product_id", data.product_id)
      .single();

    // if product not found in the cart
    if (!getProduct.data) {
      // insert in the cart
      const newItem = await supabase.from("carts").insert({
        ...data,
        quantity: 1,
      });
      if (newItem.error) {
        return NextResponse.json(
          {
            message: "Opps! Something went wrong. Please try again",
          },
          { status: 500 }
        );
      } else {
        return NextResponse.json({ message: "ADDED" });
      }
    }

    // quantity
    const quantity = getProduct.data?.quantity + 1;

    // update product quantity in the cart
    const updateItem = await supabase
      .from("carts")
      .update({ quantity })
      .eq("id", getProduct.data.id);

    if (updateItem.error) {
      return NextResponse.json(
        {
          message: "Opps! Something went wrong. Please try again",
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json({ message: "ADDED" });
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

// GET route
export async function GET(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for");

    // create supabase client
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const user_id = user ? user.id : ip;

    // get all cart items
    const { data: items, error } = await supabase
      .from("carts")
      .select("*")
      .eq("user_id", user_id);

    // if found an error
    if (error) return NextResponse.json({ err: error }, { status: 500 });

    // get cart products
    const cartProducts = items.map((item) => {
      const product = products.find((i) => item.product_id === i.id);
      return { ...item, product };
    });

    return NextResponse.json(cartProducts);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
