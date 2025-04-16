import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '職涯決策助手',
  description: '幫助您評估職業狀況並做出更好的離職決策',
  manifest: '/manifest.json',
  //themeColor: '#3A7BEB',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '職涯決策助手'
  },
  formatDetection: {
    telephone: false
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <head />
      <body>{children}</body>
    </html>
  )
}