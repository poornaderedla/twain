import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Building, 
  MapPin, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Target, 
  Lightbulb,
  LinkedinIcon
} from 'lucide-react';

interface LeadInsightsProps {
  lead: {
    name: string;
    title: string;
    company: string;
    location: string;
    avatar?: string;
    verified: boolean;
    companySize: string;
    revenue: string;
    industry: string;
    insights: {
      challenge: string;
      tasks: string;
      tools: string;
    };
  };
}

export const LeadInsights: React.FC<LeadInsightsProps> = ({ lead }) => {
  const initials = lead.name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  return (
    <div className="space-y-4">
      {/* Lead Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={lead.avatar} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-xl font-semibold">{lead.name}</h2>
                {lead.verified && (
                  <Badge className="bg-success/10 text-success border-success/20">
                    Verified
                  </Badge>
                )}
              </div>
              
              <p className="text-muted-foreground mb-3">{lead.title}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{lead.company}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{lead.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{lead.companySize}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>{lead.revenue}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <Button size="sm" className="flex items-center space-x-2">
                  <LinkedinIcon className="h-4 w-4" />
                  <span>LinkedIn</span>
                </Button>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <span>Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3 p-3 bg-warning/5 border border-warning/20 rounded-lg">
            <div className="h-2 w-2 rounded-full bg-warning mt-2 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm text-warning-foreground">Challenge</p>
              <p className="text-sm text-muted-foreground mt-1">{lead.insights.challenge}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm">Tasks</p>
              <p className="text-sm text-muted-foreground mt-1">{lead.insights.tasks}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-3 bg-success/5 border border-success/20 rounded-lg">
            <div className="h-2 w-2 rounded-full bg-success mt-2 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm text-success-foreground">Tools</p>
              <p className="text-sm text-muted-foreground mt-1">{lead.insights.tools}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Generated Offer */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-primary">
            <Target className="h-5 w-5" />
            <span>AI Generated Sequence</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3">
            I've generated an offer-based sequence. Step 1 includes trigger, company context, and value prop.
          </p>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-success/10 text-success border-success/30">
              <TrendingUp className="h-3 w-3 mr-1" />
              High Conversion
            </Badge>
            <Badge variant="outline">3 Steps</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};