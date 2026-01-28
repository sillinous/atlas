// ══════════════════════════════════════════════════════════════════════════════
// TRACK ONE [T1] — Demo Scenarios Data
// ══════════════════════════════════════════════════════════════════════════════

export interface DemoScenario {
  id: string;
  name: string;
  emoji: string;
  industry: string;
  location: string;
  description: string;
  conversation: Array<{ role: 'user' | 'assistant'; content: string }>;
  research: {
    market: {
      tam: string;
      sam: string;
      som: string;
      growth: string;
      insights: string[];
    };
    competitors: Array<{
      name: string;
      distance: string;
      type: string;
      threat: string;
    }>;
    location: {
      population: number;
      median_income: string;
      foot_traffic: string;
      rent_estimate: string;
    };
  };
  financials: {
    startup_costs: {
      equipment: number;
      buildout: number;
      inventory: number;
      licenses: number;
      marketing: number;
      working_capital: number;
      total: number;
    };
    projections: {
      year1: { revenue: number; expenses: number; net: number };
      year2: { revenue: number; expenses: number; net: number };
      year3: { revenue: number; expenses: number; net: number };
    };
    break_even: string;
    assumptions: {
      avg_ticket: number;
      customers_per_day: number;
      operating_days: number;
      cogs: string;
    };
  };
}

export const DEMO_SCENARIOS: Record<string, DemoScenario> = {
  cheesecake: {
    id: 'cheesecake',
    name: 'The Cheesecake Atelier',
    emoji: '🍰',
    industry: 'Specialty Bakery',
    location: 'Newton, IL',
    description: 'Artisan cheesecake bakery in small-town Illinois',
    conversation: [
      {
        role: 'assistant',
        content: "Hello! I'm ATLAS, your business planning partner. Tell me about the business you're dreaming of — I'll help bring it to life."
      },
      {
        role: 'user',
        content: "I want to open a specialty cheesecake bakery in a small town."
      },
      {
        role: 'assistant',
        content: "A specialty cheesecake bakery — I love the focus! Small towns can be excellent markets for artisan products with less competition. I've already dispatched my research agents to analyze the opportunity. While they work, tell me: what location are you considering?"
      },
      {
        role: 'user',
        content: "Newton, Illinois. It's a small town of about 2,800 people."
      },
      {
        role: 'assistant',
        content: "Newton, IL — got it! My location agent is pulling demographics and competition data now. This is interesting — small towns often have underserved markets for premium products. What makes your cheesecakes special? Any signature flavors or techniques that set you apart?"
      },
      {
        role: 'user',
        content: "I use a special New York style recipe with homemade whipped cream. I've perfected it over years."
      },
      {
        role: 'assistant',
        content: "A perfected New York style with homemade whipped cream — that's exactly the kind of authentic, quality-focused positioning that works in small markets. My research is coming in now... 📊\n\nInitial findings look promising: limited direct competition within 25 miles, and the demographics support premium bakery products. Let me compile a full analysis for you."
      }
    ],
    research: {
      market: {
        tam: '$4.2B (US Specialty Bakery)',
        sam: '$850K (25-mile radius)',
        som: '$127K (Year 1 capture)',
        growth: '3.4% annually',
        insights: [
          'Specialty desserts growing 8% faster than general bakery',
          'Premium pricing (+40%) accepted for artisan products',
          'Rural markets underserved by specialty bakeries',
          '"Local" and "homemade" are top purchase drivers'
        ]
      },
      competitors: [
        { name: 'Walmart Bakery', distance: '12 mi', type: 'Mass market', threat: 'Low' },
        { name: "Linda's Sweet Shop", distance: '8 mi', type: 'General bakery', threat: 'Medium' },
        { name: 'The Cake Lady', distance: '22 mi', type: 'Custom cakes', threat: 'Low' },
        { name: 'No specialty cheesecake', distance: '25+ mi', type: 'Gap identified', threat: 'N/A' }
      ],
      location: {
        population: 2800,
        median_income: '$52,000',
        foot_traffic: 'Moderate (Main Street)',
        rent_estimate: '$800-1,200/mo'
      }
    },
    financials: {
      startup_costs: {
        equipment: 15000,
        buildout: 8000,
        inventory: 3000,
        licenses: 1500,
        marketing: 2500,
        working_capital: 10000,
        total: 40000
      },
      projections: {
        year1: { revenue: 305760, expenses: 318260, net: -12500 },
        year2: { revenue: 428064, expenses: 385264, net: 42800 },
        year3: { revenue: 556883, expenses: 467783, net: 89100 }
      },
      break_even: 'Month 14',
      assumptions: {
        avg_ticket: 28,
        customers_per_day: 35,
        operating_days: 312,
        cogs: '32%'
      }
    }
  },
  
  detailing: {
    id: 'detailing',
    name: 'Pristine Mobile Detailing',
    emoji: '🚗',
    industry: 'Automotive Services',
    location: 'Austin, TX',
    description: 'Premium mobile car detailing service',
    conversation: [
      {
        role: 'assistant',
        content: "Hello! I'm ATLAS. Tell me about the business you're dreaming of."
      },
      {
        role: 'user',
        content: "I want to start a mobile car detailing business in Austin, Texas."
      },
      {
        role: 'assistant',
        content: "Mobile detailing in Austin — great choice! It's a growing market with high demand. My agents are researching the Austin automotive services landscape. Who's your target customer — busy professionals, luxury car owners, or maybe fleet operators?"
      },
      {
        role: 'user',
        content: "Mainly busy professionals and tech workers who don't have time to go to a car wash."
      },
      {
        role: 'assistant',
        content: "Perfect targeting! Austin's tech sector means high income, time-poor customers who value convenience. My research shows this demographic is willing to pay 2-3x for mobile services. I'm pulling competitive pricing data now..."
      }
    ],
    research: {
      market: {
        tam: '$14.7B (US Auto Detailing)',
        sam: '$48M (Austin Metro)',
        som: '$180K (Year 1 capture)',
        growth: '5.8% annually',
        insights: [
          'Mobile services growing 12% faster than fixed locations',
          'Tech workers pay 2.5x premium for convenience',
          'Subscription models showing 40% higher retention',
          'Electric vehicle detailing is emerging specialty'
        ]
      },
      competitors: [
        { name: 'DetailPro Austin', distance: 'Citywide', type: 'Established mobile', threat: 'High' },
        { name: 'Sparkle & Shine', distance: 'North Austin', type: 'Fixed + mobile', threat: 'Medium' },
        { name: 'Various independents', distance: 'Scattered', type: 'Solo operators', threat: 'Low' }
      ],
      location: {
        population: 2473275,
        median_income: '$75,413',
        foot_traffic: 'N/A (Mobile)',
        rent_estimate: 'Storage: $400-600/mo'
      }
    },
    financials: {
      startup_costs: {
        equipment: 8500,
        buildout: 0,
        inventory: 2000,
        licenses: 800,
        marketing: 3000,
        working_capital: 5000,
        total: 19300
      },
      projections: {
        year1: { revenue: 156000, expenses: 124800, net: 31200 },
        year2: { revenue: 234000, expenses: 175500, net: 58500 },
        year3: { revenue: 351000, expenses: 245700, net: 105300 }
      },
      break_even: 'Month 4',
      assumptions: {
        avg_ticket: 125,
        customers_per_day: 4,
        operating_days: 312,
        cogs: '18%'
      }
    }
  },
  
  saas: {
    id: 'saas',
    name: 'TaskFlow Pro',
    emoji: '💻',
    industry: 'B2B Software',
    location: 'Remote / US',
    description: 'Project management SaaS for agencies',
    conversation: [
      {
        role: 'assistant',
        content: "Hello! I'm ATLAS. Tell me about the business you're dreaming of."
      },
      {
        role: 'user',
        content: "I want to build a project management tool specifically for creative agencies."
      },
      {
        role: 'assistant',
        content: "A vertical SaaS play for creative agencies — smart positioning! The horizontal PM tools are crowded, but agency-specific solutions have room to grow. My agents are analyzing the competitive landscape. What pain points are you solving that Asana or Monday don't address?"
      },
      {
        role: 'user',
        content: "Creative agencies need better client approval workflows and asset management integrated with project timelines."
      },
      {
        role: 'assistant',
        content: "Client approvals + asset management + timelines — that's a compelling differentiator. I'm seeing demand signals for exactly this combination. Let me pull market sizing for creative agencies and analyze the competitive gap you've identified..."
      }
    ],
    research: {
      market: {
        tam: '$9.8B (Project Management Software)',
        sam: '$420M (Creative Agency Tools)',
        som: '$840K (Year 3 ARR target)',
        growth: '13.4% annually',
        insights: [
          'Vertical SaaS commands 2-3x higher prices than horizontal',
          'Creative agencies average 3.2 PM tools (fragmentation opportunity)',
          'Client portal features drive 45% of switching decisions',
          'Integration with Adobe/Figma is table stakes'
        ]
      },
      competitors: [
        { name: 'Monday.com', distance: 'Global', type: 'Horizontal PM', threat: 'Medium' },
        { name: 'Productive.io', distance: 'Global', type: 'Agency-focused', threat: 'High' },
        { name: 'Teamwork', distance: 'Global', type: 'Agency-leaning', threat: 'Medium' }
      ],
      location: {
        population: 0,
        median_income: 'N/A',
        foot_traffic: 'N/A',
        rent_estimate: 'Cloud: $500-2000/mo'
      }
    },
    financials: {
      startup_costs: {
        equipment: 3000,
        buildout: 0,
        inventory: 0,
        licenses: 500,
        marketing: 10000,
        working_capital: 25000,
        total: 38500
      },
      projections: {
        year1: { revenue: 48000, expenses: 72000, net: -24000 },
        year2: { revenue: 240000, expenses: 180000, net: 60000 },
        year3: { revenue: 840000, expenses: 504000, net: 336000 }
      },
      break_even: 'Month 18',
      assumptions: {
        avg_ticket: 99,
        customers_per_day: 0,
        operating_days: 365,
        cogs: '15%'
      }
    }
  }
};
