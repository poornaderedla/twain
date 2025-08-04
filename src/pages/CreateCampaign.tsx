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
  Mail,
  RotateCcw
} from 'lucide-react';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingLookalikes, setIsGeneratingLookalikes] = useState(false);
  const [lookalikes, setLookalikes] = useState([]);
  const [campaignData, setCampaignData] = useState({
    name: '',
    description: '',
    leads: [],
    lookalikes: [],
    template: ''
  });

  const steps = [
    { id: 1, title: 'Campaign Setup', icon: Target },
    { id: 2, title: 'Import Leads', icon: Users },
    { id: 3, title: 'Sequence Builder', icon: Mail },
    { id: 4, title: 'Review & Launch', icon: CheckCircle }
  ];

  const nextStep = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        // Launch campaign and go back to dashboard
        navigate('/dashboard');
      }
      setIsLoading(false);
    }, 500);
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
      setIsLoading(true);
      // Simulate file processing
      setTimeout(() => {
        const newLeads = [
          { name: 'John Smith', email: 'john@example.com', company: 'TechCorp', title: 'CTO', industry: 'Technology' },
          { name: 'Sarah Johnson', email: 'sarah@startup.co', company: 'StartupCo', title: 'Head of Sales', industry: 'SaaS' },
          { name: 'Mike Chen', email: 'mike@scale.io', company: 'ScaleIO', title: 'VP Marketing', industry: 'Technology' },
          { name: 'Emma Wilson', email: 'emma@growth.com', company: 'GrowthCorp', title: 'Chief Revenue Officer', industry: 'Marketing' },
          { name: 'David Rodriguez', email: 'david@fintech.ai', company: 'FinTech AI', title: 'Director of Sales', industry: 'FinTech' }
        ];
        setCampaignData(prev => ({
          ...prev,
          leads: newLeads
        }));
        setIsLoading(false);
      }, 2000);
    }
  };

  const generateLookalikes = () => {
    setIsGeneratingLookalikes(true);
    // Simulate AI lookalike generation
    setTimeout(() => {
      const generatedLookalikes = [
        { name: 'Alex Thompson', email: 'alex@techstart.com', company: 'TechStart', title: 'CTO', industry: 'Technology', score: 95 },
        { name: 'Lisa Park', email: 'lisa@salesforce.co', company: 'SalesForce Co', title: 'Head of Sales', industry: 'SaaS', score: 92 },
        { name: 'James Kim', email: 'james@marketpro.io', company: 'MarketPro', title: 'VP Marketing', industry: 'Technology', score: 89 },
        { name: 'Rachel Green', email: 'rachel@revops.com', company: 'RevOps Inc', title: 'Chief Revenue Officer', industry: 'Marketing', score: 87 },
        { name: 'Tom Anderson', email: 'tom@fintech.co', company: 'FinTech Co', title: 'Director of Sales', industry: 'FinTech', score: 85 }
      ];
      setLookalikes(generatedLookalikes);
      setIsGeneratingLookalikes(false);
    }, 3000);
  };

  const addLookalikesToCampaign = (selectedLookalikes: any[]) => {
    setCampaignData(prev => ({
      ...prev,
      lookalikes: selectedLookalikes
    }));
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
                <label className="text-sm font-medium mb-2 block">Campaign Name *</label>
                <Input 
                  placeholder="Enter campaign name..."
                  value={campaignData.name}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, name: e.target.value }))}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description (Optional)</label>
                <Textarea 
                  placeholder="Describe your campaign objectives..."
                  value={campaignData.description}
                  onChange={(e) => setCampaignData(prev => ({ ...prev, description: e.target.value }))}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
              
              <div className="bg-gradient-primary/5 p-4 rounded-lg border border-primary/20">
                <h4 className="font-medium text-primary mb-2">💡 Pro Tip</h4>
                <p className="text-sm text-muted-foreground">
                  Clear campaign names help you track performance. Include the target audience or goal.
                </p>
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
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
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
                  disabled={isLoading}
                />
                <label htmlFor="lead-upload">
                  <Button 
                    className="cursor-pointer transition-all duration-200 hover:shadow-lg" 
                    disabled={isLoading}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {isLoading ? 'Processing...' : 'Choose File'}
                  </Button>
                </label>
              </div>
              
              {campaignData.leads.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span>{campaignData.leads.length} leads imported</span>
                    </h4>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={generateLookalikes}
                      disabled={isGeneratingLookalikes}
                      className="transition-all duration-200 hover:bg-primary/10 hover:border-primary/50"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      {isGeneratingLookalikes ? 'Generating...' : 'Generate Lookalikes'}
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {campaignData.leads.slice(0, 4).map((lead, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg hover:bg-accent/70 transition-colors">
                        <div>
                          <p className="font-medium">{lead.name}</p>
                          <p className="text-sm text-muted-foreground">{lead.title} at {lead.company}</p>
                          <p className="text-xs text-muted-foreground">{lead.email}</p>
                        </div>
                        <Badge variant="outline" className="bg-success/10 text-success">Verified</Badge>
                      </div>
                    ))}
                    {campaignData.leads.length > 4 && (
                      <div className="col-span-full text-center p-3 text-sm text-muted-foreground">
                        And {campaignData.leads.length - 4} more leads...
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Lookalike Results */}
              {lookalikes.length > 0 && (
                <div className="space-y-4">
                  <div className="bg-gradient-primary/5 p-4 rounded-lg border border-primary/20">
                    <h4 className="font-medium text-primary mb-2 flex items-center space-x-2">
                      <Sparkles className="h-4 w-4" />
                      <span>AI Generated Lookalikes</span>
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Based on your uploaded leads, we found {lookalikes.length} similar prospects with high conversion potential.
                    </p>
                    
                    <div className="space-y-3">
                      {lookalikes.map((lookalike, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border hover:shadow-md transition-all">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <p className="font-medium">{lookalike.name}</p>
                              <Badge variant="outline" className="bg-primary/10 text-primary">
                                {lookalike.score}% match
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{lookalike.title} at {lookalike.company}</p>
                            <p className="text-xs text-muted-foreground">{lookalike.industry} • {lookalike.email}</p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => addLookalikesToCampaign([lookalike])}
                            className="transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
                          >
                            Add
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <Button 
                        variant="outline"
                        onClick={() => addLookalikesToCampaign(lookalikes)}
                        className="flex-1 transition-all duration-200"
                      >
                        Add All Lookalikes
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setLookalikes([])}
                        className="transition-all duration-200"
                      >
                        Clear
                      </Button>
                    </div>
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
                  <div className="bg-card p-4 rounded-lg border-l-4 border-l-primary hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">Step 1 - Initial Contact</span>
                      <div className="flex space-x-2">
                        <Badge variant="outline" className="text-xs">Informal</Badge>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-primary/10">
                          <RotateCcw className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
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
                  
                  <div className="bg-card p-4 rounded-lg border-l-4 border-l-warning hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">Step 2 - Value Proposition</span>
                      <div className="flex space-x-2">
                        <Badge variant="outline" className="text-xs">Informal</Badge>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-primary/10">
                          <RotateCcw className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
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
                  
                  <div className="bg-card p-4 rounded-lg border-l-4 border-l-success hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">Step 3 - Social Proof</span>
                      <div className="flex space-x-2">
                        <Badge variant="outline" className="text-xs">Informal</Badge>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-primary/10">
                          <RotateCcw className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
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
                <div className="bg-accent/50 p-4 rounded-lg hover:bg-accent/70 transition-colors">
                  <h4 className="font-medium mb-2">Campaign Details</h4>
                  <p className="text-sm text-muted-foreground">Name: {campaignData.name || 'Untitled Campaign'}</p>
                  <p className="text-sm text-muted-foreground">Original Leads: {campaignData.leads.length}</p>
                  <p className="text-sm text-muted-foreground">Lookalikes: {campaignData.lookalikes.length}</p>
                  <p className="text-sm text-muted-foreground">Total Contacts: {campaignData.leads.length + campaignData.lookalikes.length}</p>
                  <p className="text-sm text-muted-foreground">Sequence: 3 steps</p>
                </div>
                
                <div className="bg-accent/50 p-4 rounded-lg hover:bg-accent/70 transition-colors">
                  <h4 className="font-medium mb-2">Expected Results</h4>
                  <p className="text-sm text-muted-foreground">Open Rate: ~65%</p>
                  <p className="text-sm text-muted-foreground">Response Rate: ~15%</p>
                  <p className="text-sm text-muted-foreground">Est. Meetings: {Math.ceil((campaignData.leads.length + campaignData.lookalikes.length) * 0.15 * 0.3)}</p>
                </div>
              </div>
              
              <div className="bg-gradient-primary/10 p-4 rounded-lg border border-primary/20">
                <h4 className="font-medium mb-2 text-primary">Ready to Launch!</h4>
                <p className="text-sm text-muted-foreground">
                  Your personalized sequence is ready. We'll start sending emails and track responses automatically.
                </p>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" className="flex-1 transition-all duration-200 hover:bg-primary/10">
                    Customize Sequence
                  </Button>
                  <Button 
                    variant="outline" 
                    className="transition-all duration-200 hover:bg-primary/10"
                  >
                    <Sparkles className="h-4 w-4 mr-1" />
                    Regenerate
                  </Button>
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
            className="flex items-center space-x-2 transition-all duration-200 hover:shadow-md"
            disabled={isLoading}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{currentStep === 1 ? 'Back to Dashboard' : 'Previous'}</span>
          </Button>
          
          <Button 
            onClick={nextStep}
            disabled={(currentStep === 1 && !campaignData.name.trim()) || 
                     (currentStep === 2 && campaignData.leads.length === 0) || 
                     isLoading}
            className="flex items-center space-x-2 transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
          >
            {isLoading && <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />}
            <span>{currentStep === 4 ? 'Launch Campaign' : 'Next'}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;