import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/ui/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  RotateCcw,
  UserPlus,
  Loader2,
  Plus,
  X
} from 'lucide-react';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingLookalikes, setIsGeneratingLookalikes] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lookalikes, setLookalikes] = useState([]);
  const [lookalikeTab, setLookalikeTab] = useState('profiles');
  const [linkedinUrls, setLinkedinUrls] = useState(['']);
  const [campaignData, setCampaignData] = useState({
    name: '',
    description: '',
    leads: [],
    lookalikes: [],
    template: ''
  });
  
  const [showManualForm, setShowManualForm] = useState(false);
  const [manualLead, setManualLead] = useState({
    name: '',
    email: '',
    company: '',
    title: '',
    industry: ''
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsProcessing(true);
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
        setIsProcessing(false);
      }, 2000);
    }
  };

  const addLinkedInUrl = () => {
    setLinkedinUrls([...linkedinUrls, '']);
  };

  const removeLinkedInUrl = (index: number) => {
    setLinkedinUrls(linkedinUrls.filter((_, i) => i !== index));
  };

  const updateLinkedInUrl = (index: number, url: string) => {
    const newUrls = [...linkedinUrls];
    newUrls[index] = url;
    setLinkedinUrls(newUrls);
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
      // Auto-add lookalikes to campaign data so Next button becomes enabled
      setCampaignData(prev => ({
        ...prev,
        lookalikes: generatedLookalikes
      }));
      setIsGeneratingLookalikes(false);
    }, 3000);
  };

  const addLookalikesToCampaign = (selectedLookalikes: any[]) => {
    setCampaignData(prev => ({
      ...prev,
      lookalikes: selectedLookalikes
    }));
  };

  const addManualLead = () => {
    if (manualLead.name && manualLead.email) {
      setCampaignData(prev => ({
        ...prev,
        leads: [...prev.leads, { ...manualLead }]
      }));
      setManualLead({
        name: '',
        email: '',
        company: '',
        title: '',
        industry: ''
      });
      setShowManualForm(false);
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
          <Card className="max-w-6xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Import Leads</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Lookalike */}
                <div className="bg-card border border-border rounded-lg p-6 text-center transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                  <div className="bg-primary/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Lookalike</h3>
                  <p className="text-muted-foreground text-sm">We'll find leads</p>
                </div>

                {/* Lead list */}
                <div className="bg-card border border-border rounded-lg p-6 text-center transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                  <div className="bg-success/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-6 h-6 text-success" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Lead list</h3>
                  <p className="text-muted-foreground text-sm mb-4">Upload CSV</p>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label
                    htmlFor="csv-upload"
                    className={`inline-flex items-center px-4 py-2 bg-success text-white rounded-lg cursor-pointer transition-all duration-200 hover:bg-success/90 hover:shadow-md hover:scale-105 active:scale-95 ${
                      isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="animate-spin w-4 h-4 mr-2" />
                        Processing...
                      </>
                    ) : (
                      'Choose File'
                    )}
                  </label>
                </div>

                {/* Add manually */}
                <Dialog open={showManualForm} onOpenChange={setShowManualForm}>
                  <DialogTrigger asChild>
                    <div className="bg-card border border-border rounded-lg p-6 text-center transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                      <div className="bg-warning/20 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <UserPlus className="w-6 h-6 text-warning" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Add manually</h3>
                      <p className="text-muted-foreground text-sm">Enter lead details</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add Lead Manually</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Name *</label>
                        <Input
                          placeholder="Enter full name"
                          value={manualLead.name}
                          onChange={(e) => setManualLead(prev => ({ ...prev, name: e.target.value }))}
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email *</label>
                        <Input
                          type="email"
                          placeholder="Enter email address"
                          value={manualLead.email}
                          onChange={(e) => setManualLead(prev => ({ ...prev, email: e.target.value }))}
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Company</label>
                        <Input
                          placeholder="Enter company name"
                          value={manualLead.company}
                          onChange={(e) => setManualLead(prev => ({ ...prev, company: e.target.value }))}
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Job Title</label>
                        <Input
                          placeholder="Enter job title"
                          value={manualLead.title}
                          onChange={(e) => setManualLead(prev => ({ ...prev, title: e.target.value }))}
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Industry</label>
                        <Input
                          placeholder="Enter industry"
                          value={manualLead.industry}
                          onChange={(e) => setManualLead(prev => ({ ...prev, industry: e.target.value }))}
                          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div className="flex space-x-2 pt-4">
                        <Button
                          variant="outline"
                          onClick={() => setShowManualForm(false)}
                          className="flex-1 transition-all duration-200"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={addManualLead}
                          disabled={!manualLead.name.trim() || !manualLead.email.trim()}
                          className="flex-1 transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Add Lead
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Lookalike Section */}
              <div className="bg-accent/20 border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">How to match leads</h3>
                
                {/* Tabs */}
                <div className="flex space-x-1 bg-background rounded-lg p-1 mb-6">
                  <button
                    onClick={() => setLookalikeTab('profiles')}
                    className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      lookalikeTab === 'profiles'
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    By profiles
                  </button>
                  <button
                    onClick={() => setLookalikeTab('companies')}
                    className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      lookalikeTab === 'companies'
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    By companies
                  </button>
                </div>

                {/* LinkedIn URL Inputs */}
                <div className="space-y-4">
                  {linkedinUrls.map((url, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </div>
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => updateLinkedInUrl(index, e.target.value)}
                          placeholder="linkedin.com/in/..."
                          className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                        />
                      </div>
                      {linkedinUrls.length > 1 && (
                        <button
                          onClick={() => removeLinkedInUrl(index)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-all duration-200 hover:scale-110"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  
                  <button
                    onClick={addLinkedInUrl}
                    className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-all duration-200 hover:scale-105"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add another profile</span>
                  </button>
                </div>

                {/* Preview Leads Button */}
                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={generateLookalikes}
                    disabled={isGeneratingLookalikes || linkedinUrls.every(url => !url.trim())}
                    className="px-8 py-3 bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGeneratingLookalikes ? (
                      <>
                        <Loader2 className="animate-spin w-4 h-4 mr-2" />
                        Finding Lookalikes...
                      </>
                    ) : (
                      'Preview Leads →'
                    )}
                  </Button>
                </div>
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
                      className="transition-all duration-200 hover:bg-primary/10 hover:border-primary/50 hover:scale-105 active:scale-95"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      {isGeneratingLookalikes ? (
                        <>
                          <Loader2 className="animate-spin w-4 h-4 mr-1" />
                          Generating...
                        </>
                      ) : (
                        'Generate Lookalikes'
                      )}
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
                            className="transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:scale-105 active:scale-95"
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
                        className="flex-1 transition-all duration-200 hover:bg-primary/10 hover:border-primary/50 hover:scale-105 active:scale-95"
                      >
                        Add All Lookalikes
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setLookalikes([]);
                          setCampaignData(prev => ({ ...prev, lookalikes: [] }));
                        }}
                        className="transition-all duration-200 hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive hover:scale-105 active:scale-95"
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
            className="flex items-center space-x-2 transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
            disabled={isLoading}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{currentStep === 1 ? 'Back to Dashboard' : 'Previous'}</span>
          </Button>
          
          <Button 
            onClick={nextStep}
            disabled={(currentStep === 1 && !campaignData.name.trim()) || 
                     (currentStep === 2 && campaignData.leads.length === 0 && campaignData.lookalikes.length === 0) || 
                     isLoading}
            className="flex items-center space-x-2 transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
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