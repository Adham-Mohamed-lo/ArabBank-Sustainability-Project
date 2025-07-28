import { z } from 'zod';

export const newProjectSchema = z.object({
  // Section 1: Client Information
  companyName: z.string().min(1, "Company name is required."),
  unifiedCommercialRegNo: z.string().length(18, "Must be exactly 18 digits."),
  companyType: z.enum(["صناعي", "خدمي", "مقاول"]),
  sector: z.enum(["عام", "خاص"]),
  companySize: z.enum(["صغير", "متوسط", "كبير"]),
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
  
  // Sustainability Check
  isSustainabilityProject: z.boolean().default(false),

  // Section 3: Sustainability Details (now conditional)
  sustainabilityAxis: z.string().optional(),
  purposeOfFinancing: z.string().optional(),
  environmentalSocialClassification: z.enum(["بيئي", "اجتماعي", "كلاهما"]).optional(),
  classificationMethod: z.enum(["نشاط الشركة", "نوع المشروع المحدد"]).optional(),
  impactIndicators: z.string().optional(),
  
  // Optional file upload
  supportingDocuments: z.any().optional(),
}).superRefine((data, ctx) => {
    if (data.isSustainabilityProject) {
        if (!data.sustainabilityAxis) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['sustainabilityAxis'],
                message: 'Sustainability Axis is required for sustainability projects.',
            });
        }
        if (!data.purposeOfFinancing) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['purposeOfFinancing'],
                message: 'Purpose of Financing is required for sustainability projects.',
            });
        }
        if (!data.environmentalSocialClassification) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['environmentalSocialClassification'],
                message: 'Environmental/Social Classification is required for sustainability projects.',
            });
        }
        if (!data.classificationMethod) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['classificationMethod'],
                message: 'Classification Method is required for sustainability projects.',
            });
        }
        if (!data.impactIndicators) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['impactIndicators'],
                message: 'Impact Indicators are required for sustainability projects.',
            });
        }
    }
});

export type NewProjectFormValues = z.infer<typeof newProjectSchema>;
