import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, MapPin, Users, Eye, MessageSquare } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  avatar?: string;
  verified: boolean;
  insights: {
    challenge?: string;
    tasks?: string;
    tools?: string;
  };
}

interface LeadCardProps {
  lead: Lead;
  isSelected?: boolean;
  onClick?: () => void;
}

export const LeadCard: React.FC<LeadCardProps> = ({ lead, isSelected, onClick }) => {
  const initials = lead.name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary shadow-glow' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={lead.avatar} />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-sm truncate">{lead.name}</h3>
              {lead.verified && (
                <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-success/10 text-success border-success/20">
                  Verified
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground truncate">{lead.title}</p>
            
            <div className="flex items-center space-x-1 mt-1">
              <Building className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground truncate">{lead.company}</span>
            </div>
            
            {lead.location && (
              <div className="flex items-center space-x-1 mt-1">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{lead.location}</span>
              </div>
            )}
          </div>
        </div>
        
        {(lead.insights.challenge || lead.insights.tasks || lead.insights.tools) && (
          <div className="mt-3 space-y-1">
            {lead.insights.challenge && (
              <div className="flex items-start space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-warning mt-2 flex-shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">{lead.insights.challenge}</p>
              </div>
            )}
            {lead.insights.tasks && (
              <div className="flex items-start space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">{lead.insights.tasks}</p>
              </div>
            )}
            {lead.insights.tools && (
              <div className="flex items-start space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-success mt-2 flex-shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">{lead.insights.tools}</p>
              </div>
            )}
          </div>
        )}
        
        <div className="flex justify-between items-center mt-3 pt-2 border-t border-border">
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <Eye className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
              <MessageSquare className="h-3 w-3" />
            </Button>
          </div>
          <span className="text-xs text-muted-foreground">View all</span>
        </div>
      </CardContent>
    </Card>
  );
};