'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export function AsideLinks() {
  return (
    <aside className="w-full flex flex-col">
      <div>M.</div>
      <Link href={"/"}>sadfas</Link>
      <Link href={"/"}>sadfas</Link>
      <Link href={"/"}>sadfas</Link>
      <Link href={"/"}>sadfas</Link>
      <Link href={"/"}>sadfas</Link>
      <Link href={"/"}>sadfas</Link>
    </aside>
  )
}
