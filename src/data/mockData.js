export const mockSchemes = [
  {
    id: '1',
    name: "PM-KISAN",
    category: "Agriculture",
    reason: "Eligible because you are a farmer with matching income criteria.",
    benefits: "₹6000 per year financial support",
    description: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a scheme to provide income support to all landholding farmer families.",
    status: "ongoing",
    eligibility: ["Farmer", "Agricultural land owner", "Annual income < ₹200,000"],
    applicationDeadline: "2025-12-31",
    startDate: "2019-02-01",
    link: "#"
  },
  {
    id: '2',
    name: "Ayushman Bharat",
    category: "Health",
    reason: "Income level qualifies for health benefits.",
    benefits: "Health coverage up to ₹5 lakh",
    description: "Pradhan Mantri Jan Arogya Yojana (PMJAY) provides health insurance coverage to vulnerable families.",
    status: "ongoing",
    eligibility: ["Family income < ₹500,000", "All citizens", "Priority to rural families"],
    applicationDeadline: "Ongoing",
    startDate: "2018-09-23",
    link: "#"
  },
  {
    id: '3',
    name: "MNREGA",
    category: "Employment",
    reason: "Eligible as rural worker with matching criteria.",
    benefits: "₹350/day guaranteed employment for 100 days/year",
    description: "Mahatma Gandhi National Rural Employment Guarantee Act ensures right to work for rural citizens.",
    status: "ongoing",
    eligibility: ["Rural resident", "Age 18+", "Willing to do unskilled work"],
    applicationDeadline: "Ongoing",
    startDate: "2005-10-02",
    link: "#"
  },
  {
    id: '4',
    name: "Pradhan Mantri Awas Yojana",
    category: "Housing",
    reason: "Eligible for home construction/improvement assistance.",
    benefits: "Subsidy up to ₹2.67 lakh for house construction",
    description: "Housing scheme providing support for affordable housing in rural areas.",
    status: "ongoing",
    eligibility: ["Rural resident", "BPL/APL", "No pucca house"],
    applicationDeadline: "Ongoing",
    startDate: "2016-06-01",
    link: "#"
  },
  {
    id: '5',
    name: "Pradhan Mantri Karam Yogi Mandhan",
    category: "Pension",
    reason: "Eligible as unorganized worker.",
    benefits: "₹3000/month pension after age 60",
    description: "Pension scheme for unorganized workers providing guaranteed minimum monthly pension.",
    status: "ongoing",
    eligibility: ["Unorganized worker", "Age 18-40", "Monthly income < ₹15,000"],
    applicationDeadline: "Ongoing",
    startDate: "2019-05-31",
    link: "#"
  },
  {
    id: '6',
    name: "Sukanya Samriddhi Yojana",
    category: "Education & Savings",
    reason: "Eligible parent/guardian of girl child.",
    benefits: "High interest rates (7.6% annually) with tax benefits",
    description: "Savings scheme for girl child education and marriage expenses.",
    status: "ongoing",
    eligibility: ["Girl child below 10 years", "Indian resident", "Can open from age 10"],
    applicationDeadline: "Ongoing",
    startDate: "2015-01-22",
    link: "#"
  },
  {
    id: '7',
    name: "PM-SVANidhi",
    category: "Business",
    reason: "Eligible as street vendor.",
    benefits: "₹10,000 working capital loan with subsidy",
    description: "Micro-credit scheme for street vendors to support their business.",
    status: "upcoming",
    eligibility: ["Street vendor", "City resident", "Valid vending permit"],
    applicationDeadline: "2025-12-31",
    startDate: "2020-06-01",
    link: "#"
  },
  {
    id: '8',
    name: "National Social Assistance Programme",
    category: "Social Security",
    reason: "Eligible for old age assistance.",
    benefits: "₹500/month to ₹1000/month for BPL families",
    description: "Social security scheme providing support to elderly, widows, and disabled persons.",
    status: "upcoming",
    eligibility: ["Age 60+", "BPL/APL", "No other pension"],
    applicationDeadline: "2025-06-30",
    startDate: "1995-11-01",
    link: "#"
  },
  {
    id: '9',
    name: "Pradhan Mantri Ujjwala Yojana",
    category: "Utilities",
    reason: "Eligible for LPG connection with subsidy.",
    benefits: "Free LPG connection + ₹1600 cash back",
    description: "Scheme providing free LPG connections to BPL families for clean cooking fuel.",
    status: "upcoming",
    eligibility: ["BPL family", "No existing LPG connection", "Female head of family"],
    applicationDeadline: "2025-03-31",
    startDate: "2016-05-01",
    link: "#"
  },
  {
    id: '10',
    name: "Pradhan Mantri Mudra Yojana",
    category: "Business",
    reason: "Eligible for business loan without collateral.",
    benefits: "Loan up to ₹10 lakh for business",
    description: "Loan scheme for small/medium enterprises and self-employed individuals.",
    status: "ongoing",
    eligibility: ["Age 18+", "Indian citizen", "Self-employed/entrepreneur"],
    applicationDeadline: "Ongoing",
    startDate: "2015-04-08",
    link: "#"
  }
];

export const getSchemeById = (id) => {
  return mockSchemes.find(scheme => scheme.id === id);
};

export const getSchemesByStatus = (status) => {
  return mockSchemes.filter(scheme => scheme.status === status);
};

export const getSchemesByCategory = (category) => {
  return mockSchemes.filter(scheme => scheme.category === category);
};

export const getUpcomingSchemes = () => {
  return mockSchemes.filter(scheme => scheme.status === 'upcoming');
};

export const getOngoingSchemes = () => {
  return mockSchemes.filter(scheme => scheme.status === 'ongoing');
};

export const getAllCategories = () => {
  return [...new Set(mockSchemes.map(scheme => scheme.category))];
};
