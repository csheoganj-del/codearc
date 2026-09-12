interface Capability {
  num: string;
  title: string;
  description: string;
  deliverables: string[];
}

const capabilities: Capability[] = [
  {
    num: '01',
    title: 'Brand Websites',
    description:
      'Distinctive, fast websites that express your brand clearly and guide visitors towards enquiry, booking, or purchase.',
    deliverables: [
      'Strategy & Content Structure',
      'Art Direction & Typography',
      'Responsive Motion & Interaction',
      'Fast, Accessible Development',
    ],
  },
  {
    num: '02',
    title: 'Hospitality Websites & Booking',
    description:
      'Guest-focused websites and booking journeys for resorts, lodges, safari operators, and independent hospitality brands.',
    deliverables: [
      'Room & Safari Enquiry Flows',
      'Stay & Experience Storytelling',
      'Concierge & WhatsApp Enquiries',
      'Guest Communication Tools',
    ],
  },
  {
    num: '03',
    title: 'Custom Business Software',
    description:
      'Practical software for billing, inventory, bookings, staff, and the daily tasks that generic tools do not handle well.',
    deliverables: [
      'Offline-First Counter POS',
      'Floor & Kitchen Management',
      'GST & Multi-Outlet Invoicing',
      'Role-Based Staff Permissions',
    ],
  },
  {
    num: '04',
    title: 'Product Platforms',
    description:
      'Subscription products, internal tools, and offline-capable applications built to serve many teams without losing clarity.',
    deliverables: [
      'Cloud Architecture & PostgreSQL',
      'Type-Safe API Pipelines',
      'Local-First SQLite / IndexedDB Sync',
      'Cross-Platform Windows & Android Apps',
    ],
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="w-full bg-[#F5F1E8] py-16 sm:py-24 lg:py-32 border-b border-[rgba(24,23,19,0.08)]">
      <div className="w-[calc(100%-clamp(32px,5vw,96px))] max-w-[1536px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 mb-8 sm:mb-16 border-b border-[rgba(24,23,19,0.1)]">
          <div>
            <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
              <span className="font-mono text-[11px] sm:text-[13px] uppercase tracking-[0.2em] text-[#C43C11] font-semibold">
                02 / Capabilities
              </span>
            </div>
            <h2 className="font-serif text-[32px] sm:text-[48px] lg:text-[68px] font-normal leading-[1.04] tracking-[-0.03em] text-[#181713]">
              What we build.
            </h2>
          </div>
          <p className="max-w-[460px] text-[15px] sm:text-[18px] leading-[1.6] text-[#6B675F]">
            From a first brand website to the software behind daily operations, we design and build the right level of system for the job.
          </p>
        </div>

        {/* 4 Architectural Rows */}
        <div className="divide-y divide-[rgba(24,23,19,0.1)]">
          {capabilities.map((item) => (
            <div
              key={item.num}
              className="py-8 sm:py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-14 items-start group"
            >
              {/* Number */}
              <div className="lg:col-span-2 font-mono text-[13px] sm:text-[17px] font-semibold text-[#C43C11]">
                {item.num}
              </div>

              {/* Title */}
              <div className="lg:col-span-4">
                <h3 className="font-serif text-[24px] sm:text-[32px] lg:text-[36px] font-normal text-[#181713] leading-[1.12] tracking-[-0.025em] group-hover:text-[#C43C11] transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Description & Deliverables */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <p className="text-[15px] sm:text-[18px] leading-[1.65] text-[#6B675F] mb-4 sm:mb-6">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-x-4 sm:gap-x-5 gap-y-2 font-mono text-[11px] sm:text-[13px] text-[#181713]">
                  {item.deliverables.map((del) => (
                    <span key={del} className="flex items-center gap-1.5 sm:gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E85A2F]" />
                      <span>{del}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
