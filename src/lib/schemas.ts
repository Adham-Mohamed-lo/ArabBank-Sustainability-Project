import { z } from 'zod';

export const newProjectSchema = z.object({
  // Section 1: Client Information
  companyName: z.string().min(1, "Company name is required."),
  unifiedCommercialRegNo: z.string().length(18, "Must be exactly 18 digits."),
  companyType: z.enum(["صناعي", "خدمي", "مقاول"]),
  sector: z.enum(["عام", "خاص"]),
  companySize: z.enum(["متناهي الصغر", "صغير", "متوسط", "كبير"]),
  isicCodeL4: z.string().min(1, "ISIC Code is required."),

  // Section 2: Financing Details
  totalFinancingAmount: z.coerce.number().positive("Amount must be positive."),
  amountUsed: z.coerce.number().nonnegative("Amount cannot be negative."),
  currency: z.enum(["جنيه مصري", "معادل أجنبي"]),
  typeOfFacility: z.enum(["قصير الأجل", "متوسط الأجل", "طويل الأجل"]),
  facilityClassification: z.enum(["عامل", "غير عامل"]),
  usageType: z.enum(["تسهيل جديد", "مستخدم حالي", "حالي لم يستخدم بعد"]),
  dateOfCreditApproval: z.date(),
  fundedUnderInitiative: z.string().optional(),
  environmentalConsultantUsed: z.boolean().default(false),

  // Section 3: Sustainability Details
  sustainabilityAxis: z.string().min(1, "Sustainability Axis is required."),
  purposeOfFinancing: z.string().min(1, "Purpose of Financing is required."),
  environmentalSocialClassification: z.enum(["بيئي", "اجتماعي", "كلاهما"]),
  classificationMethod: z.enum(["نشاط الشركة", "نوع المشروع المحدد"]),
  impactIndicators: z.string().min(1, "Impact Indicators are required."),
  
  // Optional file upload
  supportingDocuments: z.any().optional(),
});

export type NewProjectFormValues = z.infer<typeof newProjectSchema>;
