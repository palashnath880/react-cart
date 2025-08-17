import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function SocialAuth() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button variant="secondary" className="w-full cursor-pointer">
        <Image
          src={"/google-icon.svg"}
          width={40}
          height={40}
          alt="Facebook svg"
          className="w-5"
        />
        Google
      </Button>
      <Button variant="secondary" className="w-full cursor-pointer">
        <Image
          src={"/facebook-icon.svg"}
          width={40}
          height={40}
          alt="Facebook svg"
          className="w-5"
        />
        Facebook
      </Button>
    </div>
  );
}
