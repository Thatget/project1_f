import { NavLinks } from "@/app/ui/nav-links";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavLinks />
      <main className="container mx-auto">{children}</main>
    </>
  )
}
