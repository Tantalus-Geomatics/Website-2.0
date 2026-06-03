import { Link, useParams } from 'react-router-dom';
import {
  Map,
  HardHat,
  Compass,
  Building,
  Mountain,
  CheckCircle2,
  ArrowRight,
  Home,
  Trees,
  Waves,
  Scale,
  FileText,
  MapPin,
  Phone,
} from 'lucide-react';
import LeadQuoteForm from '../components/LeadQuoteForm';
import PageShell from '../components/PageShell';
import SEO from '../components/SEO';
import { useLeadForm } from '../hooks/useLeadForm';
import { SERVICE_CATEGORIES } from '../config/servicesStructure';

const ALL_SERVICES = [
  {
    slug: '3d-settlement-monitoring',
    title: '3D Settlement Monitoring',
    description: 'In {{LOCATION_NAME}}, 3D settlement monitoring is required to track structural stability, deep excavations, and adjacent properties. 3D settlement monitoring surveys are processes designed to identify and track the minute movement of construction elements over time, including slope stability, ground settlement, and structural deformation. In British Columbia, determining the location of any natural or artificial feature relative to a boundary for the purpose of certifying it in writing is exclusively defined as the "practice of land surveying" under the Land Surveyors Act. Engaging a commissioned *British Columbia Land Surveyor* (*BCLS*) ensures your monitoring program possesses the statutory authority and geomatics precision required to protect the project.',
    href: '/services/3d-settlement-monitoring/',
    icon: Mountain,
    image: '/images/3d-settlement-monitoring.webp'
  },
  {
    slug: 'air-space-subdivision-surveys',
    title: 'Air Space Subdivision Surveys',
    description: 'Developing complex, multi-use buildings and intricate infrastructure in {{LOCATION_NAME}} often demands separating the ownership of volumetric spaces without the constraints of a communal strata corporation. An Air Space Subdivision, governed by Part 9 of the Land Title Act, is a legal mechanism that creates one or more 3D "air space parcels" out of a fee-simple parent parcel. Unlike strata lots, an air space parcel is an independent fee-simple title that operates without statutory implied easements for support, shelter, or servicing, and without a legislated governance structure. This makes air space an incredibly powerful tool for developers mixing commercial, residential, and governmental ownership within a single footprint, but it also demands an legal, spatial, and engineering precision.',
    href: '/services/air-space-subdivision-surveys/',
    icon: Building,
    image: '/images/air-space-subdivision-surveys.webp'
  },
  {
    slug: 'bare-land-strata-surveys',
    title: 'Bare Land Strata Surveys',
    description: 'Bare land strata developments offer a highly strategic and flexible mechanism for creating individual ownership of land parcels while maintaining communal governance over shared amenities like private roads, servicing infrastructure, and recreational areas in {{LOCATION_NAME}}. Unlike a building strata, where boundaries are defined by the walls, floors, and ceilings of a structure, the boundaries of a bare land strata lot are defined by physical survey markers driven into the earth. Functioning much like a traditional fee-simple subdivision, a bare land strata allows developers to maximize land utility while establishing a formalized strata corporation to manage shared assets.',
    href: '/services/bare-land-strata-surveys/',
    icon: Building,
    image: '/images/bare-land-strata-surveys.webp'
  },
  {
    slug: 'bc-land-surveyors-building-location-surveys',
    title: 'BC Land Surveyors Building Location Surveys',
    description: 'When constructing a new custom home, acquiring commercial real estate, or securing project financing in {{LOCATION_NAME}}, spatial certainty is required. A *British Columbia Land Surveyor*\'s Certificate of Location, often referred to as a Building Location Certificate, is a non-statutory plan prepared and signed by a licensed land surveyor that meticulously illustrates the exact location of physical improvements and structural features situated on a parcel of land in relation to its legal boundaries. Additionally, these documents map the portions of your property that are burdened by registered legal charges, such as statutory rights of way, easements, and restrictive covenants, ensuring that your development does not infringe upon restricted areas.',
    href: '/services/bc-land-surveyors-building-location-surveys/',
    icon: Home,
    image: '/images/old-home.webp'
  },
  {
    slug: 'block-outline-surveys',
    title: 'Block Outline Surveys',
    description: 'When undertaking major subdivisions, infrastructure corridors, or expansive developments in {{LOCATION_NAME}}, the construction phase—involving heavy machinery, deep excavations, site grading, and utility installation—poses a massive threat to physical survey monuments. To mitigate the destruction of the legal survey fabric and avoid the costly replacement of destroyed property corners, developers can leverage a highly strategic and specialized mechanism known as a block outline survey. Governed by Section 69 of the Land Title Act, this method of deferred monumentation allows a *British Columbia Land Surveyor* (*BCLS*) to establish secure control monuments before construction begins, and officially post the final property boundaries only after the heavy construction activities are entirely completed.',
    href: '/services/block-outline-surveys/',
    icon: FileText,
    image: '/images/survey-marker-post.webp'
  },
  {
    slug: 'boundary-surveys',
    title: 'Boundary Surveys',
    description: 'Establishing the exact legal limits of your property is the foundational step for any real estate transaction, fence construction, or land development project in {{LOCATION_NAME}}. Whether you require a boundary survey to resolve a neighbour dispute or a staking survey for a construction layout, defining the spatial and legal rights of your land is an intensely regulated process. In British Columbia, the "practice of land surveying" is strictly governed by the Land Surveyors Act, meaning only a commissioned *British Columbia Land Surveyor* (*BCLS*) holds the exclusive statutory authority to determine, locate, define, establish, or re-establish property boundaries. Relying on unlicensed contractors to "stake" a line exposes you to severe legal and financial liabilities, as only a licensed *BCLS* can officially adjudicate boundaries and act in the public interest to protect the cadastre.',
    href: '/services/boundary-surveys/',
    icon: Compass,
    image: '/images/boundary-surveys.webp'
  },
  {
    slug: 'building-strata-surveys',
    title: 'Building Strata Surveys',
    description: 'Creating a building strata allows developers and property owners in {{LOCATION_NAME}} to maximize the value and utility of their real estate by dividing a structure into individually owned strata lots while maintaining communal governance over shared spaces. Unlike a bare land strata, where boundaries are defined by posts driven into the ground, a building strata typically defines the boundaries of its strata lots by reference to the physical floors, walls, and ceilings of the structure. As dual-registered British Columbia Land Surveyors (*BCLS*) and Professional Engineers, our firm delivers the professional services, absolute statutory authority, and strategic guidance required to accurately define your multi-family, commercial, or mixed-use development.',
    href: '/services/building-strata-surveys/',
    icon: FileText,
    image: '/images/survey-marker-post.webp'
  },
  {
    slug: 'consolidation-surveys',
    title: 'Consolidation Surveys',
    description: 'When preparing for a major commercial development, assembling a multi-phase residential site, or simply seeking to unify your property holdings in {{LOCATION_NAME}}, consolidating multiple adjoining parcels into a single legal title is a highly strategic maneuver. A consolidation survey legally dissolves the internal boundary lines between contiguous lots, creating a single, unified parcel that maximizes your buildable footprint, simplifies your property tax assessments, and provides a clean canvas for your architectural and engineering teams. As a dual-registered *British Columbia Land Surveyor* (*BCLS*) and *Professional Engineer*, our firm delivers the professional geomatics engineering, statutory authority, and professional insight required to execute your land consolidation.',
    href: '/services/consolidation-surveys/',
    icon: FileText,
    image: '/images/survey-marker-post.webp'
  },
  {
    slug: 'covenant-surveys',
    title: 'Covenant Surveys',
    description: 'When undertaking major subdivisions, commercial developments, or environmental conservation projects in {{LOCATION_NAME}}, navigating the complexities of land use restrictions is critical to your success. A covenant, governed primarily by Section 219 of the Land Title Act, is a powerful legal instrument that can be of a negative or positive nature. It can strictly prohibit or restrict the subdivision of land, the use of land, and the construction of buildings, or it can mandate that a specified natural, historical, or environmental amenity be protected, preserved, and maintained. These covenants are typically registered in favour of the Crown, a municipality, a regional district, or a specifically designated person or organization. As a dual-registered firm of British Columbia Land Surveyors (*BCLS*) and Professional Engineers, our professional geomatics team delivers the high statutory authority and spatial precision required to legally define these encumbrances and secure your development approvals.',
    href: '/services/covenant-surveys/',
    icon: FileText,
    image: '/images/survey-marker-post.webp'
  },
  {
    slug: 'easement-surveys',
    title: 'Easement Surveys',
    description: 'Developing real estate, sharing infrastructure, or securing access across a neighbour’s parcel requires establishing clear, legally binding property rights. In {{LOCATION_NAME}}, an easement is a specialized right that one person may exercise with respect to the land of another, requiring both a "dominant tenement" (the property benefiting from the right) and a "servient tenement" (the property burdened by it). Whether you are securing a critical access corridor, registering shared utility services, or resolving an encroachment, ensuring these rights are accurately mapped and legally defined is primary to the success of your real estate investment. As a dual-registered firm of British Columbia Land Surveyors (*BCLS*) and Professional Engineers, we deliver the professional geomatics engineering and high statutory authority required to accurately delineate your easement areas and protect your property rights.',
    href: '/services/easement-surveys/',
    icon: FileText,
    image: '/images/survey-marker-post.webp'
  },
  {
    slug: 'environmental-and-riparian-surveys',
    title: 'Environmental And Riparian Surveys',
    description: 'In {{LOCATION_NAME}}, developing land near sensitive ecosystems, managing natural watercourses, or remediating historically contaminated sites requires precise spatial data and strict adherence to overlapping provincial environmental legislation. Whether you are working alongside Qualified Environmental Professionals (QEPs) to map critical fish habitat, or delineating the exact spatial limits of a contaminated site for a Site Disclosure Statement, absolute spatial certainty is primary. Under the Land Surveyors Act, determining the location of any natural or artificial feature—such as the top of a ravine bank, the limits of a Streamside Protection and Enhancement Area (SPEA), or the boundaries of a remediation zone—relative to a legal property boundary for the purpose of certifying it in writing is exclusively defined as the "practice of land surveying". Relying on unlicensed technicians to map these environmental constraints exposes your project to significant risks, including environmental damage, massive financial penalties, and halted development approvals.',
    href: '/services/environmental-and-riparian-surveys/',
    icon: Trees,
    image: '/images/environmental-and-riparian-surveys.webp'
  },
  {
    slug: 'excavation-layout-surveys',
    title: 'Excavation Layout Surveys',
    description: 'Before a single yard of earth is moved or a foundation is poured in {{LOCATION_NAME}}, the spatial certainty of your construction site must be absolutely guaranteed. Construction layouts and the establishment of site benchmarks form the critical framework that dictates the success of your entire development, yet they are widely recognized as the single greatest source of liability in the land surveying profession. In British Columbia, determining the location of any natural or artificial feature—such as an excavation limit, foundation, or gridline—relative to a legal property boundary for the purpose of certifying it in writing is exclusively defined as the "practice of land surveying" under the Land Surveyors Act. Relying on unlicensed contractors to lay out your multi-million dollar excavation exposes your project to significant risks, including boundary encroachments, failed municipal inspections, and costly structural redesigns.',
    href: '/services/excavation-layout-surveys/',
    icon: HardHat,
    image: '/images/construction.webp'
  },
  {
    slug: 'form-and-foundation-surveys',
    title: 'Form And Foundation Surveys',
    description: 'Before pouring concrete for a major commercial or residential development in {{LOCATION_NAME}}, confirming the exact spatial location of your formwork and foundation is critical to preventing significant boundary encroachments and failed municipal inspections. Under the Land Surveyors Act, determining the location of any artificial feature—such as concrete forms, footings, or poured foundation walls—relative to a property boundary for the purpose of certifying it in writing is exclusively defined as the "practice of land surveying". Only a commissioned *British Columbia Land Surveyor* (*BCLS*) holds the statutory authority to provide this certification, protecting your project from the immense financial and legal liabilities associated with relying on unlicensed contractors.',
    href: '/services/form-and-foundation-surveys/',
    icon: FileText,
    image: '/images/survey-marker-post.webp'
  },
  {
    slug: 'gridline-and-construction-layout-surveys',
    title: 'Gridline And Construction Layout Surveys',
    description: 'Translating highly complex architectural and engineering designs into physical reality in {{LOCATION_NAME}} requires high precision and absolute spatial certainty. Gridline layout surveys provide the fundamental geometric framework for your entire construction project, dictating the placement of foundations, columns, and structural shear walls. Because gridlines are inherently tied to your property\'s legal limits to ensure compliance with municipal setbacks, establishing this framework is an intensely regulated legal process. Under the Land Surveyors Act, determining the location of any artificial feature relative to a property boundary for the purpose of certifying it in writing is exclusively defined as the "practice of land surveying". Relying on unlicensed contractors to map your structural gridlines exposes your development to significant risks, including boundary encroachments and halted construction. Only a commissioned *British Columbia Land Surveyor* (*BCLS*) holds the statutory authority and professional liability insurance to legally position these critical features relative to property boundaries.',
    href: '/services/gridline-and-construction-layout-surveys/',
    icon: FileText,
    image: '/images/survey-marker-post.webp'
  },
  {
    slug: 'infrastructure-layout-and-construction-surveys',
    title: 'Infrastructure Layout And Construction Surveys',
    description: 'When developing critical infrastructure, highway corridors, or major municipal utilities in {{LOCATION_NAME}}, translating complex engineering designs into physical reality is primary. Construction layouts form the geometric framework that dictates the success of your entire development, yet they represent one of the greatest single sources of liability in the land surveying and construction professions. In British Columbia, determining the location of any artificial feature—such as bridge abutments, drainage networks, or road alignments—relative to a legal boundary for the purpose of certifying it in writing is exclusively defined as the "practice of land surveying" under the Land Surveyors Act. Relying on unlicensed contractors for boundary-sensitive construction layout exposes your project to significant financial and legal risks.',
    href: '/services/infrastructure-layout-and-construction-surveys/',
    icon: FileText,
    image: '/images/survey-marker-post.webp'
  },
  {
    slug: 'land-act-surveys',
    title: 'Land Act Surveys',
    description: 'Acquiring Crown land, securing major resource tenures, or establishing public infrastructure in {{LOCATION_NAME}} requires navigating the systematic legislative framework of the Land Act. A Land Act survey is a specialized process used to create, define, or alter the boundaries of provincial Crown land, typically culminating in the issuance of a Crown grant, a lease, a license of occupation, or the establishment of a public road. As a dual-registered firm of British Columbia Land Surveyors (*BCLS*) and Professional Engineers, our professional geomatics team delivers the high statutory authority and spatial precision required to legally define these Crown parcels and secure your tenure rights.',
    href: '/services/land-act-surveys/',
    icon: FileText,
    image: '/images/survey-marker-post.webp'
  },
  {
    slug: 'natural-boundary-surveys',
    title: 'Natural Boundary Surveys',
    description: 'In {{LOCATION_NAME}}, properties bordering oceans, lakes, and rivers represent some of the most valuable real estate, but their waterfront limits are highly dynamic. A "natural boundary" is legally defined under the Land Act as the visible high water mark where the presence and action of water are so common and usual, and so long continued in all ordinary years, as to mark on the soil of the bed of the body of water a character distinct from that of its banks in vegetation, as well as in the nature of the soil itself. Because water bodies are ambulatory, property lines naturally shift over time through slow, imperceptible processes like accretion (the gradual deposition of new land) and erosion (the gradual washing away of land). By common law, lawful accretion belongs to the upland owner, while eroded land reverts to the owner of the water body, generally the provincial Crown. In contrast, a sudden, perceptible change in a watercourse—known as avulsion—does not alter the legal property limits. Furthermore, artificial modifications, such as the placement of fill or retaining walls on the foreshore, do not constitute lawful accretion, and the true natural boundary remains in its location immediately prior to the interference.',
    href: '/services/natural-boundary-surveys/',
    icon: FileText,
    image: '/images/survey-marker-post.webp'
  },
  {
    slug: 'phased-strata-surveys',
    title: 'Phased Strata Surveys',
    description: 'When undertaking a large-scale real estate development in {{LOCATION_NAME}}, managing capital costs and market absorption is critical to the financial success of the project. Phased strata developments provide developers with the advantage of constructing and registering a single, unified strata community in successive stages over time. Governed by Part 13 of the Strata Property Act, a phased strata plan operates as a series of interim subdivisions; upon the deposit of the first phase, the strata corporation is formed, and title to the strata lots in Phase 1 are created while the remainder of the parent parcel remains under the Land Title Act. As dual-registered British Columbia Land Surveyors (*BCLS*) and Professional Engineers, our firm delivers the professional geomatics engineering, statutory authority, and professional foresight required to successfully navigate this highly complex legal and spatial process.',
    href: '/services/phased-strata-surveys/',
    icon: FileText,
    image: '/images/survey-marker-post.webp'
  },
  {
    slug: 'proposed-strata-plans',
    title: 'Proposed Strata Plans',
    description: 'When launching a multi-family or mixed-use development in {{LOCATION_NAME}}, initiating pre-sales early in the project lifecycle is critical to securing your construction financing. To market and sell future strata lots before the building is completed, developers must file a Disclosure Statement with the Superintendent of Real Estate, strictly governed by the Real Estate Development Marketing Act (REDMA). A cornerstone of this disclosure is the Proposed Strata Plan, a specialized document that translates architectural designs into a preliminary legal framework, illustrating the proposed strata lots, limited common property (LCP), and preliminary unit entitlements. Because REDMA allows developers to enter into binding contracts of purchase and sale based on these proposed plans, they carry immense financial weight. As a dual-registered firm of British Columbia Land Surveyors (*BCLS*) and Professional Engineers, our professional geomatics team delivers the high statutory authority and strategic foresight required to accurately prepare your Proposed Strata Plans, protecting your pre-sales from significant collapse.',
    href: '/services/proposed-strata-plans/',
    icon: FileText,
    image: '/images/survey-marker-post.webp'
  },
  {
    slug: 'road-surveys',
    title: 'Road Surveys',
    description: 'Whether designing new transportation infrastructure, dedicating public access for a major municipal subdivision, or resolving historical access rights in {{LOCATION_NAME}}, the establishment and surveying of roads is an intensely regulated legal process. Navigating the complex spatial and legislative requirements demands professional geomatics engineering, strategic foresight, and high statutory authority. In British Columbia, the measurement of land to determine, locate, define, establish, or re-establish boundaries is legally defined as the "practice of land surveying" under the Land Surveyors Act. Therefore, only a commissioned *British Columbia Land Surveyor* (*BCLS*) holds the exclusive statutory right to determine the legal boundaries of transportation corridors and certify the associated survey plans.',
    href: '/services/road-surveys/',
    icon: FileText,
    image: '/images/survey-marker-post.webp'
  },
  {
    slug: 'statutory-rights-of-way-surveys',
    title: 'Statutory Rights Of Way Surveys',
    description: 'When expanding utility networks, developing major pipeline infrastructure, or securing essential municipal services in {{LOCATION_NAME}}, acquiring the legal right to cross both private and Crown land is vital to the success of your project. A Statutory Right of Way (SRW) is a powerful legal instrument defined under the Land Title Act as an easement without a designated dominant tenement, which allows governments, public utilities, and designated corporations to hold the right to use another\'s land for a specific purpose. As a dual-registered firm of British Columbia Land Surveyors (*BCLS*) and Professional Engineers, our digital and technical experts deliver the professional geomatics engineering, high statutory authority, and strategic foresight required to accurately map these critical corridors and legally secure your infrastructure investments.',
    href: '/services/statutory-rights-of-way-surveys/',
    icon: FileText,
    image: '/images/statutory-rights-of-way-surveys.webp'
  },
  {
    slug: 'strata-plan-amendment-surveys',
    title: 'Strata Plan Amendment Surveys',
    description: 'As buildings and communities in {{LOCATION_NAME}} age and evolve, the spatial and legal needs of the property owners inevitably change. Altering an existing strata development is an intensely complex legal, spatial, and administrative process that is strictly governed by Part 15 of the Strata Property Act, the *Strata Property Regulation*, the Land Title Act, and the Association of British Columbia Land Surveyors (ABCLS) Survey and Plan Rules. Modifying these legal boundaries constitutes the "practice of land surveying," meaning only a commissioned *British Columbia Land Surveyor* (*BCLS*) holds the exclusive statutory authority to prepare and certify your strata plan amendments. Whether you are a strata corporation redefining limited common property, or a developer consolidating strata lots, our dual-registered firm of Professional Engineers and Land Surveyors delivers the professional geomatics engineering and authoritative legal foresight required to accurately execute your amendment.',
    href: '/services/strata-plan-amendment-surveys/',
    icon: FileText,
    image: '/images/survey-marker-post.webp'
  },
  {
    slug: 'strata-surveys',
    title: 'Strata Surveys',
    description: 'Over the lifespan of a development in {{LOCATION_NAME}}, the Strata Property Act provides a powerful mechanism to create individual ownership of units while maintaining communal governance over common property. Creating or altering strata lots is an intensely complex process strictly regulated by the Strata Property Act, the *Strata Property Regulation*, the *Bare Land Strata Regulations*, and the Association of British Columbia Land Surveyors (ABCLS) Survey and Plan Rules. Because the "practice of land surveying" is legally defined to include determining, defining, and establishing boundaries in order to create new legal titles, only a commissioned *BCLS* holds the exclusive statutory authority under the Land Surveyors Act to prepare and certify your strata plan.',
    href: '/services/strata-surveys/',
    icon: FileText,
    image: '/images/survey-marker-post.webp'
  },
  {
    slug: 'subdivisions-surveys',
    title: 'Subdivision Surveys',
    description: 'Whether you are severing a single residential lot or designing a sprawling multi-phase community in {{LOCATION_NAME}}, subdividing land is one of the most powerful mechanisms for maximizing real estate value, unlocking development potential, and facilitating the transfer of property. Part 7 of the land title act is designed to ensure that municipal and regional authorities retain control over development, regulating zoning, drainage, utility supply, and local aesthetics in the public interest, while also ensuring the operation of the province\'s Torrens land registration system.',
    href: '/services/subdivisions-surveys/',
    icon: Scale,
    image: '/images/subdivision-surveys.webp'
  },
  {
    slug: 'terrestrial-lidar-scanning',
    title: 'Terrestrial LiDAR Scanning',
    description: 'When undertaking intricate architectural retrofits, mapping highly detailed heritage facades, or analyzing complex infrastructure in {{LOCATION_NAME}}, conventional surveying methods may lack the density and speed required to capture the complete physical reality of your site. Terrestrial LiDAR (3D laser scanning) is a revolutionary geomatics technology that captures hundreds of thousands of high-precision measurements per second, generating a accurate, colorized 3D point cloud of the as-built environment. However, when this cutting-edge technology is utilized to determine the location of any natural or artificial feature relative to a legal property boundary for the purpose of certifying it in writing, it is exclusively defined as the "practice of land surveying" under the Land Surveyors Act. Relying on unlicensed scanning technicians to map your project exposes you to boundary encroachments, rejected municipal applications, and severe legal liabilities.',
    href: '/services/terrestrial-lidar-scanning/',
    icon: CheckCircle2,
    image: '/images/terrestrial-lidar-scanning.webp'
  },
  {
    slug: 'topographic-surveys-and-site-plans',
    title: 'Topographic Surveys And Site Plans',
    description: 'Topographic surveys and site plans form the critical baseline for any architectural design, engineering, or real estate development in {{LOCATION_NAME}}. A plan of topography is a specialized document, prepared by a commissioned *British Columbia Land Surveyor* (*BCLS*), which illustrates details and information gathered during a systematic field survey, often combined with data from other sources such as as-built records, service location records, and underground feature delineations. Under the Land Surveyors Act, the "practice of land surveying" is legally defined to include the measurement of land to determine the location of any natural or artificial feature relative to a boundary for the purpose of certifying it in writing. Consequently, if your site design requires mapping physical features in relation to your property lines, it is an exclusive statutory right reserved solely for a *BCLS*.',
    href: '/services/topographic-surveys-and-site-plans/',
    icon: Map,
    image: '/images/land-development.webp'
  },
  {
    slug: 'uav-mapping',
    title: 'UAV Mapping',
    description: 'Professional UAV Mapping services by Tantalus Geomatics.',
    href: '/services/uav-mapping/',
    icon: Trees,
    image: '/images/reality-capture.webp'
  },
  {
    slug: 'volume-and-earthwork-surveys',
    title: 'Volume And Earthwork Surveys',
    description: 'When managing major earthworks, deep excavations, or extensive material stockpiles in {{LOCATION_NAME}}, the spatial precision of your volume calculations directly dictates the financial success of your project. In the high-stakes construction and infrastructure industry, a discrepancy of just a few centimeters across a large site can result in thousands of cubic metres of miscalculated material. Because these quantities form the basis for monthly contractor payments and invoicing pay items, relying on precision and systematic quality management is vital to protecting your bottom line. As a dual-registered firm of British Columbia Land Surveyors (*BCLS*) and Professional Engineers, our professional geomatics team delivers the authoritative 3D surface modeling and the precision required to certify your earthworks and eliminate costly billing disputes.',
    href: '/services/volume-and-earthwork-surveys/',
    icon: Waves,
    image: '/images/volume-and-earthwork-surveys.webp'
  }
];

const SERVICE_AREAS = [
  'Squamish',
  'Whistler',
  'Pemberton',
  'Lillooet',
  'West Vancouver',
  'Bowen Island',
  'Britannia Beach',
  'Furry Creek',
  'North Vancouver'
];

export default function Services() {
  const { locationSlug } = useParams<{ locationSlug?: string }>();
  const lead = useLeadForm();

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': ALL_SERVICES.map((service, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Service',
        'name': service.title,
        'description': service.description,
        'url': `https://tantalusgeomatics.com${service.href}`,
        'areaServed': SERVICE_AREAS.map(area => ({
          '@type': 'City',
          'name': area
        })),
        'provider': {
          '@type': 'ProfessionalService',
          'name': 'Tantalus Geomatics Land Surveying Ltd.',
          'areaServed': SERVICE_AREAS
        }
      }
    }))
  };

  return (
    <PageShell>
      <SEO
        title="Land Surveying Services in Sea to Sky"
        description="Comprehensive land surveying and geomatics engineering solutions including topographic Surveys, Construction Surveys, Legal Boundary Surveys, Strata Surveys, drone surveys and 3D laser scanning."
        canonicalUrl="https://tantalusgeomatics.com/services/"
        schema={servicesSchema}
      />

      {/* Hero */}
      <section className="relative py-16 md:py-24 flex items-center justify-center overflow-hidden border-b-2 border-brand-green bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/tantalus-hero-banner.webp"
            alt="Tantalus Lookout"
            className="w-full h-full object-cover opacity-70 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/60 to-brand-dark" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            Professional <span className="text-brand-green font-medium">Land Surveying</span> Services
          </h1>
          <p className="text-base md:text-lg text-white/90 mb-8 leading-relaxed drop-shadow-md max-w-3xl mx-auto">
            Comprehensive Land Surveying, topographic mapping, and construction support.
          </p>
          <div className="flex justify-center px-4 sm:px-0">
            <a
              href="tel:6042139934"
              className="w-full sm:w-auto px-8 py-3 bg-brand-green hover:bg-brand-green-light text-black font-semibold transition-all flex items-center justify-center gap-2 rounded-full"
            >
              <Phone size={20} />
              Call for a free quote
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Our Professional Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Explore our comprehensive range of land surveying, geomatics engineering, and 3D reality capture solutions.
            </p>
          </div>

          <div className="space-y-8">
            {SERVICE_CATEGORIES.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  id={category.id}
                  className="flex flex-col lg:flex-row items-stretch bg-white border border-slate-200 shadow-sm rounded-3xl overflow-hidden mb-8"
                >
                  {/* Left-Side Graphic Block */}
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full lg:w-1/3 min-h-[240px] object-cover"
                    referrerPolicy="no-referrer"
                  />

                  {/* Right-Side Metadata Column */}
                  <div className="w-full lg:w-2/3 p-8 flex flex-col justify-between">
                    <div>
                      {/* Icon Box */}
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-green-dark mb-4">
                        <IconComponent className="w-6 h-6" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        {category.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-600 font-light text-base leading-relaxed mb-6">
                        {category.description}
                      </p>
                    </div>

                    {/* Child Deep-Links List Section */}
                    <div className="border-t border-slate-100 pt-6">
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                        Available Services
                      </h4>
                      <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {category.serviceSlugs.map((slug) => {
                          const service = ALL_SERVICES.find((s) => s.slug === slug);
                          if (!service) return null;
                          return (
                            <Link
                              key={slug}
                              to={locationSlug ? `/${locationSlug}/services/${service.slug}/` : `/services/${service.slug}/`}
                              className="text-brand-green-dark font-medium hover:underline flex items-center gap-2 mt-2"
                            >
                              <ArrowRight className="w-4 h-4" />
                              {service.title}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action / Contact Form - 2 Column Layout */}
      <section className="py-24 bg-white border-b-2 border-brand-green">
        <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Column 1: Contact Form */}
            <div className="bg-brand-dark p-8 md:p-10 border border-white/10 shadow-2xl rounded-2xl flex flex-col justify-center">
              <h3 className="text-2xl font-light text-white mb-8">Request a Free Quote Today</h3>
              <LeadQuoteForm
                variant="embedded"
                formId="contact-form"
                ariaLabel="Contact form"
                {...lead}
              />
            </div>

            {/* Column 2: Surveyor Image */}
            <div className="relative w-full h-[400px] lg:h-full rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl">
              <img
                src="/images/DS-TS-1.webp"
                alt="Land Surveyor out in the field"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
