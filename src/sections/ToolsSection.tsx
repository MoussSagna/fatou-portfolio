import { SectionShell } from '@/components/layout/SectionShell'
import { ToolsDock } from '@/components/tools/ToolsDock'
import { tools } from '@/data/tools'

export function ToolsSection() {
  return (
    <SectionShell id="logiciels" eyebrow="Logiciels que j’utilise" className="pt-8 lg:pt-12">
      <div className="mt-10 lg:mt-12">
        <ToolsDock tools={tools} />
      </div>
    </SectionShell>
  )
}
