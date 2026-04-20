import { LuxuryAnchor, LuxuryLink } from '../LuxuryCta'
import { DEMO_SITE } from '../../lib/sitePaths'

export default function SiteFooter() {
  return (
    <footer className="bg-[#dbdad5] w-full px-6 py-14 md:px-12">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-10 md:flex-row md:items-start">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <img
            src="/evelyne-logo.svg"
            alt="Evelyne"
            className="h-11 w-auto max-w-[min(88vw,280px)] object-contain object-left md:h-12"
          />
          <p className="text-center font-noto text-xs tracking-[0.15em] leading-relaxed text-[#4d4635] md:text-left">
            © {new Date().getFullYear()} Evelyne Bags. Всички права запазени.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <LuxuryAnchor
            href="#"
            variant="ghost"
            className="font-noto !normal-case !text-xs !tracking-[0.12em] !text-[#7f7663] hover:!text-[#735c00]"
          >
            Общи условия
          </LuxuryAnchor>
          <LuxuryAnchor
            href="#"
            variant="ghost"
            className="font-noto !normal-case !text-xs !tracking-[0.12em] !text-[#7f7663] hover:!text-[#735c00]"
          >
            Лични данни
          </LuxuryAnchor>
          <LuxuryAnchor
            href={`${DEMO_SITE}#newsletter`}
            variant="ghost"
            className="font-noto !normal-case !text-xs !tracking-[0.12em] !text-[#7f7663] hover:!text-[#735c00]"
          >
            Контакти
          </LuxuryAnchor>
          <LuxuryLink
            to="/admin"
            variant="ghost"
            className="font-noto !normal-case !text-xs !tracking-[0.12em] !text-[#a8a29a] hover:!text-[#735c00]"
          >
            Администрация
          </LuxuryLink>
        </div>
      </div>
    </footer>
  )
}
