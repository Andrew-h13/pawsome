import { Suspense } from "react";
import Login from "@/layouts/login";

export default function SignUp() {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Login />
      </Suspense>
    </>
  );
}
