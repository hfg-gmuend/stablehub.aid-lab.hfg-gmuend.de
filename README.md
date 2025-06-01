# StableHub

A comprehensive platform for managing and interacting with Stable Diffusion models, providing both web interface and API access for image generation, model management, and workflow automation.

## Features

### Core Functionality
- **Image Generation**: Generate images using various Stable Diffusion models
- **Model Management**: Upload, download, and manage AI models
- **Workflow Automation**: Create and execute complex image generation workflows
- **Real-time Monitoring**: Track generation progress and system status
- **Multi-format Support**: Handle various image formats and model types

### Web Interface
- Modern React-based dashboard
- Real-time progress tracking
- Batch processing capabilities
- Model comparison tools
- Gallery management

### API Access
- RESTful API for programmatic access
- WebSocket support for real-time updates
- Authentication and authorization
- Rate limiting and quota management

## Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.8+ with pip
- CUDA-compatible GPU (recommended)
- Docker (optional)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stablehub.aid-lab.hfg-gmuend.de
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   npm install
   
   # Backend (if separate)
   cd backend
   pip install -r requirements.txt
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

### Docker Setup
```bash
docker-compose up -d
```

## Usage

### Web Interface
1. Navigate to `http://localhost:3000`
2. Sign in or create an account
3. Upload or select a model
4. Configure generation parameters
5. Generate images and manage results

### API Usage

#### Generate Image
```typescript
const response = await fetch('/api/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer <your-token>'
  },
  body: JSON.stringify({
    prompt: 'A beautiful landscape',
    model: 'stable-diffusion-v1-5',
    steps: 20,
    guidance_scale: 7.5
  })
});
```

#### Upload Model
```typescript
const formData = new FormData();
formData.append('model', file);
formData.append('name', 'my-custom-model');

const response = await fetch('/api/models/upload', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <your-token>'
  },
  body: formData
});
```

## Configuration

### Environment Variables
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/stablehub

# Storage
STORAGE_PATH=./storage
MAX_FILE_SIZE=5GB

# AI/ML
CUDA_VISIBLE_DEVICES=0
MODEL_CACHE_SIZE=10GB
```

### Model Configuration
Models are configured in `config/models.json`:
```json
{
  "models": [
    {
      "name": "stable-diffusion-v1-5",
      "path": "./models/sd-v1-5",
      "type": "stable-diffusion",
      "enabled": true
    }
  ]
}
```

## Development

### Project Structure
```
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API services
│   ├── types/         # TypeScript definitions
│   └── utils/         # Utility functions
├── public/            # Static assets
├── config/            # Configuration files
└── docs/              # Documentation
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Run linting
- `npm run type-check` - TypeScript type checking

### Testing
```bash
# Run all tests
npm test

# Run specific test suite
npm test -- --grep "model management"

# Run with coverage
npm run test:coverage
```

## API Reference

### Authentication
All API endpoints require authentication via Bearer token:
```
Authorization: Bearer <your-jwt-token>
```

### Endpoints

#### Models
- `GET /api/models` - List available models
- `POST /api/models/upload` - Upload new model
- `DELETE /api/models/:id` - Delete model
- `GET /api/models/:id/status` - Get model status

#### Generation
- `POST /api/generate` - Generate image
- `GET /api/generate/:id` - Get generation status
- `GET /api/generate/:id/result` - Download result

#### Workflows
- `GET /api/workflows` - List workflows
- `POST /api/workflows` - Create workflow
- `POST /api/workflows/:id/execute` - Execute workflow

## Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Code Standards
- Use TypeScript for type safety
- Follow ESLint configuration
- Write tests for new features
- Document public APIs
- Use conventional commit messages

### Reporting Issues
Please use the GitHub issue tracker to report bugs or request features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- Documentation: [docs/](docs/)
- Issues: [GitHub Issues](https://github.com/your-repo/issues)
- Discussions: [GitHub Discussions](https://github.com/your-repo/discussions)

## Acknowledgments

- Stable Diffusion community
- HfG Gmünd AID Lab
- Open source contributors
