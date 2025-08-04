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
import { 
  Search, 
  Plus, 
  Download, 
  Filter,
  Sparkles
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

  const filteredLeads = mockLeads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="border-b border-border bg-gradient-secondary">
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
              className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-3 shadow-glow"
              onClick={() => navigate('/create-campaign')}
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Create Campaign
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-300px)]">
          {/* Leads Sidebar */}
          <div className="col-span-3 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <span>Leads</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="h-8">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
                
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search leads..." 
                      className="pl-9 h-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="sm" className="h-9 px-3">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
                {filteredLeads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    isSelected={selectedLead?.id === lead.id}
                    onClick={() => setSelectedLead(lead)}
                  />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="col-span-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Sequence Builder</span>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    AI Powered
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="overflow-y-auto max-h-[600px]">
                <SequenceBuilder leadName={selectedLead?.name.split(' ')[0]} />
              </CardContent>
            </Card>
          </div>

          {/* Lead Insights */}
          <div className="col-span-3">
            <div className="h-full overflow-y-auto">
              <LeadInsights lead={selectedLead} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;