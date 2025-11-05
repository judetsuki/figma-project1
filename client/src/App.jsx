import './App.css'
import { useState } from 'react'
import SignIn1 from './Components/SignIn1'
import SignIn2 from './Components/SignIn2'
import MainPage1 from './Components/MainPage1'

function App() {
  const [currentStep, setCurrentStep] = useState(1)

  const handleSignIn = () => {
    setCurrentStep(2)
  }

  const handle2FA = () => {
    setCurrentStep(3)
  }

  return (
    <div className="App" style={{ minHeight: '100vh' }}>
      {currentStep === 1 ? (
        <SignIn1 onSignIn={handleSignIn} />
      ) : currentStep === 2 ? (
        <SignIn2 onSuccess={handle2FA} />
      ) : (
        <MainPage1 />
      )}
    </div>
  )
}

export default App
