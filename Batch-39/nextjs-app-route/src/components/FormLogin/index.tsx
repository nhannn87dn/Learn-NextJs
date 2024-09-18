"use client";

import { useState } from "react";

const FormLogin = () => {
  const [user, setUser] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        console.log("user", user);
      }}
    >
      <input
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
        placeholder="email"
        type="text"
      />
      <input
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
        placeholder="password"
        type="password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default FormLogin;
