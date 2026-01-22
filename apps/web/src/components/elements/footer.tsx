type Link = string;

type Subsection = {
  title: string;
  links: Link[];
};

type FooterSection = {
  title: string;
  links: Link[];
  subsections?: Subsection[];
};

export default function Footer() {
  const contactInfo = [
    "Tel: +44 (0) 207 730 2122",
    "hello@jamb.co.uk",
    "95-97 Pimlico Rd",
    "London SW1W 8PH"
  ];

  const footerSections: FooterSection[] = [
    {
      title: "Reproduction Chimneypieces",
      links: ["Marble", "Stone", "Grates & Accessories", "Guide to Jamb Marbles"],
      subsections: [
        {
          title: "Antique Chimneypieces",
          links: ["French & Italian", "Georgian", "Regency"]
        },
        {
          title: "Sell an Antique Chimneypiece",
          links: []
        }
      ]
    },
    {
      title: "Reproduction Lighting",
      links: ["Hanging Globes", "Hanging Lanterns", "Wall Lights", "Dish Lights", "Table Lamps", "Chains & Brackets"]
    },
    {
      title: "Reproduction Furniture",
      links: ["Seating", "Tables", "Mirrors", "The Pantry Collection"],
      subsections: [
        {
          title: "Antique Furniture",
          links: ["Seating", "Tables", "Desks", "Bookcases & Cabinets", "Chests", "Mirrors", "Fire Accessories", "Objects", "Works of Arts", "Lighting"]
        }
      ]
    },
    {
      title: "Journal",
      links: ["Praesentium", "Voluptatibus", "Accusamus", "Iusto", "Dignissimos"]
    },
    {
      title: "About",
      links: ["Founders", "Team", "History", "Galleries", "Workshops", "Showrooms", "Terms & Conditions"]
    }
  ];

  const LinkList = ({ links }: { links: Link[] }) => (
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <a href="#" className="text-[#9c9c9d] text-[16px] hover:text-gray-700 transition-colors">
            {link}
          </a>
        </li>
      ))}
    </ul>
  );

  const Section = ({ title, links, subsections }: FooterSection) => (
    <>
      <h4 className="text-[#1a1a1a] text-[16px] font-medium mb-4">
        {title}
      </h4>
      <LinkList links={links} />
      {subsections?.map((subsection, index) => (
        <div key={index}>
          <h4 className="text-[#1a1a1a] text-[16px] font-medium mt-8 mb-4 border-t border-[#9c9c9d] pt-4">
            {subsection.title}
          </h4>
          {subsection.links.length > 0 && <LinkList links={subsection.links} />}
        </div>
      ))}
    </>
  );

  return (
    <footer className="bg-[#e3e3e3] px-8 py-12 font-medium">
      <div>
        {/* Top Section - Contact Info and Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Contact Information */}
          <div className="space-y-1">
            {contactInfo.map((info, index) => (
              <p key={index} className="text-[#9c9c9d] text-[16px]">{info}</p>
            ))}
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-[#9c9c9d] text-[16px] mb-4">Newsletter</h3>
            <div className="flex gap-2 mb-3">
              <input
                type="email"
                placeholder="Search"
                className="flex-1 px-2 py-3 bg-white border-none text-[16px] text-gray-600 placeholder:text-gray-400 font-oswald font-light"
              />
              <button className="px-6 py-2 bg-white text-[#9c9c9d] text-[16px] hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
            <label className="flex items-center gap-2 text-[#9c9c9d] text-[14px] cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded-full border-2 border-gray-400 appearance-none checked:border-blue-500 checked:bg-blue-500 cursor-pointer"
              />
              I agree to our Privacy Policy
            </label>
          </div>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {footerSections.map((section, index) => (
            <div key={index} className={index === 0 ? "border-t border-[#9c9c9d] pt-4" : ""}>
              {index === 0 ? (
                <Section {...section} />
              ) : (
                <div className="border-t border-[#9c9c9d] pt-4">
                  <Section {...section} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}