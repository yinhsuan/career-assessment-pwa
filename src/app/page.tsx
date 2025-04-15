// src/app/page.tsx
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 rounded-3xl border border-gray-200 bg-white">
        <h1 className="text-2xl font-bold text-center mb-6">登入/註冊</h1>
        
        <div className="mb-6">
          <Button 
            className="w-full py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-full"
          >
            職涯決策助手
          </Button>
        </div>
        
        <p className="text-center mb-4">登入您的帳號</p>
        
        <form className="space-y-4">
          <Input
            type="email"
            placeholder="電子郵件"
            className="w-full p-4 rounded-lg border border-gray-300"
          />
          
          <Input
            type="password"
            placeholder="密碼"
            className="w-full p-4 rounded-lg border border-gray-300"
          />
          
          <Button 
            type="submit"
            className="w-full py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-full"
          >
            登入
          </Button>
        </form>
        
        <div className="my-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-gray-500">或</span>
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline"
          className="w-full py-3 border border-blue-500 text-blue-500 rounded-full"
        >
          使用 Google 帳號登入
        </Button>
        
        <p className="mt-6 text-center">
          還沒有帳號？{' '}
          <Link href="/register" className="text-blue-500 hover:underline">
            立即註冊
          </Link>
        </p>
      </div>
    </div>
  );
}