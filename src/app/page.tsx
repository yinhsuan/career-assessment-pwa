// src/app/login/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 這裡添加登入邏輯
    console.log("登入嘗試:", email, password);
    // 登入成功後，導航到主頁
    // router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f7fa]">
      <div className="w-full max-w-md p-8 mx-4 bg-white rounded-3xl shadow-sm border border-[#e1e5eb]">
        {/* 頂部圖標區域 */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-[#588be8] rounded-full flex items-center justify-center">
            <span className="text-white text-3xl font-bold">職</span>
          </div>
        </div>

        {/* 標題區域 */}
        <h1 className="text-2xl font-bold text-center mb-2">登入帳戶</h1>
        <p className="text-[#667085] text-center mb-8">
          職涯決策助手 - 助您做出更好的職業選擇
        </p>

        {/* 表單區域 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#344054] mb-1"
            >
              電子郵件
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="您的電子郵件地址"
              className="w-full px-4 py-3 border border-[#d0d5dd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#588be8] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#344054] mb-1"
            >
              密碼
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-[#d0d5dd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#588be8] focus:border-transparent"
              required
            />
          </div>

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-[#588be8] hover:underline"
            >
              忘記密碼？
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#588be8] text-white rounded-full hover:bg-[#4a7ad8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#588be8] focus:ring-opacity-50"
          >
            登入
          </button>
        </form>

        {/* 分隔線 */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#e1e5eb]"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 text-sm bg-white text-[#667085]">或</span>
          </div>
        </div>

        {/* 社交登入選項 */}
        <button
          type="button"
          className="w-full flex items-center justify-center py-3 border border-[#d0d5dd] rounded-full hover:bg-[#f9fafb] transition-colors focus:outline-none focus:ring-2 focus:ring-[#588be8] focus:ring-opacity-50"
        >
          <div className="w-6 h-6 bg-[#4285f4] rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-sm font-bold">G</span>
          </div>
          <span className="text-[#344054]">使用 Google 帳號登入</span>
        </button>

        {/* 註冊選項 */}
        <p className="mt-8 text-center text-[#344054]">
          還沒有帳號？{" "}
          <Link
            href="/register"
            className="text-[#588be8] font-semibold hover:underline"
          >
            立即註冊
          </Link>
        </p>

        {/* 版權聲明 */}
        <p className="mt-16 text-xs text-center text-[#94a3b8]">
          © 2025 職涯決策助手 |{" "}
          <Link href="/privacy" className="hover:underline">
            隱私權政策
          </Link>
        </p>
      </div>
    </div>
  );
}