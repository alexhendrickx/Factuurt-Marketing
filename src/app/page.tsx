import { Hero } from '@/components/sections/Hero'
import { ProblemStrip } from '@/components/sections/ProblemStrip'
import { WorkflowSpine } from '@/components/sections/WorkflowSpine'
import { DemoOfferte } from '@/components/sections/DemoOfferte'
import { FeatureGrid } from '@/components/sections/FeatureGrid'
import { Offline } from '@/components/sections/Offline'
import { VoorWie } from '@/components/sections/VoorWie'
import { Faq } from '@/components/sections/Faq'
import { SlotCta } from '@/components/sections/SlotCta'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'
import { StickyTopbar } from '@/components/ui/StickyTopbar'
import { MobileBottomCta } from '@/components/ui/MobileBottomCta'

export default function Home() {
  return (
    <>
      <StickyTopbar />
      <main>
        <Hero />
        <ProblemStrip />
        <WorkflowSpine />
        <DemoOfferte />
        <FeatureGrid />
        <Offline />
        <VoorWie />
        <Faq />
        <SlotCta />
        <Contact />
      </main>
      <Footer />
      <div aria-hidden className="h-20 md:hidden" />
      <MobileBottomCta />
    </>
  )
}
