import { NavLinks } from "@/app/ui/nav-links";
import { AsideLinks } from "@/app/ui/aside-links";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavLinks />
      <div className="flex w-full">
        <div className="md:basis-1/4">
          <AsideLinks />
        </div>
        <main className="mx-auto md:basis-3/4">{children}</main>
      </div>
    </div>
  )
}
