
export const environmentalSectorsData = [
  { sector: "Renewable Energy", financing: 8500000 },
  { sector: "Water Management", financing: 3800000 },
  { sector: "Waste Management", financing: 2100000 },
  { sector: "Smart Agriculture", financing: 1600000 },
];

export const socialSectorsData = [
  { sector: "Healthcare", financing: 25000000 },
  { sector: "Education", financing: 12000000 },
];

export const industrialSectorsData = [
    { sector: "Electricity", financing: 7500000 },
    { sector: "Cement", financing: 4200000 },
    { sector: "Fertilizers", financing: 3000000 },
    { sector: "Iron & Steel", financing: 6800000 },
    { sector: "Aluminum", financing: 2500000 },
    { sector: "Green Hydrogen", financing: 1000000 },
];

export const financingByCompanySizeData = [
    { companySize: "Small", financing: 5400000 },
    { companySize: "Medium", financing: 15300000 },
    { companySize: "Large", financing: 32300000 },
];

export const financingBySustainabilityType = [
  { type: "Environmental", financing: 16000000 },
  { type: "Social", financing: 37000000 },
]

export const financingByCbamData = [
  { type: "CBAM Affected", financing: 25000000 },
  { type: "Not Affected", financing: 28000000 },
];

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

const projectsForClient3 = [
    {
        id: 301,
        purposeOfFinancing: "تطوير مصنع الاسمنت لتقليل الانبعاثات",
        totalFinancingAmount: 4200000,
        amountUsed: 2000000,
        currency: "جنيه مصري",
        typeOfFacility: "طويل الأجل",
        facilityClassification: "عامل",
        usageType: "تسهيل جديد",
        dateOfCreditApproval: new Date("2024-02-10"),
        fundedUnderInitiative: "CBAM Fund",
        environmentalConsultantUsed: true,
        sustainabilityAxis: "الطاقة المتجددة",
        environmentalSocialClassification: "بيئي",
        classificationMethod: "نشاط الشركة",
        impactIndicators: "تقليل استهلاك الطاقة بنسبة 15%",
        status: "نشيط",
    }
];

const projectsForClient4 = [
    {
        id: 401,
        purposeOfFinancing: "تجهيز مدارس بالتكنولوجيا الحديثة",
        totalFinancingAmount: 12000000,
        amountUsed: 5000000,
        currency: "جنيه مصري",
        typeOfFacility: "متوسط الأجل",
        facilityClassification: "عامل",
        usageType: "تسهيل جديد",
        dateOfCreditApproval: new Date("2023-08-15"),
        fundedUnderInitiative: "CBE Education Initiative",
        environmentalConsultantUsed: false,
        sustainabilityAxis: "التعليم",
        environmentalSocialClassification: "اجتماعي",
        classificationMethod: "نوع المشروع المحدد",
        impactIndicators: "توفير أجهزة لوحية لـ 1000 طالب",
        status: "نشيط",
    }
];

const projectsForClient5 = [
    {
        id: 501,
        purposeOfFinancing: "تطبيق أنظمة الري الذكي",
        totalFinancingAmount: 1600000,
        amountUsed: 1600000,
        currency: "جنيه مصري",
        typeOfFacility: "متوسط الأجل",
        facilityClassification: "عامل",
        usageType: "مستخدم حالي",
        dateOfCreditApproval: new Date("2023-03-22"),
        fundedUnderInitiative: "",
        environmentalConsultantUsed: true,
        sustainabilityAxis: "الزراعة الذكية",
        environmentalSocialClassification: "بيئي",
        classificationMethod: "نوع المشروع المحدد",
        impactIndicators: "توفير 40% من استهلاك مياه الري",
        status: "مكتمل",
    }
];


const projectsForClient6 = [
    {
        id: 601,
        purposeOfFinancing: "بناء جناح مستشفى جديد",
        totalFinancingAmount: 25000000,
        amountUsed: 10000000,
        currency: "جنيه مصري",
        typeOfFacility: "طويل الأجل",
        facilityClassification: "عامل",
        usageType: "تسهيل جديد",
        dateOfCreditApproval: new Date("2023-09-01"),
        fundedUnderInitiative: "CBE Health Initiative",
        environmentalConsultantUsed: false,
        sustainabilityAxis: "الصحة",
        environmentalSocialClassification: "اجتماعي",
        classificationMethod: "نوع المشروع المحدد",
        impactIndicators: "زيادة سعة المستشفى بمقدار 50 سريرًا",
        status: "نشيط",
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
    exportsProducts: true,
    transportsToEu: true,
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
    exportsProducts: false,
    transportsToEu: false,
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
    isicCodeL4: "2011",
    exportsProducts: true,
    transportsToEu: false,
    contactPerson: "خالد حسن", 
    contactEmail: "khaled.hassan@biowaste.com",
    projects: projectsForClient3,
  },
  { 
    id: 4, 
    companyName: "Edu-Vantage", 
    sector: "خاص",
    unifiedCommercialRegNo: "456789012345678901", 
    companyType: "خدمي", 
    companySize: "متوسط", 
    isicCodeL4: "8549",
    exportsProducts: false,
    transportsToEu: false,
    contactPerson: "نور محمد", 
    contactEmail: "nour.mohamed@eduvantage.com",
    projects: projectsForClient4,
  },
  { 
    id: 5, 
    companyName: "Agri-Innovate Farms", 
    sector: "خاص",
    unifiedCommercialRegNo: "567890123456789012", 
    companyType: "مقاول", 
    companySize: "صغير",
    isicCodeL4: "0161", 
    exportsProducts: true,
    transportsToEu: false,
    contactPerson: "يوسف إبراهيم", 
    contactEmail: "youssef.ibrahim@agriinnovate.com",
    projects: projectsForClient5,
  },
  { 
    id: 6, 
    companyName: "Medicare Hospitals", 
    sector: "عام",
    unifiedCommercialRegNo: "678901234567890123", 
    companyType: "خدمي", 
    companySize: "كبير", 
    isicCodeL4: "8610",
    exportsProducts: false,
    transportsToEu: false,
    contactPerson: "مريم المصري", 
    contactEmail: "mariam.elmasry@medicare.com",
    projects: projectsForClient6,
  },
];
