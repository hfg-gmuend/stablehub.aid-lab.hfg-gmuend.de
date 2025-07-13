# StableHub 🎨

**A Local AI Platform for Image Generation and Diffusion Models**

StableHub is an educational project by the AI-D Lab at HfG Gmünd, providing students with an accessible and user-friendly environment to understand and experiment with Stable Diffusion and other diffusion models. The platform is accessible online at https://stablehub.aid-lab.hfg-gmuend.de/ and offers a comprehensive suite of AI-powered image generation tools.

## Why StableHub? 🤔

**🧪 Learning through Experimentation**: StableHub makes complex AI concepts tangible by allowing students to directly interact with models and observe the effects of different parameters in real-time.

**� Easy Access**: Available online without any installation or setup requirements - just visit the website and start creating.

**📚 Educational Approach**: The user interface is designed to illustrate the underlying mechanisms of diffusion models and foster understanding of prompting, sampling methods, and model parameters.

## Features ✨

### For Students 🎓
- **🎯 Intuitive User Interface**: Easy entry without technical barriers
- **🔬 Experiment-Friendly**: Try different models and parameters
- **📊 Learning-Oriented**: Visualization of the generation process and parameter effects
- **🌐 Online Access**: No installation required - access directly through your browser
- **✨ Magic Prompt**: AI-powered prompt enhancement using ChatGPT to improve and expand your prompts with scene context and creative suggestions
- **🖼️ HfG Gallery**: Student showcase platform where users can upload their creations, like others' work, and participate in monthly exhibitions featuring top-voted pieces

### Technical Capabilities 🛠️
- **📝 Text-to-Image Generation**: Create images from textual descriptions
- **🖼️ Image-to-Image Transformation**: Modify existing images with prompts
- **🎛️ ControlNet Integration**: Precise control over image composition and structure
- **🤖 AI-Powered Prompt Enhancement**: Automatic prompt optimization using OpenAI's ChatGPT
- **📁 Multiple Model Support**: Load and compare various Stable Diffusion models
- **⚡ Batch Generation**: Create multiple variations for systematic experiments
- **🔄 Workflow Creation**: Design complex multi-step generation processes
- **📊 Real-time Monitoring**: Track generation progress and performance
- **🎨 Style Management**: Apply and manage different artistic styles
- **💾 One-Click Prompt Copying**: Instantly copy and replace prompts from generated results

## Quick Start 🚀

### Getting Started 🌐
Simply visit **https://stablehub.aid-lab.hfg-gmuend.de/** in your browser and start creating! No installation or setup required.

### First Steps 👋
1. ✍️ Enter a text prompt (e.g., "A sunset over the mountains")
2. ✨ Use the Magic Prompt button to enhance your prompt with AI-powered suggestions
3. 🎛️ Experiment with parameters like Steps, Guidance Scale, and Sampling Method
4. 🎬 Click generate to create your image
5. 📋 Copy prompts from generated results to quickly iterate and improve
6. 🖼️ Share your best creations in the HfG Gallery and vote on others' work
7. 👀 Observe how changes to parameters affect the result

## Development Setup 👨‍💻

For developers who want to contribute or run their own instance:

### Prerequisites 📋
- **⚡ Node.js 18+** ([Download](https://nodejs.org/))
- **📁 Git** for cloning the repository

### Installation 🔧

1. **📥 Clone repository**
   ```bash
   git clone <repository-url>
   cd stablehub.aid-lab.hfg-gmuend.de
   ```

2. **📦 Install dependencies**
   ```bash
   npm install
   ```

3. **🎬 Start development server**
   ```bash
   npm run dev
   ```

4. **🌐 Open in browser**
   Navigate to `http://localhost:3000` for local development.


## For Educators 👩‍🏫

StableHub is excellent for:
- **📖 AI and Machine Learning Lectures**: Live demonstrations of diffusion models
- **🛠️ Workshops**: Hands-on experience with various parameters and their effects
- **🎯 Project Work**: Students can develop their own creative AI projects
- **🔬 Research**: Systematic experiments and comparisons between models
- **🎨 Creative Assignments**: Use the HfG Gallery for student exhibitions and peer learning
- **📝 Prompt Engineering Education**: Teach effective prompting techniques with Magic Prompt assistance

## Common Issues 🐛

**🐌 Slow generation?** 
- Server load may affect generation speed during peak times
- Try reducing the number of steps for faster results
- Consider using smaller image dimensions

**🔑 Magic Prompt not working?**
- The feature may be temporarily unavailable during maintenance
- Try refreshing the page if the button doesn't respond

**🖼️ Gallery upload issues?**
- Check file size (images should be under 10MB)
- Ensure image format is supported (PNG, JPG, JPEG)
- Make sure you're logged in to upload images

**🌐 Website not loading?**
- Check your internet connection
- Try clearing your browser cache
- The service may be temporarily down for maintenance

**🆘 Need more help?**
Contact the AI-D Lab or create an issue in the repository.

## About the AI-D Lab 🏫

The AI-D Lab at HfG Gmünd researches and teaches the creative use of Artificial Intelligence in design and art. StableHub is part of our mission to make AI technologies accessible and provide students with practical experience using cutting-edge tools.

## Contributors 👥

StableHub has been developed over 5 months with contributions from:

- **Felix Sewering** - Advisory role and ideation phase
- **Christopher Pietsch** - Backend development and server API interfaces  
- **Franz Anhäupl** - Designprocess, user testing, and frontend implementation

Special thanks to the students and educators at the AI-D Lab for continuous feedback and testing.

## License 📄

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments 🙏

- 🎨 Stability AI for Stable Diffusion
- 🤖 OpenAI for ChatGPT API integration
- 🌍 The Open Source community for tools and models
- 👥 Students and educators at the AI-D Lab for feedback and contributions
- 🏫 HfG Gmünd for supporting innovative AI education

Thanks for checking out StableHub! 🚀