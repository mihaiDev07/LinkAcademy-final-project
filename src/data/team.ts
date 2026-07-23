import type { Employer } from '../types/Employer';

import aboutUs2 from '../assets/aboutUs-2.png';
import aboutUs3 from '../assets/aboutUs-3.png';
import aboutUs4 from '../assets/aboutUs-4.png';

export const team: Employer[] = [
  {
    id: 1,
    image: aboutUs2,
    name: 'Emily Johnson',
    job: 'Chief Executive Officer (CEO)',
    description:
      'Emily leads our team with vision and a passion for innovation. With over 10 years of experience in the e-commerce industry, her mission is to ensure every customer has the best possible experience.',
  },
  {
    id: 2,
    image: aboutUs3,
    name: 'Sarah Smith',
    job: 'Head of Product Development',
    description:
      'Sarah oversees product development and selection. Her expertise in market trends and product quality ensures that our offerings meet the highest standards.',
  },
  {
    id: 3,
    image: aboutUs4,
    name: 'Michael Smith',
    job: 'Marketing & Community Manager',
    description:
      'Michael manages all marketing campaigns and community engagement. He ensures that every customer receives clear information and feels connected to our brand.',
  },
];
