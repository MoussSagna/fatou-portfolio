import adobeXd from '@/assets/tools/adobe-xd.svg'
import figma from '@/assets/tools/figma.svg'
import illustrator from '@/assets/tools/illustrator.svg'
import lightroom from '@/assets/tools/lightroom.svg'
import maze from '@/assets/tools/maze.svg'
import miro from '@/assets/tools/miro.svg'
import notion from '@/assets/tools/notion.svg'
import photoshop from '@/assets/tools/photoshop.svg'
import slack from '@/assets/tools/slack.svg'
import type { Tool } from '@/types/skills'

/**
 * Software row. Add a tool: drop its official SVG in src/assets/tools/ and add
 * an entry here (see docs/tools.md for sources and trademark notes).
 */
export const tools: Tool[] = [
  { id: 'figma', name: 'Figma', logo: figma },
  { id: 'photoshop', name: 'Photoshop', logo: photoshop },
  { id: 'illustrator', name: 'Illustrator', logo: illustrator },
  { id: 'adobe-xd', name: 'Adobe XD', logo: adobeXd },
  { id: 'lightroom', name: 'Lightroom', logo: lightroom },
  { id: 'notion', name: 'Notion', logo: notion },
  { id: 'miro', name: 'Miro', logo: miro },
  { id: 'slack', name: 'Slack', logo: slack },
]

/** Tools cited in case studies only — not shown in the home page row. */
const caseStudyTools: Tool[] = [{ id: 'maze', name: 'Maze', logo: maze }]

/** Every known tool, looked up by id from the case studies. */
export const allTools: Tool[] = [...tools, ...caseStudyTools]
