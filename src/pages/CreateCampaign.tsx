import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/ui/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileText, 
  Users, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Sparkles,
  Target,
  Mail
} from 'lucide-react';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: '',
    description: '',
    leads: [],
    template: ''
  });

  const steps = [
    { id: 1, title: 'Campaign Setup', icon: Target },
    { id: 2, title: 'Import Leads', icon: Users },
    { id: 3, title: 'Sequence Builder', icon: Mail },
    { id: 4, title: 'Review & Launch', icon: CheckCircle }
  ];

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Launch campaign and go back to dashboard
      navigate('/dashboard');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/');
    }
  };

  const handleLeadUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate file processing
      setTimeout(() => {
        setCampaignData(prev => ({
          ...prev,
          leads: [
            { name: 'John Smith', email: 'john@example.com', company: 'TechCorp' },
            { name: 'Sarah Johnson', email: 'sarah@startup.co', company: 'StartupCo' },
            { name: 'Mike Chen', email: 'mike@scale.io', company: 'ScaleIO' }
          ]
        }));
      }, 1000);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" />
                <span>Campaign Setup</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Campaign Name</label>
                <Input 
                  placeholder="Enter campaign name..."
                  value={campaignData.name}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description (Optional)</label>
                <Textarea 
                  placeholder="Describe your campaign objectives..."
                  value={campaignData.description}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Import Leads</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload Lead File</h3>
                <p className="text-muted-foreground mb-4">
                  Upload a CSV file with your leads. Include columns for name, email, company, and title.
                </p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleLeadUpload}
                  className="hidden"
                  id="lead-upload"
                />
                <label htmlFor="lead-upload">
                  <Button className="cursor-pointer">
                    <FileText className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                </label>
              </div>
              
              {campaignData.leads.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>{campaignData.leads.length} leads imported</span>
                  </h4>
                  <div className="space-y-2">
                    {campaignData.leads.slice(0, 3).map((lead, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                        <div>
                          <p className="font-medium">{lead.name}</p>
                          <p className="text-sm text-muted-foreground">{lead.email} • {lead.company}</p>
                        </div>
                        <Badge variant="outline" className="bg-success/10 text-success">Verified</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>AI Sequence Builder</span>
                <Badge className="bg-primary/10 text-primary">
                  <Sparkles className="h-3 w-3 mr-1" />
                  AI Powered
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-secondary p-6 rounded-lg border border-primary/20">
                <h3 className="font-medium mb-3 flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>AI Generated Sequence</span>
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Based on your leads' profiles and industry data, I've generated a personalized 3-step sequence.
                </p>
                
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg border-l-4 border-l-primary">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">Step 1 - Initial Contact</span>
                      <Badge variant="outline" className="text-xs">Informal</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "Hey [First Name], noticed your team at [Company] is scaling [specific challenge]. 
                      We just launched deep research that builds outreach sequences using live social proof..."
                    </p>
                    <div className="flex space-x-2 mt-2">
                      <Badge variant="outline" className="text-xs">18 sec</Badge>
                      <Badge variant="outline" className="text-xs">60 words</Badge>
                    </div>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border-l-4 border-l-warning">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">Step 2 - Value Proposition</span>
                      <Badge variant="outline" className="text-xs">Informal</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "Reaching out because [specific insight about their business]. 
                      Are you already building custom sequences or still relying on templates?"
                    </p>
                    <div className="flex space-x-2 mt-2">
                      <Badge variant="outline" className="text-xs">15 sec</Badge>
                      <Badge variant="outline" className="text-xs">50 words</Badge>
                    </div>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border-l-4 border-l-success">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">Step 3 - Social Proof</span>
                      <Badge variant="outline" className="text-xs">Informal</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "How about we set up a chat with a customer who started using Twain when their 
                      [specific situation]. Let me know and I can introduce you."
                    </p>
                    <div className="flex space-x-2 mt-2">
                      <Badge variant="outline" className="text-xs">11 sec</Badge>
                      <Badge variant="outline" className="text-xs">35 words</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Review & Launch</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-accent/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Campaign Details</h4>
                  <p className="text-sm text-muted-foreground">Name: {campaignData.name || 'Untitled Campaign'}</p>
                  <p className="text-sm text-muted-foreground">Leads: {campaignData.leads.length} contacts</p>
                  <p className="text-sm text-muted-foreground">Sequence: 3 steps</p>
                </div>
                
                <div className="bg-accent/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Expected Results</h4>
                  <p className="text-sm text-muted-foreground">Open Rate: ~65%</p>
                  <p className="text-sm text-muted-foreground">Response Rate: ~15%</p>
                  <p className="text-sm text-muted-foreground">Est. Meetings: 2-3</p>
                </div>
              </div>
              
              <div className="bg-gradient-primary/10 p-4 rounded-lg border border-primary/20">
                <h4 className="font-medium mb-2 text-primary">Ready to Launch!</h4>
                <p className="text-sm text-muted-foreground">
                  Your personalized sequence is ready. We'll start sending emails and track responses automatically.
                </p>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-8">
        {/* Progress Indicator */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    flex items-center space-x-3 p-3 rounded-lg transition-all
                    ${isActive ? 'bg-primary/10 text-primary' : ''}
                    ${isCompleted ? 'text-success' : ''}
                    ${!isActive && !isCompleted ? 'text-muted-foreground' : ''}
                  `}>
                    <div className={`
                      h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${isActive ? 'bg-primary text-primary-foreground' : ''}
                      ${isCompleted ? 'bg-success text-success-foreground' : ''}
                      ${!isActive && !isCompleted ? 'bg-muted text-muted-foreground' : ''}
                    `}>
                      {isCompleted ? <CheckCircle className="h-4 w-4" /> : step.id}
                    </div>
                    <span className="font-medium text-sm">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`
                      w-16 h-0.5 mx-4
                      ${isCompleted ? 'bg-success' : 'bg-border'}
                    `} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="max-w-2xl mx-auto flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{currentStep === 1 ? 'Back to Dashboard' : 'Previous'}</span>
          </Button>
          
          <Button 
            onClick={nextStep}
            disabled={currentStep === 2 && campaignData.leads.length === 0}
            className="flex items-center space-x-2"
          >
            <span>{currentStep === 4 ? 'Launch Campaign' : 'Next'}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;