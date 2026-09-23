import type { Skill } from '@/types/skills'

/** Nude tile with a line icon and a label. Hover: lifts, icon turns terracotta. */
export function SkillTile({ skill }: { skill: Skill }) {
  const { label, icon: Icon } = skill

  return (
    <div className="group flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-[1.25rem] bg-nude-200 px-3 text-center transition-[transform,background-color] duration-500 ease-(--ease-out-soft) hover:-translate-y-1 hover:bg-blush/60 lg:gap-4">
      <Icon
        aria-hidden="true"
        strokeWidth={1.5}
        className="size-7 text-ink transition-[color,transform] duration-500 ease-(--ease-out-soft) group-hover:-translate-y-0.5 group-hover:text-terracotta lg:size-9"
      />
      <span className="text-[0.9375rem] font-semibold text-ink lg:text-[1.1875rem]">{label}</span>
    </div>
  )
}
