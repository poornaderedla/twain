# API Integration Documentation

## Overview
The CreateCampaign component has been integrated with the TWAIN AI Backend API to provide real-time campaign creation functionality.

## API Endpoints Used

### 1. Create Persona (`POST /persona`)
- **Purpose**: Generate a persona from a website URL
- **Usage**: In Step 1 (Persona) when using Auto mode
- **Data**: Website URL and optional description
- **Response**: Generated persona data

### 2. Generate Ideas (`POST /ideas`)
- **Purpose**: Generate campaign ideas based on persona data
- **Usage**: In Step 3 (Campaign Idea) when clicking "AI Suggest"
- **Data**: Persona object
- **Response**: List of campaign ideas

### 3. Create Campaign (`POST /create_campaign`)
- **Purpose**: Create a new outreach campaign
- **Usage**: In Step 4 or Step 5 when clicking "Create Campaign" or "Launch Campaign"
- **Data**: Persona and outreach channel
- **Response**: Campaign details and generated content

## Data Flow

### Frontend → Backend Transformation
The component transforms frontend form data into the backend API format:

```typescript
// Frontend data structure
const manualPersona = {
  name: "Company Name",
  companyName: "Company Inc",
  painPoints: "High operational costs",
  // ... other fields
};

// Transformed to backend format
const persona: Persona = {
  id: "manual_lead",
  name: "Company Name",
  company: "Company Inc",
  pain_points: ["High operational costs"],
  // ... other fields
};
```

### API Request Format
```typescript
const campaignRequest: CampaignRequest = {
  persona: transformToPersona(),
  outreach_channel: 'email' | 'linkedin' | 'useboth'
};
```

## Testing the Integration

### 1. Start the Backend
```bash
cd twain_ai_backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2. Start the Frontend
```bash
cd twain
npm run dev
```

### 3. Test Flow
1. Navigate to `/create-campaign`
2. **Step 1**: Choose "Auto" mode and enter a website URL (e.g., "example.com")
3. Click "Generate Persona" - this calls `/persona` endpoint
4. **Step 2**: Add leads or generate lookalikes
5. **Step 3**: Click "AI Suggest" - this calls `/ideas` endpoint
6. **Step 4**: Choose sequence type and channel
7. Click "Create Campaign" - this calls `/create_campaign` endpoint

## Error Handling

### Fallback Mechanisms
- **Persona Generation**: If API fails, shows error toast
- **Ideas Generation**: If API fails, falls back to static suggestions
- **Campaign Creation**: Shows detailed error messages

### Validation
- URL format validation for auto persona mode
- Required field validation before API calls
- Data transformation error handling

## Debugging

### Console Logs
The integration includes console logging for debugging:
- Persona generation requests and responses
- Ideas generation requests and responses  
- Campaign creation requests and responses

### Network Tab
Check the browser's Network tab to see:
- API request payloads
- Response data
- Error status codes

## Configuration

### API Base URL
The API base URL is configured in `src/lib/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:8000';
```

### CORS
Ensure the backend has CORS enabled for `http://localhost:5173` (Vite dev server).

## Troubleshooting

### Common Issues

1. **CORS Errors**: Check backend CORS configuration
2. **Network Errors**: Verify backend is running on port 8000
3. **Data Format Errors**: Check console logs for transformation issues
4. **Validation Errors**: Ensure all required fields are filled

### API Response Format
All API responses follow the Pydantic model structure defined in the backend:
- `CampaignResponse` with message, campaign_details, and generated_content
- `Persona` with id, name, company, pain_points, etc.
- `IdeasOutput` with ideas array

## Future Enhancements

- Add retry logic for failed API calls
- Implement offline mode with local storage
- Add API response caching
- Implement real-time progress updates
- Add campaign templates and presets

