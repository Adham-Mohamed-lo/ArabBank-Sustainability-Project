import { z } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf", 
  "application/vnd.ms-excel", 
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
];
const ACCEPTED_FILE_TYPES_STRING = ".pdf, .xls, .xlsx";

const fileSchema = z
  .any()
  .refine((files) => !files || files.length === 0 || files?.[0], "File is required.")
  .refine((files) => !files || files.length === 0 || files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (files) => !files || files.length === 0 || ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
    `Only ${ACCEPTED_FILE_TYPES_STRING} files are accepted.`
  )
  .optional();


export const newProjectSchema = z.object({
  // Section 1: Client Information
  companyName: z.string().min(1, "Company name is required."),
  unifiedCommercialRegNo: z.string().length(18, "Must be exactly 18 digits."),
  companyType: z.enum(["صناعي", "خدمي", "مقاول"], { required_error: "Company type is required."}),
  sector: z.enum(["عام", "خاص"], { required_error: "Sector is required."}),
  companySize: z.enum(["صغير", "متوسط", "كبير"], { required_error: "Company size is required."}),
  isicCodeL4: z.string().min(1, "ISIC Code is required."),
  exportsProducts: z.boolean().default(false),
  transportsToEu: z.boolean().default(false),

  // Section 2: Financing Details
  totalFinancingAmount: z.coerce.number().positive("Amount must be positive."),
  amountUsed: z.coerce.number().nonnegative("Amount cannot be negative."),
  currency: z.enum(["جنيه مصري", "معادل أجنبي"], { required_error: "Currency is required."}),
  typeOfFacility: z.enum(["قصير الأجل", "متوسط الأجل", "طويل الأجل"], { required_error: "Type of facility is required."}),
  facilityClassification: z.enum(["عامل", "غير عامل"], { required_error: "Facility classification is required."}),
  usageType: z.enum(["تسهيل جديد", "مستخدم حالي", "حالي لم يستخدم بعد"], { required_error: "Usage type is required."}),
  dateOfCreditApproval: z.date({ required_error: "Date of credit approval is required."}),
  fundedUnderInitiative: z.string().optional(),
  environmentalConsultantUsed: z.boolean().default(false),
  
  // Sustainability Check
  isSustainabilityProject: z.boolean().default(false),

  // Section 3: Sustainability Details (now conditional)
  sustainabilityAxis: z.string().optional(),
  purposeOfFinancing: z.string().optional(),
  environmentalSocialClassification: z.enum(["بيئي", "اجتماعي"]).optional(),
  classificationMethod: z.enum(["نشاط الشركة", "نوع المشروع المحدد"]).optional(),
  impactIndicators: z.string().optional(),
  
  // Optional file upload
  supportingDocuments: fileSchema,
    
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
