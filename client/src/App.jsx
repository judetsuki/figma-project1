import './App.css'
import { useState } from 'react'
import SignIn1 from './Components/SignIn1'
import SignIn2 from './Components/SignIn2'

function App() {
  const [currentStep, setCurrentStep] = useState(1)

  const handleSignIn = () => {
    setCurrentStep(2)
  }

  return (
    <div className="App" style={{ minHeight: '100vh' }}>
      {currentStep === 1 ? <SignIn1 onSignIn={handleSignIn} /> : <SignIn2 />}
    </div>
  )
}

export default App
