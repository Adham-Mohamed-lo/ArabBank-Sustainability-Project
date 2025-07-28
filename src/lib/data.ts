
export const financingBySectorData = [
  { sector: "Renewable Energy", financing: 12500000 },
  { sector: "Water Management", financing: 8200000 },
  { sector: "Waste Management", financing: 6800000 },
  { sector: "Healthcare", financing: 9100000 },
  { sector: "Education", financing: 5300000 },
  { sector: "Smart Agriculture", financing: 3300000 },
];

export const financingByCompanySizeData = [
    { companySize: "Micro", financing: 4000000 },
    { companySize: "Small", financing: 15000000 },
    { companySize: "Medium", financing: 20000000 },
    { companySize: "Large", financing: 6200000 },
];

export const financingBySustainabilityType = [
  { type: "Environmental", financing: 27800000 },
  { type: "Social", financing: 17400000 },
]

export const COLORS = ["#0056b3", "#007bff", "#F39C12", "#8E44AD", "#2ECC71"];

const projectsForClient1 = [
    {
      id: 101,
      purposeOfFinancing: "تركيب ألواح شمسية لسقف المصنع",
      totalFinancingAmount: 3500000,
      amountUsed: 3500000,
      currency: "جنيه مصري",
      typeOfFacility: "طويل الأجل",
      facilityClassification: "عامل",
      usageType: "تسهيل جديد",
      dateOfCreditApproval: new Date("2023-05-15"),
      fundedUnderInitiative: "GEFF",
      environmentalConsultantUsed: true,
      sustainabilityAxis: "الطاقة المتجددة",
      environmentalSocialClassification: "بيئي",
      classificationMethod: "نوع المشروع المحدد",
      impactIndicators: "تقليل انبعاثات ثاني أكسيد الكربون بمقدار 500 طن/سنة",
      status: "مكتمل",
    },
    {
      id: 102,
      purposeOfFinancing: "تحديث نظام الإضاءة إلى نظام موفر للطاقة",
      totalFinancingAmount: 1500000,
      amountUsed: 1200000,
      currency: "جنيه مصري",
      typeOfFacility: "متوسط الأجل",
      facilityClassification: "عامل",
      usageType: "مستخدم حالي",
      dateOfCreditApproval: new Date("2024-01-20"),
      fundedUnderInitiative: "",
      environmentalConsultantUsed: false,
      sustainabilityAxis: "الطاقة المتجددة",
      environmentalSocialClassification: "بيئي",
      classificationMethod: "نوع المشروع المحدد",
      impactIndicators: "تقليل استهلاك الكهرباء بنسبة 20٪",
      status: "نشيط",
    },
];

const projectsForClient2 = [
    {
        id: 201,
        purposeOfFinancing: "محطة معالجة مياه الصرف الصحي",
        totalFinancingAmount: 1200000,
        amountUsed: 1200000,
        currency: "جنيه مصري",
        typeOfFacility: "طويل الأجل",
        facilityClassification: "عامل",
        usageType: "تسهيل جديد",
        dateOfCreditApproval: new Date("2022-11-10"),
        fundedUnderInitiative: "EPAP",
        environmentalConsultantUsed: true,
        sustainabilityAxis: "إدارة المياه",
        environmentalSocialClassification: "بيئي",
        classificationMethod: "نوع المشروع المحدد",
        impactIndicators: "معالجة 10,000 متر مكعب من مياه الصرف الصحي سنويًا",
        status: "مكتمل",
    }
];


export const mockClientData = [
  { 
    id: 1, 
    companyName: "Green Tech Solutions", 
    sector: "خاص",
    unifiedCommercialRegNo: "123456789012345678", 
    companyType: "صناعي", 
    companySize: "متوسط", 
    isicCodeL4: "3510",
    contactPerson: "أحمد علي", 
    contactEmail: "ahmed.ali@greentech.com",
    projects: projectsForClient1,
  },
  { 
    id: 2, 
    companyName: "Aqua Pure Ltd.", 
    sector: "خاص",
    unifiedCommercialRegNo: "234567890123456789", 
    companyType: "خدمي", 
    companySize: "صغير", 
    isicCodeL4: "3600",
    contactPerson: "فاطمة الزهراء", 
    contactEmail: "fatima.zahra@aquapure.com",
    projects: projectsForClient2,
  },
  { 
    id: 3, 
    companyName: "Bio-Waste Company", 
    sector: "خاص",
    unifiedCommercialRegNo: "345678901234567890", 
    companyType: "صناعي", 
    companySize: "كبير", 
    isicCodeL4: "3821",
    contactPerson: "خالد حسن", 
    contactEmail: "khaled.hassan@biowaste.com",
    projects: [],
  },
  { 
    id: 4, 
    companyName: "Edu-Vantage", 
    sector: "خاص",
    unifiedCommercialRegNo: "456789012345678901", 
    companyType: "خدمي", 
    companySize: "متوسط", 
    isicCodeL4: "8549",
    contactPerson: "نور محمد", 
    contactEmail: "nour.mohamed@eduvantage.com",
    projects: [],
  },
  { 
    id: 5, 
    companyName: "Agri-Innovate Farms", 
    sector: "خاص",
    unifiedCommercialRegNo: "567890123456789012", 
    companyType: "مقاول", 
    companySize: "صغير",
    isicCodeL4: "0161", 
    contactPerson: "يوسف إبراهيم", 
    contactEmail: "youssef.ibrahim@agriinnovate.com",
    projects: [],
  },
  { 
    id: 6, 
    companyName: "Medicare Hospitals", 
    sector: "عام",
    unifiedCommercialRegNo: "678901234567890123", 
    companyType: "خدمي", 
    companySize: "كبير", 
    isicCodeL4: "8610",
    contactPerson: "مريم المصري", 
    contactEmail: "mariam.elmasry@medicare.com",
    projects: [],
  },
];
