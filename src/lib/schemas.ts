import { z } from 'zod';

export const newProjectSchema = z.object({
  // Section 1: Client Information
  companyName: z.string().min(1, "Company name is required."),
  unifiedCommercialRegNo: z.string().length(18, "Must be exactly 18 digits."),
  companyType: z.enum(["Industrial", "Service", "Contractor"]),
  sector: z.enum(["Public", "Private"]),
  companySize: z.enum(["Micro", "Small", "Medium", "Large"]),
  isicCodeL4: z.string().min(1, "ISIC Code is required."),

  // Section 2: Financing Details
  totalFinancingAmount: z.coerce.number().positive("Amount must be positive."),
  amountUsed: z.coerce.number().nonnegative("Amount cannot be negative."),
  currency: z.enum(["EGP", "Foreign"]),
  typeOfFacility: z.enum(["Short term", "Medium term", "Long term"]),
  facilityClassification: z.enum(["Performing", "Non-performing"]),
  usageType: z.enum(["New Facility", "Existing Used", "Existing Not Yet Used"]),
  dateOfCreditApproval: z.date(),
  fundedUnderInitiative: z.string().optional(),
  environmentalConsultantUsed: z.boolean().default(false),

  // Section 3: Sustainability Details
  sustainabilityAxis: z.string().min(1, "Sustainability Axis is required."),
  purposeOfFinancing: z.string().min(1, "Purpose of Financing is required."),
  environmentalSocialClassification: z.enum(["Environmental", "Social", "Both"]),
  classificationMethod: z.enum(["Company activity", "Specific project type"]),
  impactIndicators: z.string().min(1, "Impact Indicators are required."),
  
  // Optional file upload
  supportingDocuments: z.any().optional(),
});

export type NewProjectFormValues = z.infer<typeof newProjectSchema>;
