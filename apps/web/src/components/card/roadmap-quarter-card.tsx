import { useMemo, useState } from 'react';
import { Card } from '.';
import { Collapse } from '../collapse';
import { clsx } from 'clsx';
import { Icon } from '@tabler/icons-react';
import { IconBrandGithub } from '@tabler/icons-react';
import { IconLicense } from '@tabler/icons-react';
import { IconBinaryTree2 } from '@tabler/icons-react';
import { IconComponents } from '@tabler/icons-react';
import { IconGavel } from '@tabler/icons-react';

export type IconCategory = 'devops' | 'linked data' | 'design' | 'content management' | 'legal';

type BgColorMapKey = 'past' | 'current' | 'next' | 'later';

export interface RoadmapQuarterCardProps {
  quarter: number;
  items: [icon: IconCategory, content: string | JSX.Element][];
}

export const itemIconMap: Record<IconCategory, Icon> = {
  devops: IconBrandGithub,
  'content management': IconLicense,
  'linked data': IconBinaryTree2,
  design: IconComponents,
  legal: IconGavel,
};

const cardColorMap: Record<BgColorMapKey, string> = {
  current: 'bg-primary-main',
  past: 'bg-grey-lighter',
  next: 'bg-primary-light',
  later: 'bg-primary-lighter',
};

export const RoadmapQuarterCard: React.FC<RoadmapQuarterCardProps> = ({ quarter, items }) => {
  const currentQuarter: number = useMemo(() => {
    const date = new Date();
    const month = date.getMonth() + 1;

    return Math.ceil(month / 3);
  }, []);

  const cardColorMapKey: BgColorMapKey = useMemo(() => {
    if (quarter < currentQuarter) return 'past';

    if (currentQuarter + 1 === quarter) return 'next';

    if (currentQuarter + 2 <= quarter) return 'later';

    return 'current';
  }, [quarter, currentQuarter]);

  const [isOpen, setIsOpen] = useState(currentQuarter === quarter);

  return (
    <Card
      className={`${cardColorMap[cardColorMapKey]} flex-shrink-0 border-b-0 border-r-0 cursor-pointer md:w-[270px] md:cursor-default`}
      onClick={() => {
        setIsOpen((state) => !state);
      }}
    >
      <h3 className={`text-3xl text-bold text-white text-center ${clsx(isOpen && 'mb-4')} md:mb-4`}>Q{quarter}</h3>
      <Collapse in={isOpen} className="md:block">
        <ul className="space-y-3">
          {items.map(([icon, content], i) => {
            const IconComponent = itemIconMap[icon];

            return (
              <li key={i} className="bg-white p-4 rounded flex gap-x-4 items-center">
                <IconComponent size={22} className="flex-shrink-0 text-warning-dark" strokeWidth={2} />
                <span>{content}</span>
              </li>
            );
          })}
        </ul>
      </Collapse>
    </Card>
  );
};
