# StableHub 🎨

**A Local AI Platform for Image Generation and Diffusion Models**

StableHub is an educational project by the AI-D Lab at HfG Gmünd, providing students with an accessible and user-friendly environment to understand and experiment with Stable Diffusion and other diffusion models. The platform runs entirely locally, allowing you to work with cutting-edge AI technology without external dependencies or cloud services.

## Why StableHub? 🤔

**🧪 Learning through Experimentation**: StableHub makes complex AI concepts tangible by allowing students to directly interact with models and observe the effects of different parameters in real-time.

**🏠 Local Control**: All computations happen on your own system - no data leaves your computer, no external APIs required.

**📚 Educational Approach**: The user interface is designed to illustrate the underlying mechanisms of diffusion models and foster understanding of prompting, sampling methods, and model parameters.

## Features ✨

### For Students 🎓
- **🎯 Intuitive User Interface**: Easy entry without technical barriers
- **🔬 Experiment-Friendly**: Try different models and parameters
- **📊 Learning-Oriented**: Visualization of the generation process and parameter effects
- **🔒 Local Operation**: Complete control and privacy

### Technical Capabilities 🛠️
- Load and compare various Stable Diffusion models
- Batch generation for systematic experiments
- Workflow creation for complex projects
- Real-time monitoring of the generation process

## Quick Start 🚀

### Prerequisites 📋
- **💻 Computer with NVIDIA GPU** (recommended for good performance)
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

3. **⚙️ Configure environment**
   ```bash
   cp .env.example .env
   ```
   Adjust the `.env` file if needed (default values usually work fine).

4. **🎬 Start StableHub**
   ```bash
   npm run dev
   ```

5. **🌐 Open in browser**
   Navigate to `http://localhost:3000` and start experimenting!

### First Steps 👋
1. ✍️ Enter a text prompt (e.g., "A sunset over the mountains")
2. 🎛️ Experiment with parameters like Steps, Guidance Scale, and Sampling Method
3. 🎬 Click generate to create your image
4. 👀 Observe how changes to parameters affect the result

## Managing Models 🗃️

StableHub supports various Stable Diffusion models. New models can be uploaded via the web interface or placed in the `models/` folder.

**🌟 Recommended models for beginners:**
- 🏃 Stable Diffusion 1.5 (versatile and fast)
- 🎨 Stable Diffusion 2.1 (higher quality)
- 🎭 Specialized models for specific styles or applications

## For Educators 👩‍🏫

StableHub is excellent for:
- **📖 AI and Machine Learning Lectures**: Live demonstrations of diffusion models
- **🛠️ Workshops**: Hands-on experience with various parameters and their effects
- **🎯 Project Work**: Students can develop their own creative AI projects
- **🔬 Research**: Systematic experiments and comparisons between models

## Common Issues 🐛

**🐌 Slow generation?** 
- Check if an NVIDIA GPU is detected
- Reduce the number of steps for faster results

**❌ Model won't load?**
- Ensure sufficient GPU memory is available
- Try a smaller model

**🆘 Need more help?**
Contact the AI-D Lab or create an issue in the repository.

## About the AI-D Lab 🏫

The AI-D Lab at HfG Gmünd researches and teaches the creative use of Artificial Intelligence in design and art. StableHub is part of our mission to make AI technologies accessible and provide students with practical experience using cutting-edge tools.

## License 📄

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments 🙏

- 🎨 Stability AI for Stable Diffusion
- 🌍 The Open Source community for tools and models
- 👥 Students and educators at the AI-D Lab for feedback and contributions
