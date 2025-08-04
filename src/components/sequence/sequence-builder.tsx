import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Clock, RotateCcw, Trash2 } from 'lucide-react';

interface SequenceStep {
  id: string;
  stepNumber: number;
  tone: 'formal' | 'informal' | 'friendly';
  content: string;
  length: {
    seconds: number;
    words: number;
  };
}

interface SequenceBuilderProps {
  leadName?: string;
}

export const SequenceBuilder: React.FC<SequenceBuilderProps> = ({ leadName = "Ilija" }) => {
  const [steps, setSteps] = useState<SequenceStep[]>([
    {
      id: '1',
      stepNumber: 1,
      tone: 'informal',
      content: `Hey ${leadName},\n\nHow is your team currently moving past generic LinkedIn outreach templates for agency clients?\n\nWe just launched deep research that builds outreach sequences using live social proof and competitive signals, so your team can help agencies personalize campaigns at scale.\n\nHow about we add 500 free credits for your team to test deep research and see the impact?`,
      length: { seconds: 18, words: 60 }
    },
    {
      id: '2',
      stepNumber: 2,
      tone: 'informal',
      content: `Reaching out because HeyReach gives agencies new ways to scale LinkedIn outreach, and your focus on data quality lines up well with using social proof and competitive signals for agency clients.\n\nAre you already building custom sequences for agencies, or is your team still relying on templates for LinkedIn outreach?`,
      length: { seconds: 15, words: 50 }
    },
    {
      id: '3',
      stepNumber: 3,
      tone: 'informal',
      content: `How about we set up a chat with a customer who started using Twain when their agency clients were still scaling LinkedIn outreach and moving past templates.\n\nLet me know and I can introduce you.`,
      length: { seconds: 11, words: 35 }
    }
  ]);

  const addStep = () => {
    const newStep: SequenceStep = {
      id: (steps.length + 1).toString(),
      stepNumber: steps.length + 1,
      tone: 'informal',
      content: '',
      length: { seconds: 0, words: 0 }
    };
    setSteps([...steps, newStep]);
  };

  const updateStep = (id: string, field: keyof SequenceStep, value: any) => {
    setSteps(steps.map(step => 
      step.id === id ? { ...step, [field]: value } : step
    ));
  };

  const deleteStep = (id: string) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  const calculateLength = (content: string) => {
    const words = content.trim().split(/\s+/).length;
    const seconds = Math.ceil(words * 0.3); // Approximate reading time
    return { words, seconds };
  };

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <Card key={step.id} className="border-l-4 border-l-primary">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium flex items-center space-x-2">
                <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-xs">
                  {step.stepNumber}
                </span>
                <span>Step {step.stepNumber}</span>
              </CardTitle>
              
              <div className="flex items-center space-x-2">
                <Select 
                  value={step.tone} 
                  onValueChange={(value) => updateStep(step.id, 'tone', value)}
                >
                  <SelectTrigger className="w-24 h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="informal">Informal</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => deleteStep(step.id)}
                  className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <Textarea
              value={step.content}
              onChange={(e) => {
                updateStep(step.id, 'content', e.target.value);
                updateStep(step.id, 'length', calculateLength(e.target.value));
              }}
              className="min-h-[120px] text-sm resize-none"
              placeholder="Enter your outreach message..."
            />
            
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {step.length.seconds} sec
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {step.length.words} words
                </Badge>
              </div>
              
              <Button variant="ghost" size="sm" className="text-xs h-7">
                <RotateCcw className="h-3 w-3 mr-1" />
                Regenerate
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Button 
        variant="outline" 
        onClick={addStep}
        className="w-full border-dashed border-2 h-12 text-muted-foreground hover:text-foreground hover:border-primary"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Step
      </Button>
    </div>
  );
};