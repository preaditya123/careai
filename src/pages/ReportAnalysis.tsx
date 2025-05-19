
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
    <div className="min-h-screen bg-background">
      <Header />
      <div className="page-container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <FileText className="text-report h-8 w-8" />
            <h1 className="page-header mb-0">Report Analysis</h1>
          </div>
          
          <Card className="mb-6 border-border/50">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Upload your medical reports (PDF or images) and get AI-powered analysis and interpretation.
                Our system uses OCR technology to extract and analyze medical data.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border/50">
              <CardContent className="p-6">
                <h2 className="text-xl font-medium mb-4">Upload Report</h2>
                
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center mb-4">
                  {file ? (
                    <div className="space-y-2">
                      <FileText className="mx-auto h-8 w-8 text-primary" />
                      <p className="text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(0)} KB
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setFile(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">
                          Drop your file here or click to upload
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Supports PDF, JPG, PNG (max 10MB)
                        </p>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        id="file-upload"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="file-upload">
                        <Button variant="outline" size="sm" asChild>
                          <span>Select File</span>
                        </Button>
                      </label>
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={handleAnalyze} 
                  disabled={!file || isAnalyzing} 
                  className="w-full"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Report"}
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-border/50">
              <CardContent className="p-6">
                <h2 className="text-xl font-medium mb-4">Analysis Results</h2>
                
                {!result && !isAnalyzing && (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="mx-auto h-12 w-12 mb-4 opacity-30" />
                    <p>Upload and analyze a report to see results</p>
                  </div>
                )}
                
                {isAnalyzing && (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Analyzing your report...</p>
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
  );
};

export default ReportAnalysisPage;
