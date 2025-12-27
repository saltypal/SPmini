import ClickSpark from './components/ClickSpark'
import Silk from './components/Silk'
import TextPressure from './components/TextPressure'
import ShinyText from './components/ShinyText'
import GradientText from './components/GradientText'
import './App.css'

function App() {
  return (
    <ClickSpark
      sparkColor="#60a5fa"
      sparkSize={12}
      sparkRadius={25}
      sparkCount={10}
      duration={500}
    >
      {/* Silk Background */}
      <div className="silk-background">
        <Silk
          color="#2563eb"
          speed={4}
          scale={1.2}
          noiseIntensity={1.2}
        />
      </div>

      {/* Main Content */}
      <main className="main-content">
        <div className="hero-section">
          {/* Text Pressure - "Satya's place" */}
          <TextPressure
            text="Satya's place"
            strokeColor="#60a5fa"
            textColor="#ffffff"
            fontFamily="Bricolage Grotesque"
            fontSize="clamp(3rem, 12vw, 10rem)"
          />

          {/* Shiny Text - "Cool things coming up soon" */}
          <div className="shiny-wrapper">
            <ShinyText
              text="Cool things coming up soon"
              speed={1}
              className="teaser-shiny"
            />
          </div>

          {/* GitHub Link with Gradient Text */}
          <a
            href="https://github.com/saltypal"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            <GradientText
              colors={['#60a5fa', '#a78bfa', '#f472b6', '#60a5fa', '#a78bfa']}
              animationSpeed={4}
              className="github-text"
            >
              check out my github!
            </GradientText>
          </a>
        </div>
      </main>
    </ClickSpark>
  )
}

export default App
