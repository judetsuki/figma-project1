import React, { useState, useRef, useEffect } from "react";
import '../Styles/SignIn2.css';

export default function SignIn2({ onSuccess }) {
  const [code, setCode] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 1);

    setCode((prev) => {
      const arr = [...prev];
      arr[idx] = val;

      if (val && idx < 5) {
        setTimeout(() => {
          inputsRef.current[idx + 1]?.focus();
        }, 0);
      }

      if (!val && e.nativeEvent.inputType === 'deleteContentBackward' && idx > 0) {
        setTimeout(() => {
          inputsRef.current[idx - 1]?.focus();
        }, 0);
      }

      return arr;
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (code.some(c => c === '')) {
      setError('Please enter a valid 6-digit code.');
      setIsCorrect(false);
      return;
    }
    setLoading(true);
    setError('');
    const enteredCode = code.join('');
    try {
      // mok zaprosss
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: enteredCode === '123456' }); // pravilny kod 123456
        }, 1000);
      });
      if (res.success) {
        setIsCorrect(true);
        setError('');
        onSuccess && onSuccess();
      } else {
        setIsCorrect(false);
        setError('Invalid code');
      }
    } catch {
      setIsCorrect(false);
      setError('Error verifying code');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = () => {
    setTimeLeft(30);
    setCode(Array(6).fill(''));
    setError('');
    setIsCorrect(null);
    inputsRef.current[0]?.focus();
  };

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h3 className="companyName">Company</h3>
         <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.8789 0C19.5063 0 24.8789 5.37258 24.8789 12C24.8789 18.6274 19.5063 24 12.8789 24C6.25149 24 0.878906 18.6274 0.878906 12C0.878906 5.37258 6.25149 0 12.8789 0ZM12.8789 6C9.5652 6 6.87891 8.68629 6.87891 12C6.87891 15.3137 9.5652 18 12.8789 18C16.1926 18 18.8789 15.3137 18.8789 12C18.8789 8.68629 16.1926 6 12.8789 6Z"
              fill="#1677FF"
            />
          </svg> 
        </div>

        <h2 className="heading">Two-Factor Authentication</h2>
        <p className="subtext">Enter the 6-digit code from the Google Authenticator app</p>

        <div className="code-input-row">
          {code.map((v, idx) => (
            <input
              key={idx}
              ref={(el) => (inputsRef.current[idx] = el)}
              type="text"
              value={v}
              className={`codeInput ${isCorrect === null ? '' : isCorrect ? 'correct' : 'incorrect'}`}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              disabled={loading || isCorrect === true}
              onKeyPress={(e) => {
                if (!/[\d]/.test(e.key)) e.preventDefault();
              }}
            />
          ))}
        </div>

        {error && <div className="error-message">{error}</div>}

        {isCorrect === true ? (
          <div className="success-message">Valid code</div>
        ) : (
          <>
            {code.every((el) => el !== '') && !loading && (
              <button className="button" onClick={handleSubmit} disabled={loading}>
                Verify
              </button>
            )}

            {(isCorrect === false || timeLeft <= 30) && (
              timeLeft > 0 ? (
                <div className="resend-timer">Resend code in {timeLeft} seconds</div>
              ) : (
                <button className="resend-button" onClick={handleResendCode}>
                  Resend Code
                </button>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}
