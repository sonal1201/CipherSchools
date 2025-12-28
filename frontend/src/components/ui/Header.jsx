"use client";

import { useRouter } from "next/navigation";

import React from "react";

const Header = () => {
  const router = useRouter();
  return (
    <div className="header">
      <header className="logo">CipherSqlEditor</header>

      <button onClick={() => router.push("/")} className="question-button">
        View All Question
      </button>
    </div>
  );
};

export default Header;
