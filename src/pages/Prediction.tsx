
import { useState } from "react";
import Header from "@/components/Header";
import { Stethoscope, Activity, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

interface FormData {
  age: number;
  gender: "male" | "female" | "other";
  bmi: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  bloodSugar: number;
  cholesterol: number;
  smoker: boolean;
  familyHistory: boolean;
}

interface PredictionResult {
  heartDisease: {
    risk: number;
    factors: string[];
  };
  diabetes: {
    risk: number;
    factors: string[];
  };
  hypertension: {
    risk: number;
    factors: string[];
  };
}

const initialFormData: FormData = {
  age: 45,
  gender: "male",
  bmi: 24.5,
  bloodPressure: {
    systolic: 120,
    diastolic: 80,
  },
  bloodSugar: 90,
  cholesterol: 180,
  smoker: false,
  familyHistory: false,
};

const PredictionPage = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isPredicting, setIsPredicting] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSliderChange = (field: keyof FormData, value: number[]) => {
    updateFormData(field, value[0]);
  };

  const handlePrediction = () => {
    setIsPredicting(true);
    
    // Simulate prediction calculation
    setTimeout(() => {
      // Generate risk factors based on form data
      const factors: string[] = [];
      
      if (formData.age > 50) factors.push("Age above 50");
      if (formData.bmi > 25) factors.push("BMI above 25");
      if (formData.bloodPressure.systolic > 130) factors.push("High systolic blood pressure");
      if (formData.bloodPressure.diastolic > 85) factors.push("High diastolic blood pressure");
      if (formData.bloodSugar > 100) factors.push("Elevated blood sugar");
      if (formData.cholesterol > 200) factors.push("High cholesterol");
      if (formData.smoker) factors.push("Active smoker");
      if (formData.familyHistory) factors.push("Family history of conditions");
      
      // Calculate mock risk scores
      const heartRisk = Math.min(
        80, 
        20 + 
          (formData.age > 50 ? 10 : 0) + 
          (formData.bmi > 25 ? 15 : 0) + 
          (formData.bloodPressure.systolic > 130 ? 20 : 0) + 
          (formData.cholesterol > 200 ? 15 : 0) + 
          (formData.smoker ? 20 : 0) + 
          (formData.familyHistory ? 10 : 0)
      );
      
      const diabetesRisk = Math.min(
        75,
        15 + 
          (formData.bmi > 25 ? 20 : 0) + 
          (formData.bloodSugar > 100 ? 25 : 0) + 
          (formData.age > 45 ? 10 : 0) + 
          (formData.familyHistory ? 15 : 0)
      );
      
      const hypertensionRisk = Math.min(
        85,
        10 + 
          (formData.bloodPressure.systolic > 130 ? 30 : 0) + 
          (formData.bloodPressure.diastolic > 85 ? 20 : 0) + 
          (formData.age > 50 ? 10 : 0) + 
          (formData.bmi > 25 ? 15 : 0) + 
          (formData.smoker ? 10 : 0)
      );
      
      setResult({
        heartDisease: {
          risk: heartRisk,
          factors: factors.filter(f => 
            f.includes("systolic") || 
            f.includes("cholesterol") || 
            f.includes("smoker") || 
            f.includes("family")
          ),
        },
        diabetes: {
          risk: diabetesRisk,
          factors: factors.filter(f => 
            f.includes("BMI") || 
            f.includes("blood sugar") || 
            f.includes("Age") || 
            f.includes("family")
          ),
        },
        hypertension: {
          risk: hypertensionRisk,
          factors: factors.filter(f => 
            f.includes("systolic") || 
            f.includes("diastolic") || 
            f.includes("Age") || 
            f.includes("BMI") || 
            f.includes("smoker")
          ),
        },
      });
      
      setIsPredicting(false);
    }, 2000);
  };

  const renderStepOne = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <div className="flex items-center space-x-4">
              <Slider
                id="age"
                min={18}
                max={100}
                step={1}
                value={[formData.age]}
                onValueChange={(value) => handleSliderChange("age", value)}
                className="flex-1"
              />
              <span className="w-12 text-center">{formData.age}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Gender</Label>
            <RadioGroup
              value={formData.gender}
              onValueChange={(value) => 
                updateFormData("gender", value as "male" | "female" | "other")
              }
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bmi">BMI</Label>
            <div className="flex items-center space-x-4">
              <Slider
                id="bmi"
                min={15}
                max={45}
                step={0.1}
                value={[formData.bmi]}
                onValueChange={(value) => handleSliderChange("bmi", value)}
                className="flex-1"
              />
              <span className="w-12 text-center">{formData.bmi.toFixed(1)}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label>Blood Pressure (mmHg)</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Label htmlFor="systolic" className="text-xs">Systolic</Label>
                <Input
                  id="systolic"
                  type="number"
                  value={formData.bloodPressure.systolic}
                  onChange={(e) => 
                    setFormData((prev) => ({
                      ...prev,
                      bloodPressure: {
                        ...prev.bloodPressure,
                        systolic: parseInt(e.target.value) || 0,
                      },
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="diastolic" className="text-xs">Diastolic</Label>
                <Input
                  id="diastolic"
                  type="number"
                  value={formData.bloodPressure.diastolic}
                  onChange={(e) => 
                    setFormData((prev) => ({
                      ...prev,
                      bloodPressure: {
                        ...prev.bloodPressure,
                        diastolic: parseInt(e.target.value) || 0,
                      },
                    }))
                  }
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="smoker">Do you smoke?</Label>
            <RadioGroup
              value={formData.smoker ? "yes" : "no"}
              onValueChange={(value) => 
                updateFormData("smoker", value === "yes")
              }
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="smoker-yes" />
                <Label htmlFor="smoker-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="smoker-no" />
                <Label htmlFor="smoker-no">No</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="family-history">Family history of chronic conditions?</Label>
            <RadioGroup
              value={formData.familyHistory ? "yes" : "no"}
              onValueChange={(value) => 
                updateFormData("familyHistory", value === "yes")
              }
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="history-yes" />
                <Label htmlFor="history-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="history-no" />
                <Label htmlFor="history-no">No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <Button onClick={() => setCurrentStep(2)}>
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </>
  );

  const renderStepTwo = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bloodSugar">Fasting Blood Sugar (mg/dL)</Label>
            <div className="flex items-center space-x-4">
              <Slider
                id="bloodSugar"
                min={70}
                max={200}
                step={1}
                value={[formData.bloodSugar]}
                onValueChange={(value) => handleSliderChange("bloodSugar", value)}
                className="flex-1"
              />
              <span className="w-12 text-center">{formData.bloodSugar}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cholesterol">Total Cholesterol (mg/dL)</Label>
            <div className="flex items-center space-x-4">
              <Slider
                id="cholesterol"
                min={100}
                max={300}
                step={1}
                value={[formData.cholesterol]}
                onValueChange={(value) => handleSliderChange("cholesterol", value)}
                className="flex-1"
              />
              <span className="w-12 text-center">{formData.cholesterol}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center">
          <div className="text-center p-4 border border-border/50 rounded-lg bg-card/50">
            <Activity className="h-16 w-16 text-prediction mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Ready for Prediction?</h3>
            <p className="text-sm text-muted-foreground">
              Our AI model will analyze your health metrics and provide risk assessments for common conditions.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => setCurrentStep(1)}>
          Back
        </Button>
        <Button onClick={handlePrediction} disabled={isPredicting}>
          {isPredicting ? "Analyzing..." : "Get Predictions"}
        </Button>
      </div>
    </>
  );

  const renderRiskCard = (title: string, risk: number, factors: string[]) => {
    let riskLevel: string;
    let riskColor: string;
    
    if (risk < 30) {
      riskLevel = "Low Risk";
      riskColor = "bg-green-500";
    } else if (risk < 60) {
      riskLevel = "Moderate Risk";
      riskColor = "bg-yellow-500";
    } else {
      riskLevel = "High Risk";
      riskColor = "bg-red-500";
    }
    
    return (
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Risk Level: {riskLevel}</span>
              <span>{risk}%</span>
            </div>
            <Progress value={risk} className={riskColor} />
          </div>
          
          {factors.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Contributing Factors:</p>
              <ul className="text-sm space-y-1">
                {factors.map((factor, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderResults = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {result && (
          <>
            {renderRiskCard(
              "Heart Disease Risk",
              result.heartDisease.risk,
              result.heartDisease.factors
            )}
            {renderRiskCard(
              "Type 2 Diabetes Risk",
              result.diabetes.risk,
              result.diabetes.factors
            )}
            {renderRiskCard(
              "Hypertension Risk",
              result.hypertension.risk,
              result.hypertension.factors
            )}
          </>
        )}
      </div>
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => {
          setCurrentStep(1);
          setResult(null);
        }}>
          Start Over
        </Button>
        <Button onClick={() => {
          setCurrentStep(2);
          setResult(null);
        }}>
          Adjust Parameters
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="page-container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Stethoscope className="text-prediction h-8 w-8" />
            <h1 className="page-header mb-0">Health Prediction</h1>
          </div>
          
          {!result && (
            <div className="flex justify-center mb-8">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep === 1 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                }`}>
                  1
                </div>
                <div className={`w-16 h-1 ${
                  currentStep === 2 ? "bg-primary" : "bg-muted"
                }`}></div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep === 2 ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                }`}>
                  2
                </div>
                <div className={`w-16 h-1 ${
                  result ? "bg-primary" : "bg-muted"
                }`}></div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  result ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                }`}>
                  3
                </div>
              </div>
            </div>
          )}
          
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>
                {!result 
                  ? currentStep === 1 
                    ? "Basic Health Information" 
                    : "Additional Health Metrics"
                  : "Your Health Risk Assessment"
                }
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isPredicting ? (
                <div className="py-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Analyzing your health data...</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Our AI model is processing your information to generate personalized predictions.
                  </p>
                </div>
              ) : (
                <>
                  {!result && currentStep === 1 && renderStepOne()}
                  {!result && currentStep === 2 && renderStepTwo()}
                  {result && renderResults()}
                </>
              )}
            </CardContent>
          </Card>
          
          <p className="text-xs text-center text-muted-foreground mt-4">
            Disclaimer: This tool provides estimates based on statistical models and is for informational purposes only. 
            It is not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;
