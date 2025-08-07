import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/ui/navigation';
import { LeadCard } from '@/components/lead/lead-card';
import { SequenceBuilder } from '@/components/sequence/sequence-builder';
import { LeadInsights } from '@/components/lead/lead-insights';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Search, 
  Plus, 
  Download, 
  Filter,
  Sparkles,
  MessageSquare,
  Users,
  TrendingUp
} from 'lucide-react';

const mockLeads = [
  {
    id: '1',
    name: 'Ilija Stojkovski',
    title: 'Chief Revenue Officer (CRO)',
    company: 'HeyReach',
    location: 'San Francisco, CA',
    verified: true,
    companySize: '$5M+ ARR in 22 mo...',
    revenue: '$5M+ ARR',
    industry: 'LinkedIn outreach tool',
    insights: {
      challenge: 'Coordinating teams to meet revenue goals',
      tasks: 'Driving integrated revenue growth strategies',
      tools: 'LinkedIn outreach tool. Achieved rapid growth'
    }
  },
  {
    id: '2',
    name: 'Dimitra Spiliotopoulou',
    title: 'Head of Sales',
    company: 'TechFlow',
    location: 'New York, NY',
    verified: false,
    companySize: '50-200 employees',
    revenue: '$10M+ ARR',
    industry: 'SaaS',
    insights: {
      challenge: 'Scaling sales operations efficiently',
      tasks: 'Building high-performance sales teams',
      tools: 'CRM optimization and sales automation'
    }
  },
  {
    id: '3',
    name: 'Lewis Rhys Davies',
    title: 'Sales Manager',
    company: 'GrowthLabs',
    location: 'London, UK',
    verified: true,
    companySize: '20-50 employees',
    revenue: '$2M+ ARR',
    industry: 'Marketing Technology',
    insights: {
      challenge: 'Improving lead conversion rates',
      tasks: 'Implementing new sales processes',
      tools: 'Pipeline management and forecasting tools'
    }
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedLead, setSelectedLead] = useState(mockLeads[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNavItem, setActiveNavItem] = useState('dashboard');

  const filteredLeads = mockLeads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    if (activeNavItem === 'features') {
      return (
        <div className="min-h-screen bg-background">
          <div className="container py-16">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
                Unbeatable value for money
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <Card className="p-6 border-border hover:border-primary/50 transition-colors">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Deep research</h3>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Curated facts that sharpen your value proposition</li>
                    <li>• Live-verified insights with source links</li>
                    <li>• Copy-ready, drop straight into your messaging</li>
                  </ul>
                </Card>
                
                <Card className="p-6 border-border hover:border-primary/50 transition-colors">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Find lookalikes</h3>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Build new lead lists and expand existing ones</li>
                    <li>• Pinpoint prospects mirroring your top customers</li>
                    <li>• Fill your pipeline faster with qualified leads</li>
                  </ul>
                </Card>
                
                <Card className="p-6 border-border hover:border-primary/50 transition-colors">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Download className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Export anywhere</h3>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Export personalized messages straight to your sequencer</li>
                    <li>• Tailored outreach at scale for every prospect</li>
                    <li>• Seamless hand-off cuts hours of manual work</li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeNavItem === 'pricing') {
      return (
        <div className="min-h-screen bg-muted/30">
          <div className="container py-16">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                Everything in one plan
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <Card className="p-6 border-border">
                  <h3 className="text-xl font-semibold mb-4">One lead = one credit</h3>
                  <p className="text-muted-foreground">Pay once to research a lead; all future sequence changes are free</p>
                </Card>
                
                <Card className="p-6 border-border">
                  <h3 className="text-xl font-semibold mb-4">Credit roll-over</h3>
                  <p className="text-muted-foreground">Unused credits stay valid for 3 months; roll-over caps vary by plan</p>
                </Card>
                
                <Card className="p-6 border-border">
                  <h3 className="text-xl font-semibold mb-4">Invite team</h3>
                  <p className="text-muted-foreground">Add teammates for free—everyone taps into the same shared credit pool</p>
                </Card>
                
                <Card className="p-6 border-border">
                  <h3 className="text-xl font-semibold mb-4">Connect with your stack</h3>
                  <p className="text-muted-foreground">Sync campaigns with your favorite sequencing tools and grab verified lead emails—without ever leaving Twain</p>
                </Card>
              </div>
              
              <div className="mt-12 max-w-md mx-auto">
                <Card className="p-8 border-primary/50 bg-gradient-to-br from-primary/5 to-primary/10">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-foreground mb-2">$185</div>
                    <div className="text-muted-foreground mb-6">$0.185 per lead</div>
                    <Button className="w-full bg-gradient-primary hover:opacity-90 text-lg py-3">
                      Start for Free →
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default dashboard content
    return (
      <>
        {/* Hero Section */}
        <div className="border-b border-border bg-gradient-to-br from-background to-muted/30">
          <div className="container py-16">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
                Outreach with relevant research
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Ditch generic templates—use deep research<br />
                to generate unique sequences for every lead
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 text-lg px-8 py-3 shadow-glow"
                onClick={() => navigate('/create-campaign')}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Create Campaign
              </Button>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="container py-8">
          <div className="grid grid-cols-12 gap-6 h-[calc(100vh-300px)]">
            {/* Leads Sidebar */}
            <div className="col-span-3">
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <span>Leads</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 hover:scale-110 transition-transform"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 hover:scale-105 transition-transform"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Export Leads
                    </Button>
                  </div>
                  
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search leads..." 
                        className="pl-9 h-9 border-border focus:border-primary transition-colors"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-9 px-3 hover:scale-105 transition-transform"
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px] px-4">
                    <div className="space-y-2 pb-4">
                      {filteredLeads.map((lead) => (
                        <LeadCard
                          key={lead.id}
                          lead={lead}
                          isSelected={selectedLead?.id === lead.id}
                          onClick={() => setSelectedLead(lead)}
                        />
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Sequence Builder */}
            <div className="col-span-6">
              <Card className="h-full">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <span>Sequence Builder</span>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        AI Powered
                      </Badge>
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                        Step 1
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground">
                        Informal
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px]">
                    <SequenceBuilder leadName={selectedLead?.name.split(' ')[0]} />
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Lead Insights */}
            <div className="col-span-3">
              <ScrollArea className="h-full">
                <LeadInsights lead={selectedLead} />
              </ScrollArea>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">T</span>
              </div>
              <span className="text-xl font-semibold">Twain</span>
            </div>
            <div className="hidden md:flex items-center space-x-6 ml-8">
              <button 
                onClick={() => setActiveNavItem('features')}
                className={`text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                  activeNavItem === 'features' 
                    ? 'text-primary border-b-2 border-primary pb-1' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Features
              </button>
              <button 
                onClick={() => setActiveNavItem('resources')}
                className={`text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                  activeNavItem === 'resources' 
                    ? 'text-primary border-b-2 border-primary pb-1' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Resources
              </button>
              <button 
                onClick={() => setActiveNavItem('pricing')}
                className={`text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                  activeNavItem === 'pricing' 
                    ? 'text-primary border-b-2 border-primary pb-1' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Pricing
              </button>
              <button 
                onClick={() => setActiveNavItem('dashboard')}
                className={`text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                  activeNavItem === 'dashboard' 
                    ? 'text-primary border-b-2 border-primary pb-1' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Dashboard
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              className="hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Log in
            </Button>
            <Button 
              size="sm"
              className="hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Sign up
            </Button>
          </div>
        </div>
      </nav>
      
      {renderContent()}
    </div>
  );
};

export default Dashboard;