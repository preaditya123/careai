
import { useState } from "react";
import Header from "@/components/Header";
import { FileText, Upload, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

interface AnalysisResult {
  summary: string;
  findings: {
    text: string;
    type: "positive" | "negative" | "neutral";
  }[];
  recommendations: string[];
}

const ReportAnalysisPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleAnalyze = () => {
    if (!file) return;
    
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
                  </p>
                  
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                          {file ? (
                            <div className="space-y-1">
                              <span className="text-sm font-medium">{file.name}</span>
                              <p className="text-xs text-muted-foreground">
                                {(file.size / 1024).toFixed(0)} KB
                              </p>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={(e) => {
                                  e.preventDefault();
                                  setFile(null);
                                }}
                              >
                                Remove
                              </Button>
                            </div>
                          ) : (
                            <>
                              <span className="text-sm font-medium">Upload File</span>
                              <span className="text-xs text-muted-foreground mt-1">PDF or Image</span>
                            </>
                          )}
                        </div>
                        <input 
                          id="file-upload" 
                          type="file" 
                          accept="image/*,.pdf" 
                          className="hidden" 
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Button variant="outline" className="justify-start" size="sm">
                        <FileText className="mr-2 h-4 w-4 text-report" />
                        <span>Upload PDF</span>
                      </Button>
                      <Button variant="outline" className="justify-start" size="sm">
                        <Upload className="mr-2 h-4 w-4 text-journal" />
                        <span>Upload Image</span>
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleAnalyze} 
                    disabled={!file || isAnalyzing}
                    className="w-full mt-4"
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze Report"}
                  </Button>
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
