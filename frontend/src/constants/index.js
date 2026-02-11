// Image paths
export const IMAGES = {
  // News Images
  news: {
    news1: '/images/news1.jpg',
    news2: '/images/news2.jpg',
    news3: '/images/news3.jpg',
    news4: '/images/news4.jpg',
  },
  // Partner Logos
  partners: {
    aws: '/images/aws-logo.png',
    axelar: '/images/axelar-logo.png',
    deutscheTelekom: '/images/deutsche-telekom-logo.jpg',
    googleCloud: '/images/google-cloud.svg',
    ledger: '/images/ledger-logo.jpg',
    opera: '/images/opera-logo.png',
    tencentCloud: '/images/tencent-cloud-logo.png',
  },
  // Other Images
  other: {
    worldMap: '/images/world map.jpg',
    novaWave: '/images/nova-wave.png',
    gradientWave: '/images/wave-gradient.png',
  }
};

// News Data
export const NEWS_ITEMS = [
  {
    id: 1,
    title: 'Nova Labs Launches New AI Platform',
    date: 'June 15, 2023',
    category: 'Technology',
    image: IMAGES.news.news1,
    content: `Nova Labs is excited to announce the launch of our groundbreaking AI platform, designed to revolutionize how businesses and developers interact with artificial intelligence.

Our new platform offers unprecedented capabilities in machine learning, natural language processing, and predictive analytics. With advanced tools and intuitive interfaces, we're making AI more accessible and powerful than ever before.

Key features include:
- Advanced AI model training
- Seamless integration with existing workflows
- Scalable cloud infrastructure
- Comprehensive AI ethics framework

This platform represents a significant milestone in our commitment to democratizing AI technology and empowering innovators worldwide.`
  },
  {
    id: 2,
    title: 'Expanding Our Global Reach',
    date: 'June 10, 2023',
    category: 'Company News',
    image: IMAGES.news.news2,
    content: `Nova Labs is proud to announce our strategic expansion into new international markets. We are establishing regional offices in key technology hubs to better serve our global community of developers, researchers, and innovators.

Our expansion includes:
- New office in Singapore
- Increased presence in European tech centers
- Strategic partnerships with regional innovation ecosystems

By growing our global footprint, we aim to foster collaboration, drive technological innovation, and create opportunities for tech professionals around the world.`
  },
  {
    id: 3,
    title: 'Innovation Summit 2023 Highlights',
    date: 'June 5, 2023',
    category: 'Events',
    image: IMAGES.news.news3,
    content: `The Nova Labs Innovation Summit 2023 was a resounding success, bringing together the brightest minds in technology, AI, and digital transformation.

Summit Highlights:
- Keynote on AI Ethics by Dr. Emily Chen
- Breakthrough AI Research Presentations
- Networking Sessions with Industry Leaders
- Launch of Nova Labs Community Grant Program

The event showcased cutting-edge research, fostered meaningful connections, and reinforced our commitment to responsible and innovative technological development.`
  },
  {
    id: 4,
    title: 'New Partnership Announcement',
    date: 'June 1, 2023',
    category: 'Partnership',
    image: IMAGES.news.news4,
    content: `Nova Labs is thrilled to announce a strategic partnership with leading cloud and technology providers to enhance our AI infrastructure and global reach.

Partnership Highlights:
- Collaborative AI Research Programs
- Enhanced Cloud Computing Resources
- Joint Innovation Initiatives
- Shared Commitment to Responsible AI Development

This partnership represents a significant step in our mission to democratize and advance artificial intelligence technologies, bringing together the best minds and resources in the industry.`
  },
];

// Animation Configurations
export const ANIMATIONS = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },
  infiniteScroll: {
    animate: {
      x: ["0%", "-66.666%"]
    },
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 40,
        ease: "linear",
      },
    },
  },
};

// Global Styles
export const STYLES = {
  gradients: {
    primary: 'bg-gradient-to-r from-purple-400 to-fuchsia-400',
    secondary: 'bg-gradient-to-r from-purple-600 to-cyan-500',
  },
  containers: {
    maxWidth: 'max-w-7xl mx-auto px-4',
    section: 'py-20',
  },
  cards: {
    base: 'bg-gray-900/50 backdrop-blur-lg rounded-2xl overflow-hidden',
    hover: 'group hover:scale-105 transition-all duration-300',
  },
  text: {
    heading: 'text-4xl md:text-5xl font-bold mb-4',
    subheading: 'text-gray-400 max-w-2xl mx-auto',
  },
};
