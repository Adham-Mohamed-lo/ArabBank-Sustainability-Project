"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { newProjectSchema, type NewProjectFormValues } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InfoTooltip } from "@/components/info-tooltip";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { getIndicatorSuggestions } from "@/lib/actions";
import React, { useState, useEffect, useCallback } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const formFieldsInfo = {
  isSustainabilityProject: { en: "Check this if the project has specific sustainability goals.", ar: "حدد هذا الخيار إذا كان للمشروع أهداف استدامة محددة."},
  companyName: { en: "Full legal name of the company receiving financing.", ar: "الاسم القانوني الكامل للشركة المستفيدة من التمويل." },
  unifiedCommercialRegNo: { en: "18-digit identifier (12 for registration, 3 for office, 3 for governorate).", ar: "معرف مكون من 18 رقمًا (12 للتسجيل، 3 للمكتب، 3 للمحافظة)." },
  companyType: { en: "Choose the company's primary operational category.", ar: "اختر الفئة التشغيلية الأساسية للشركة." },
  sector: { en: "Specify if the company is a public or private entity.", ar: "حدد ما إذا كانت الشركة كيانًا عامًا أم خاصًا." },
  companySize: { en: "Classification based on Central Bank of Egypt (CBE) definitions.", ar: "التصنيف بناءً على تعريفات البنك المركزي المصري." },
  isicCodeL4: { en: "International Standard Industrial Classification code for the business activity.", ar: "رمز التصنيف الصناعي الدولي الموحد للنشاط التجاري." },
  exportsProducts: { en: "Does the company export products?", ar: "هل تقوم الشركة بتصدير المنتجات؟" },
  transportsToEu: { en: "Does the company transport products to the European Union?", ar: "هل تقوم الشركة بنقل المنتجات إلى الاتحاد الأوروبي؟" },
  totalFinancingAmount: { en: "The total amount approved under the credit agreement.", ar: "المبلغ الإجمالي المعتمد بموجب اتفاقية الائتمان." },
  amountUsed: { en: "The portion of financing that has been disbursed to date.", ar: "الجزء من التمويل الذي تم صرفه حتى تاريخه." },
  currency: { en: "Select the currency of the financing.", ar: "اختر عملة التمويل." },
  typeOfFacility: { en: "The term length of the financial facility.", ar: "مدة التسهيل المالي." },
  facilityClassification: { en: "Current status of the facility's performance.", ar: "الحالة الحالية لأداء التسهيل." },
  usageType: { en: "Specify the status of the facility usage.", ar: "حدد حالة استخدام التسهيل." },
  dateOfCreditApproval: { en: "The official start date of the credit contract.", ar: "تاريخ البدء الرسمي لعقد الائتمان." },
  fundedUnderInitiative: { en: "e.g., GEFF, EPAP, CBE initiative, etc.", ar: "مثال: GEFF، EPAP، مبادرة البنك المركزي، إلخ." },
  environmentalConsultantUsed: { en: "Was a certified environmental consultant used to assess the project?", ar: "هل تم استخدام استشاري بيئي معتمد لتقييم المشروع؟" },
  sustainabilityAxis: { en: "Select the primary sustainability category for the project.", ar: "اختر فئة الاستدامة الرئيسية للمشروع." },
  purposeOfFinancing: { en: "State the direct use of the financing as per credit approval.", ar: "اذكر الاستخدام المباشر للتمويل حسب موافقة الائتمان." },
  environmentalSocialClassification: { en: "Is the project environmental, social, or both?", ar: "هل المشروع بيئي أم اجتماعي أم كلاهما؟" },
  classificationMethod: { en: "Classification based on company activity or specific project type.", ar: "التصنيف بناءً على نشاط الشركة أو نوع المشروع المحدد." },
  impactIndicators: { en: "e.g., “Reduce CO₂ by 10%”, “Save 5,000 m³ water per year”, etc.", ar: "مثال: 'تقليل ثاني أكسيد الكربون بنسبة 10٪'، 'توفير 5000 متر مكعب من المياه سنويًا'، إلخ." },
  supportingDocuments: { en: "Upload supporting documents (PDF, Excel, etc.).", ar: "قم بتحميل المستندات الداعمة (PDF ، Excel ، إلخ)." },
};

const DEBOUNCE_DELAY = 1000;
const LOCAL_STORAGE_KEY = "newProjectFormDraft";

const environmentalAxes = [
  { value: "الطاقة المتجددة", label: "الطاقة المتجددة" },
  { value: "المياه", label: "المياه" },
  { value: "المخلفات", label: "المخلفات" },
  { value: "الزراعة الذكية", label: "الزراعة الذكية" },
];

const socialAxes = [
  { value: "الصحة", label: "الصحة" },
  { value: "التعليم", label: "التعليم" },
];

const defaultFormValues: NewProjectFormValues = {
  companyName: "",
  unifiedCommercialRegNo: "",
  companyType: "",
  sector: "",
  companySize: "",
  isicCodeL4: "",
  exportsProducts: false,
  transportsToEu: false,
  totalFinancingAmount: 0,
  amountUsed: 0,
  currency: "",
  typeOfFacility: "",
  facilityClassification: "",
  usageType: "",
  dateOfCreditApproval: undefined,
  fundedUnderInitiative: "",
  environmentalConsultantUsed: false,
  isSustainabilityProject: false,
  sustainabilityAxis: "",
  purposeOfFinancing: "",
  environmentalSocialClassification: "",
  classificationMethod: "",
  impactIndicators: "",
  supportingDocuments: null,
};

export function AddProjectForm() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const { toast } = useToast();
  const [activeAccordionItems, setActiveAccordionItems] = useState<string[]>(["item-1", "item-2"]);

  const form = useForm<NewProjectFormValues>({
    resolver: zodResolver(newProjectSchema),
    defaultValues: defaultFormValues,
  });

  const watchedValues = form.watch();
  const isSustainabilityProject = form.watch("isSustainabilityProject");
  const exportsProducts = form.watch("exportsProducts");
  const envSocialClassification = form.watch("environmentalSocialClassification");

  useEffect(() => {
    if (isSustainabilityProject) {
        setActiveAccordionItems((prev) => [...new Set([...prev, "item-3"])]);
    } else {
        setActiveAccordionItems((prev) => prev.filter((item) => item !== "item-3"));
    }
  }, [isSustainabilityProject]);

  useEffect(() => {
    if (!exportsProducts) {
      form.setValue("transportsToEu", false);
    }
  }, [exportsProducts, form]);


  const sustainabilityAxesOptions = React.useMemo(() => {
    if (envSocialClassification === "بيئي") return environmentalAxes;
    if (envSocialClassification === "اجتماعي") return socialAxes;
    return [];
  }, [envSocialClassification]);

  const handleFetchSuggestions = useCallback(async () => {
    const { sector, purposeOfFinancing } = form.getValues();
    if (sector && purposeOfFinancing) {
      setIsLoadingSuggestions(true);
      setSuggestions([]);
      const result = await getIndicatorSuggestions({ sector, purposeOfFinancing });
      setSuggestions(result);
      setIsLoadingSuggestions(false);
    }
  }, [form]);

  useEffect(() => {
    try {
      const draft = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (draft) {
        const draftValues = JSON.parse(draft);
        // Date needs to be converted back from string
        if (draftValues.dateOfCreditApproval) {
            draftValues.dateOfCreditApproval = new Date(draftValues.dateOfCreditApproval);
        }
        form.reset(draftValues);
      }
    } catch (error) {
        console.error("Failed to load draft from local storage", error);
    }
  }, [form]);

  useEffect(() => {
    const timer = setTimeout(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(watchedValues));
        } catch(error) {
            console.error("Failed to save draft to local storage", error);
        }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [watchedValues]);

  function onSubmit(values: NewProjectFormValues) {
    console.log(values);
    toast({
      title: "Project Submitted",
      description: "The new project data has been sent.",
    });
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    form.reset(defaultFormValues);
  }
  
  function onSaveDraft() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(form.getValues()));
    toast({
      title: "Draft Saved",
      description: "Your progress has been saved locally.",
    });
  }

  function onClearDraft() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    form.reset(defaultFormValues);
    toast({
      title: "Draft Cleared",
      description: "The form has been reset.",
      variant: "destructive",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Accordion type="multiple" value={activeAccordionItems} onValueChange={setActiveAccordionItems} className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl font-semibold">Client Information</AccordionTrigger>
            <AccordionContent className="grid md:grid-cols-2 gap-6 pt-4">
              <FormField name="companyName" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">Company Name <InfoTooltip info={formFieldsInfo.companyName} /></FormLabel>
                  <FormControl><Input placeholder="Full legal name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="unifiedCommercialRegNo" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">Unified Commercial Registration Number <InfoTooltip info={formFieldsInfo.unifiedCommercialRegNo} /></FormLabel>
                  <FormControl><Input placeholder="18-digit identifier" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="companyType" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">Company Type <InfoTooltip info={formFieldsInfo.companyType} /></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select company type" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="صناعي">صناعي</SelectItem>
                      <SelectItem value="خدمي">خدمي</SelectItem>
                      <SelectItem value="مقاول">مقاول</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="sector" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">Sector <InfoTooltip info={formFieldsInfo.sector} /></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} onOpenChange={(open) => !open && handleFetchSuggestions()}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select sector" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="عام">عام</SelectItem>
                      <SelectItem value="خاص">خاص</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="companySize" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">Company Size <InfoTooltip info={formFieldsInfo.companySize} /></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select company size" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="صغير">صغير</SelectItem>
                      <SelectItem value="متوسط">متوسط</SelectItem>
                      <SelectItem value="كبير">كبير</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="isicCodeL4" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">ISIC Code L4 <InfoTooltip info={formFieldsInfo.isicCodeL4} /></FormLabel>
                  <FormControl><Input placeholder="e.g., 3510" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
               <FormField name="exportsProducts" control={form.control} render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <FormLabel className="text-base flex items-center gap-2">Exports Products? <InfoTooltip info={formFieldsInfo.exportsProducts} /></FormLabel>
                    </div>
                    <FormControl>
                        <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        />
                    </FormControl>
                </FormItem>
              )} />
              {exportsProducts && (
                <FormField name="transportsToEu" control={form.control} render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                          <FormLabel className="text-base flex items-center gap-2">Transports to EU? <InfoTooltip info={formFieldsInfo.transportsToEu} /></FormLabel>
                      </div>
                      <FormControl>
                          <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          />
                      </FormControl>
                  </FormItem>
                )} />
              )}
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl font-semibold">Financing Details</AccordionTrigger>
            <AccordionContent className="grid md:grid-cols-2 gap-6 pt-4">
              <FormField name="totalFinancingAmount" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">Total Financing Amount (EGP) <InfoTooltip info={formFieldsInfo.totalFinancingAmount} /></FormLabel>
                  <FormControl><Input type="number" placeholder="e.g., 500000" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="amountUsed" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">Amount Used (EGP) <InfoTooltip info={formFieldsInfo.amountUsed} /></FormLabel>
                  <FormControl><Input type="number" placeholder="e.g., 250000" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="currency" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">Currency <InfoTooltip info={formFieldsInfo.currency} /></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select currency" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="جنيه مصري">جنيه مصري</SelectItem>
                      <SelectItem value="معادل أجنبي">معادل أجنبي</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
               <FormField name="typeOfFacility" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">Type of Facility <InfoTooltip info={formFieldsInfo.typeOfFacility} /></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select facility type" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="قصير الأجل">قصير الأجل</SelectItem>
                      <SelectItem value="متوسط الأجل">متوسط الأجل</SelectItem>
                      <SelectItem value="طويل الأجل">طويل الأجل</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
               <FormField name="facilityClassification" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">Facility Classification <InfoTooltip info={formFieldsInfo.facilityClassification} /></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select classification" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="عامل">عامل</SelectItem>
                      <SelectItem value="غير عامل">غير عامل</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
               <FormField name="usageType" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">Usage Type <InfoTooltip info={formFieldsInfo.usageType} /></FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select usage type" /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="تسهيل جديد">تسهيل جديد</SelectItem>
                      <SelectItem value="مستخدم حالي">مستخدم حالي</SelectItem>
                      <SelectItem value="حالي لم يستخدم بعد">حالي لم يستخدم بعد</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
               <FormField name="dateOfCreditApproval" control={form.control} render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-center gap-2 mb-1">Date of Credit Approval <InfoTooltip info={formFieldsInfo.dateOfCreditApproval} /></FormLabel>
                   <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="fundedUnderInitiative" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">Funded under Initiative <InfoTooltip info={formFieldsInfo.fundedUnderInitiative} /></FormLabel>
                  <FormControl><Input placeholder="e.g., GEFF, EPAP, etc." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="environmentalConsultantUsed" control={form.control} render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 col-span-1 md:col-span-2">
                    <div className="space-y-0.5">
                        <FormLabel className="text-base flex items-center gap-2">Environmental Consultant Used? <InfoTooltip info={formFieldsInfo.environmentalConsultantUsed} /></FormLabel>
                    </div>
                    <FormControl>
                        <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        />
                    </FormControl>
                </FormItem>
              )} />
            </AccordionContent>
          </AccordionItem>

          <FormField
            control={form.control}
            name="isSustainabilityProject"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base flex items-center gap-2">
                    Is this a Sustainability Project?
                    <InfoTooltip info={formFieldsInfo.isSustainabilityProject} />
                  </FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {isSustainabilityProject && (
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-xl font-semibold">Sustainability Details</AccordionTrigger>
              <AccordionContent className="grid md:grid-cols-2 gap-6 pt-4">
                <FormField name="environmentalSocialClassification" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">Environmental/Social Classification <InfoTooltip info={formFieldsInfo.environmentalSocialClassification} /></FormLabel>
                    <Select onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue("sustainabilityAxis", ""); // Reset axis on change
                    }} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select classification" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="بيئي">بيئي</SelectItem>
                        <SelectItem value="اجتماعي">اجتماعي</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="sustainabilityAxis" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">Sustainability Axis <InfoTooltip info={formFieldsInfo.sustainabilityAxis} /></FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={!envSocialClassification}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select axis" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {sustainabilityAxesOptions.map(axis => (
                          <SelectItem key={axis.value} value={axis.value}>{axis.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="purposeOfFinancing" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">Purpose of Financing <InfoTooltip info={formFieldsInfo.purposeOfFinancing} /></FormLabel>
                    <FormControl><Input placeholder="e.g., Solar panel installation" {...field} onBlur={handleFetchSuggestions} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="classificationMethod" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">Classification Method <InfoTooltip info={formFieldsInfo.classificationMethod} /></FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select method" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="نشاط الشركة">نشاط الشركة</SelectItem>
                        <SelectItem value="نوع المشروع المحدد">نوع المشروع المحدد</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="md:col-span-2">
                  <FormField name="impactIndicators" control={form.control} render={({ field }) => (
                      <FormItem>
                      <FormLabel className="flex items-center gap-2">Impact Indicators <InfoTooltip info={formFieldsInfo.impactIndicators} /></FormLabel>
                      <FormControl><Textarea placeholder="Describe the expected impact..." {...field} /></FormControl>
                      <FormMessage />
                      </FormItem>
                  )} />
                  {(isLoadingSuggestions || suggestions.length > 0) && (
                      <Alert className="mt-4">
                          <Lightbulb className="h-4 w-4" />
                          <AlertTitle>Suggestion</AlertTitle>
                          <AlertDescription>
                          {isLoadingSuggestions ? (
                              <div className="flex items-center">
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Generating suggestions...
                              </div>
                          ) : (
                              <>
                              Based on the project details, you could also consider these indicators:
                              <ul className="list-disc pl-5 mt-2">
                                  {suggestions.map((s, i) => <li key={i}>{s}</li>)}
                              </ul>
                              </>
                          )}
                          </AlertDescription>
                      </Alert>
                  )}
                </div>
                <FormField name="supportingDocuments" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">Supporting Documents <InfoTooltip info={formFieldsInfo.supportingDocuments} /></FormLabel>
                    <FormControl><Input type="file" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </AccordionContent>
            </AccordionItem>
           )}
        </Accordion>
        <div className="flex justify-end gap-4">
          <Button type="button" variant="destructive" onClick={onClearDraft}>Clear Draft</Button>
          <Button type="button" variant="outline" onClick={onSaveDraft}>Save Draft</Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
             {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
