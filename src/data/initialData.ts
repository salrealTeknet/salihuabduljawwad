export const defaultData = {
  hero: {
    name: "Salih Abduljawwad",
    title: "Data Analyst & Insight Engineer",
    description: "I transform raw data into compelling stories and actionable insights. Trained at Skillahead Data Analysis, I build dashboards that drive business decisions using Excel, Power BI, and AI tools."
  },
  about: {
    experience: "1+ Year",
    description1: "Hello! I'm Salih Abduljawwad, a passionate Data Analyst with a keen eye for finding the hidden stories within numbers. My journey into data analytics is driven by curiosity and a desire to solve real-world business problems.",
    description2: "I recently completed an intensive 1-year program at Skillahead Data Analysis, where I honed my skills in data extraction, cleaning, visualization, and interpretation. During this time, I've handled a variety of projects that demonstrate my ability to work end-to-end on data pipelines.",
    description3: "My approach combines traditional analytical rigor with modern AI tools (like Tableau +Power BI + ChatGPT + Gamma) to accelerate insights and provide deeper, more predictive analyses than standard reporting alone.",
    education: "Skillahead Data Analysis Program (1 Year)",
    experienceText: "Multiple hands-on projects & datasets"
  },
  contact: {
    email: "salihuabduljawwad.a@gmail.com",
    phone: "+2348122484150",
    location: "Available for remote work worldwide"
  },
  socials: {
    linkedin: "www.linkedin.com/in/abduljawwad-salihu-69006723b",
    github: "https://github.com/salrealTeknet",
    twitter: "https://twitter.com"
  },
  settings: {
    web3formsKey: "4176328f-b3a2-41dd-9688-19fef210fcfc", // Used for contact form email sending
    profileImage: "/images/profileimg.jpg"
  },
  projects: [
    {
      id: 1,
      title: 'Telecommunication sale and calls analysis',
      category: 'Excel Dashboard',
      image: '/images/Telecom.jpg',
      description: 'A comprehensive Excel dashboard analyzing sales trends, customer demographics, and product performance for Telecommunication company.',
      tags: ['Excel', 'DAX', 'Data Modeling'],
      featured: true,
      link: 'https://1drv.ms/x/c/a94d71367aaf8796/IQB3wMAUBH78QpF3SBD0oTkKAeQ4T8shY5-GJA2bL0R_ZRY?e=iM8eAA'
    },
    {
      id: 2,
      title: 'Financial Forecasting Model',
      category: 'Advanced Excel',
      image: '/images/project-excel.jpg',
      description: 'Complex financial model built in Excel using Power Query to automate data ingestion from multiple sources, featuring scenario analysis and 3-year projections.',
      tags: ['Excel', 'Power Query', 'Financial Modeling'],
      featured: false,
      link: 'https://your-actual-project-link-here.com'
    },
    {
      id: 3,
      title: 'Smart Clean Laundry Bussiness Analysis',
      category: 'AI Analytics',
      image: '/images/Laundry.jpg',
      description: 'Utilized Surgest AI tool to analyze customer behavior patterns and build a predictive model identifying high-risk accounts with 85% accuracy.',
      tags: ['Surgest AI', 'Predictive Analytics', 'Data Prep'],
      featured: false,
      link: 'https://1drv.ms/x/c/a94d71367aaf8796/IQCk57DvoVLRS6T8d8awo4QeAbddBWsQD5-Wy0ck1h8ClU8?e=PHEy0g'
    }
  ],
  skills: [
    { title: 'Microsoft Excel', description: 'Advanced formulas, PivotTables, Power Query, macros, and complex financial modeling.', level: 90, color: 'bg-green-500' },
    { title: 'Power BI', description: 'Interactive dashboard creation, DAX measures, data modeling, and automated reporting.', level: 85, color: 'bg-yellow-500' },
    { title: 'AI Analytics Tools', description: 'Leveraging Surgest AI and other machine learning tools for predictive analytics.', level: 80, color: 'bg-purple-500' },
    { title: 'Data Cleaning', description: 'Structuring messy datasets, handling missing values, and preparing data for analysis.', level: 95, color: 'bg-blue-500' },
    { title: 'Data Visualization', description: 'Choosing the right charts to tell compelling stories to stakeholders.', level: 85, color: 'bg-orange-500' },
    { title: 'Statistical Analysis', description: 'Hypothesis testing, regression analysis, correlation, and identifying trends.', level: 75, color: 'bg-teal-500' }
  ],
  customContent: [] as Array<{
    id: number;
    title: string;
    content: string;
    mediaType: 'none' | 'image' | 'video';
    mediaUrl: string;
    readMoreUrl: string;
  }>
};