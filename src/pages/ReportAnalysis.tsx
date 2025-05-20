
import { useState, useRef } from "react";
import Header from "@/components/Header";
import { FileText, Upload, AlertTriangle, CheckCircle, FileImage, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

interface AnalysisResult {
  summary: string;
  findings: {
    text: string;
    type: "positive" | "negative" | "neutral";
  }[];
  recommendations: string[];
}

interface FileInfo {
  name: string;
  type: string;
  size: number;
}

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB in bytes
const MAX_FILES = 5;

const ReportAnalysisPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileInfo[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const validateFileUpload = (file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return `File size exceeds the maximum limit of 100MB`;
    }
    
    if (uploadedFiles.length >= MAX_FILES) {
      return `You can only upload up to ${MAX_FILES} files`;
    }
    
    const fileType = file.type;
    if (!fileType.includes('pdf') && !fileType.includes('image')) {
      return `Only PDF and image files are supported`;
    }
    
    return null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    
    // Validate file
    const validationError = validateFileUpload(file);
    if (validationError) {
      toast({
        title: "Upload Error",
        description: validationError,
        variant: "destructive"
      });
      return;
    }
    
    const fileInfo: FileInfo = {
      name: file.name,
      type: file.type,
      size: file.size,
    };
    
    // Add file to uploaded files list
    setUploadedFiles(prev => [...prev, fileInfo]);
    
    // Reset result if a new file is uploaded
    setResult(null);
    
    // Reset the input
    e.target.value = '';
    
    toast({
      title: "File uploaded",
      description: `${file.name} has been uploaded successfully.`,
    });
  };
  
  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
    else return (bytes / 1073741824).toFixed(1) + ' GB';
  };

  const handleAnalyze = () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No files to analyze",
        description: "Please upload at least one file first.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      const mockResult: AnalysisResult = {
        summary: "The report indicates normal blood cell count with slightly elevated cholesterol levels (215 mg/dL). Liver and kidney function tests are within normal range.",
        findings: [
          {
            text: "Cholesterol levels slightly elevated at 215 mg/dL (normal: <200 mg/dL)",
            type: "negative",
          },
          {
            text: "Blood pressure is 120/80 mmHg, which is within normal range",
            type: "positive",
          },
          {
            text: "Blood glucose level is 95 mg/dL (fasting), which is within normal range",
            type: "positive",
          },
          {
            text: "HDL Cholesterol is 55 mg/dL, which is optimal",
            type: "positive",
          },
          {
            text: "LDL Cholesterol is 140 mg/dL, which is borderline high",
            type: "negative",
          },
        ],
        recommendations: [
          "Consider dietary changes to reduce cholesterol levels",
          "Regular exercise of at least 30 minutes daily is recommended",
          "Follow-up cholesterol test in 3 months",
          "No immediate medication needed, but lifestyle modifications advised",
        ],
      };
      
      setResult(mockResult);
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete",
        description: "Your medical report has been analyzed successfully.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background hidden lg:block">
      <Header />
      <div className="page-container py-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <FileText className="text-report h-8 w-8" />
            <h1 className="page-header mb-0">Report Analysis</h1>
          </div>
          
          <div className="grid grid-cols-12 gap-6">
            {/* Upload Panel */}
            <div className="col-span-3">
              <Card className="border-border/50 h-full">
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-4">Upload Documents</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload medical reports, test results, or images for instant analysis.
                    <span className="block mt-1 text-xs">
                      Max: 100MB per file, up to 5 files
                    </span>
                  </p>
                  
                  <div className="space-y-4">
                    <div 
                      className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                      onClick={triggerFileUpload}
                    >
                      <label htmlFor="file-upload-report" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          <span className="text-sm font-medium">Upload File</span>
                          <span className="text-xs text-muted-foreground mt-1">PDF or Image</span>
                        </div>
                        <input 
                          ref={fileInputRef}
                          id="file-upload-report" 
                          type="file" 
                          accept="image/*,.pdf" 
                          className="hidden" 
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    
                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Uploaded Files ({uploadedFiles.length}/{MAX_FILES})</h4>
                        <div className="max-h-48 overflow-y-auto space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md text-xs">
                              <div className="flex items-center gap-2 overflow-hidden">
                                {file.type.includes('pdf') ? 
                                  <FileText className="h-4 w-4 text-report flex-shrink-0" /> : 
                                  <FileImage className="h-4 w-4 text-journal flex-shrink-0" />
                                }
                                <span className="truncate">{file.name}</span>
                                <span className="text-muted-foreground flex-shrink-0">
                                  ({formatFileSize(file.size)})
                                </span>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-5 w-5 p-0" 
                                onClick={() => handleRemoveFile(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      onClick={handleAnalyze} 
                      disabled={uploadedFiles.length === 0 || isAnalyzing}
                      className="w-full"
                    >
                      {isAnalyzing ? "Analyzing..." : "Analyze Report"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Analysis Results */}
            <div className="col-span-9">
              <Card className="border-border/50 h-full">
                <CardContent className="p-4">
                  {!result && !isAnalyzing && (
                    <div className="flex flex-col items-center justify-center h-full py-16">
                      <FileText className="h-16 w-16 text-muted-foreground/30 mb-4" />
                      <h3 className="text-xl font-medium mb-2">No Report Analyzed</h3>
                      <p className="text-muted-foreground text-center max-w-md">
                        Upload a medical report document or image and click "Analyze Report" to get detailed insights and recommendations.
                      </p>
                    </div>
                  )}
                  
                  {isAnalyzing && (
                    <div className="flex flex-col items-center justify-center h-full py-16">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                      <p className="text-muted-foreground">Analyzing your medical report...</p>
                    </div>
                  )}
                  
                  {result && (
                    <Tabs defaultValue="summary" className="w-full">
                      <TabsList className="grid grid-cols-3 mb-4">
                        <TabsTrigger value="summary">Summary</TabsTrigger>
                        <TabsTrigger value="findings">Findings</TabsTrigger>
                        <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                      </TabsList>
                      <TabsContent value="summary" className="mt-0">
                        <Card>
                          <CardContent className="p-4">
                            <p>{result.summary}</p>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="findings" className="mt-0">
                        <Card>
                          <CardContent className="p-4 space-y-3">
                            {result.findings.map((finding, index) => (
                              <div 
                                key={index}
                                className="flex items-start gap-2"
                              >
                                {finding.type === "positive" ? (
                                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                                ) : finding.type === "negative" ? (
                                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                                ) : null}
                                <p>{finding.text}</p>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      </TabsContent>
                      <TabsContent value="recommendations" className="mt-0">
                        <Card>
                          <CardContent className="p-4">
                            <ul className="list-disc pl-5 space-y-2">
                              {result.recommendations.map((rec, index) => (
                                <li key={index}>{rec}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportAnalysisPage;
