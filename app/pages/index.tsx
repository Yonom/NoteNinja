import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push("/editor/" + nanoid());
  }, []);
  return null;
}
