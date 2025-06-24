# 🎤 UhmDetector.ai

**Master Your Communication Skills with AI-Powered Feedback**

UhmDetector.ai is a comprehensive communication improvement platform that combines real-time speech analysis with typing practice to help users eliminate filler words, improve speaking clarity, and enhance their overall communication skills.

![UhmDetector.ai Banner](https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1200)

## ✨ Features

### 🎯 **Speech Analysis & Improvement**
- **Real-time Filler Word Detection** - Instantly identifies "uhm," "like," "so," "you know," and other filler words
- **Live Clarity Scoring** - Get immediate feedback on your speaking performance
- **AI-Powered Suggestions** - Receive contextual alternatives and speaking tips
- **Practice Modes** - Structured exercises for elevator pitches, storytelling, interviews, and impromptu speaking
- **Speech Analytics** - Track WPM, sentiment, confidence, tone, and pace

### ⌨️ **Typing Improvement**
- **Multiple Practice Modes** - Words, sentences, paragraphs, code, and numbers
- **Difficulty Levels** - Beginner, intermediate, and advanced challenges
- **Real-time WPM & Accuracy** - Live tracking of typing speed and precision
- **Progress Analytics** - Detailed statistics and improvement tracking
- **Common Mistakes Analysis** - Identify and practice problematic key combinations

### 📊 **Comprehensive Analytics**
- **Progress Tracking** - Visual charts showing improvement over time
- **Performance Insights** - Detailed breakdowns of strengths and areas for improvement
- **Achievement System** - Badges and milestones to keep you motivated
- **Leaderboards** - Compare your progress with other users

### 🔒 **Privacy-First Design**
- **Local Processing** - Speech recognition happens on your device
- **No Audio Storage** - We never store your voice recordings
- **Secure Data** - Only text transcripts and analytics are saved
- **GDPR Compliant** - Full control over your personal data

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Edge, Safari, or Firefox)
- Microphone access for speech features
- Internet connection for real-time processing

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DtgfjtwsXehpehp/uhmdetector-ai.git
   cd uhmdetector-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start using UhmDetector.ai

### Quick Start Guide

1. **Create an Account** - Sign up for free (no credit card required)
2. **Allow Microphone Access** - Grant permission for speech analysis
3. **Start Your First Session** - Choose between speech practice or typing test
4. **Track Your Progress** - View analytics and celebrate achievements

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI framework with hooks and concurrent features
- **TypeScript** - Type-safe development for better code quality
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Vite** - Fast build tool and development server
- **Zustand** - Lightweight state management
- **Recharts** - Beautiful and responsive charts

### Core Features
- **Web Speech API** - Browser-native speech recognition
- **Real-time Processing** - Instant feedback and analysis
- **Local Storage** - Client-side data persistence
- **Responsive Design** - Works on all devices and screen sizes

### Development Tools
- **ESLint** - Code linting and quality checks
- **TypeScript** - Static type checking
- **PostCSS** - CSS processing and optimization
- **Lucide React** - Beautiful and consistent icons

## 📱 Browser Support

| Browser | Speech Recognition | Typing Features | Recommended |
|---------|-------------------|-----------------|-------------|
| Chrome | ✅ Full Support | ✅ Full Support | ✅ Yes |
| Edge | ✅ Full Support | ✅ Full Support | ✅ Yes |
| Safari | ✅ Full Support | ✅ Full Support | ✅ Yes |
| Firefox | ⚠️ Limited | ✅ Full Support | ⚠️ Partial |

## 🎯 Use Cases

### **For Professionals**
- **Public Speakers** - Eliminate filler words and improve delivery
- **Business Executives** - Enhance presentation skills and confidence
- **Sales Teams** - Improve client communication and pitch delivery
- **Teachers & Trainers** - Develop clear and engaging speaking styles

### **For Students**
- **Interview Preparation** - Practice common questions and responses
- **Presentation Skills** - Build confidence for academic presentations
- **Language Learning** - Improve pronunciation and fluency
- **Typing Skills** - Increase productivity for academic work

### **For Content Creators**
- **Podcasters** - Reduce editing time by speaking more clearly
- **YouTubers** - Improve video quality with better speech patterns
- **Streamers** - Enhance audience engagement through clear communication
- **Writers** - Improve typing speed for increased productivity

## 📊 Analytics & Insights

### Speech Analytics
- **Clarity Score** - Overall speaking performance rating
- **Filler Word Count** - Track specific types and frequency
- **Speaking Pace** - Monitor words per minute
- **Sentiment Analysis** - Understand emotional tone
- **Confidence Metrics** - Measure speaking assurance

### Typing Analytics
- **Words Per Minute (WPM)** - Track typing speed improvement
- **Accuracy Percentage** - Monitor precision over time
- **Error Analysis** - Identify common mistakes and patterns
- **Progress Trends** - Visualize improvement over time
- **Practice Time** - Total time spent improving skills

## 🏆 Achievement System

### Speech Badges
- 🎯 **First Steps** - Complete your first speaking session
- 🔥 **Getting Serious** - Complete 5 speaking sessions
- 🏆 **Clarity Master** - Achieve a clarity score of 90+
- 📈 **On the Rise** - Reduce filler words by 30%
- 📆 **Consistency is Key** - Complete sessions on 3 consecutive days

### Typing Badges
- ⌨️ **Speed Demon** - Achieve 60+ WPM
- 🎯 **Accuracy Expert** - Maintain 95%+ accuracy
- 💻 **Code Warrior** - Complete 10 code typing tests
- 📚 **Word Master** - Complete 50 typing sessions
- 🚀 **Lightning Fast** - Achieve 100+ WPM

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_APP_NAME=UhmDetector.ai
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ACHIEVEMENTS=true
```

### Customization Options
- **Theme Colors** - Modify `tailwind.config.js` for custom branding
- **Practice Modes** - Add new modes in `src/data/practiceModes.ts`
- **Typing Texts** - Customize practice texts in `src/data/typingTexts.ts`
- **Achievement Criteria** - Adjust badge requirements in `src/store/useAchievementStore.ts`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main branch

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to GitHub Pages
```bash
npm run build
npm run deploy
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Contribution Guidelines
- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features when applicable
- Update documentation for any new functionality
- Ensure all tests pass before submitting

### Areas for Contribution
- 🌐 **Internationalization** - Add support for multiple languages
- 🎨 **Themes** - Create new visual themes and color schemes
- 📱 **Mobile App** - Develop native mobile applications
- 🤖 **AI Improvements** - Enhance speech analysis algorithms
- 📊 **Analytics** - Add new metrics and visualization options

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Speech Recognition** - Built on the Web Speech API
- **Icons** - Beautiful icons provided by [Lucide](https://lucide.dev)
- **Images** - Stock photos from [Pexels](https://pexels.com)
- **Charts** - Data visualization powered by [Recharts](https://recharts.org)
- **Inspiration** - Thanks to all the public speaking coaches and typing tutors who inspired this project

## 📞 Support

### Getting Help
- 📚 **Documentation** - Check our comprehensive guides
- 💬 **Community** - Join our Discord server for discussions
- 🐛 **Bug Reports** - Open an issue on GitHub
- 💡 **Feature Requests** - Share your ideas with us

### Contact Information
- **Email** - support@uhmdetector.ai
- **Website** - [https://uhmdetector.ai](https://uhmdetector.ai)
- **Twitter** - [@UhmDetectorAI](https://twitter.com/UhmDetectorAI)
- **LinkedIn** - [UhmDetector.ai](https://linkedin.com/company/uhmdetector-ai)

## 🔮 Roadmap

### Version 2.0 (Coming Soon)
- 🌐 **Multi-language Support** - Practice in different languages
- 🎥 **Video Analysis** - Analyze body language and gestures
- 👥 **Team Features** - Collaborate with colleagues and friends
- 📱 **Mobile Apps** - Native iOS and Android applications
- 🤖 **Advanced AI** - More sophisticated speech analysis

### Version 3.0 (Future)
- 🎮 **Gamification** - Turn practice into engaging games
- 🏢 **Enterprise Features** - Advanced analytics for organizations
- 🎓 **Educational Integration** - LMS and classroom features
- 🌍 **Global Leaderboards** - Compete with users worldwide
- 🔊 **Voice Cloning** - Practice with different voice styles

---

**Made with ❤️ by the UhmDetector.ai Team**

*Helping people communicate better, one word at a time.*

## 📈 Project Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/uhmdetector-ai?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/uhmdetector-ai?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/uhmdetector-ai)
![GitHub license](https://img.shields.io/github/license/yourusername/uhmdetector-ai)
![Build status](https://img.shields.io/github/workflow/status/yourusername/uhmdetector-ai/CI)

---

*Ready to transform your communication skills? [Get started now!]([https://uhmdetector.ai](https://uhm-detector-ai.vercel.app/))*
