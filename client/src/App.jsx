import './App.css'
import { useState } from 'react'
import SignIn1 from './Components/SignIn1'
import SignIn2 from './Components/SignIn2'

function App() {
  const [currentStep, setCurrentStep] = useState(1)

  const handleSignIn = () => {
    setCurrentStep(2)
  }

  const handle2FA = () => {
    alert('2FA successful! Logged in.')
  }

  return (
    <div className="App" style={{ minHeight: '100vh' }}>
      {currentStep === 1 ? <SignIn1 onSignIn={handleSignIn} /> : <SignIn2 onSuccess={handle2FA} />}
    </div>
  )
}

export default App
