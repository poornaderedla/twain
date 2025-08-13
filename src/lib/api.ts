const API_BASE_URL = 'http://localhost:8000';

export interface SocialProof {
  statement: string;
  source?: string;
}

export interface Persona {
  id: string;
  name?: string;
  title?: string;
  company?: string;
  email?: string;
  pain_points: string[];
  social_proof: SocialProof[];
  cost_of_inaction: string[];
  solutions: string[];
  objections: string[];
  competitive_advantages: string[];
}

export interface CampaignRequest {
  persona: Persona;
  outreach_channel: 'email' | 'linkedin' | 'useboth';
}

export interface MessageContent {
  subject?: string;
  body: string;
}

export interface CampaignResponse {
  message: string;
  campaign_details: any;
  generated_content: MessageContent[] | { email: MessageContent[]; linkedin: MessageContent[] } | null;
}

export interface PersonaRequest {
  url: string;
  description: string;
}

export interface IdeasOutput {
  ideas: string[];
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Create persona from website
  async createPersona(data: PersonaRequest): Promise<Persona> {
    return this.request<Persona>('/persona', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Generate ideas based on persona
  async generateIdeas(persona: Persona): Promise<IdeasOutput> {
    return this.request<IdeasOutput>('/ideas', {
      method: 'POST',
      body: JSON.stringify(persona),
    });
  }

  // Create campaign (updated endpoint)
  async createCampaign(data: CampaignRequest): Promise<CampaignResponse> {
    return this.request<CampaignResponse>('/create_campaign_create_campaign_post', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Get stored personas
  async getPersonas(limit: number = 50): Promise<{ personas: Persona[]; count: number }> {
    return this.request<{ personas: Persona[]; count: number }>(`/personas?limit=${limit}`);
  }

  // Get stored campaigns
  async getCampaigns(limit: number = 50): Promise<{ campaigns: any[]; count: number }> {
    return this.request<{ campaigns: any[]; count: number }>(`/campaigns?limit=${limit}`);
  }

  // Get stored ideas
  async getStoredIdeas(limit: number = 50): Promise<{ ideas: any[]; count: number }> {
    return this.request<{ ideas: any[]; count: number }>(`/ideas?limit=${limit}`);
  }
}

export const apiService = new ApiService();
export default apiService;

