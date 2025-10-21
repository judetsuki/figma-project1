import React, { useState, useRef } from "react";
import '../Styles/SignIn2.css';

export default function SignIn2() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === '') {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      // switch to next screen
    } else {
      alert('Please enter all 6 digits');
    }
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

        <form className="form" onSubmit={handleVerify}>
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              className="codeInput"
              value={digit}
              onChange={(e) => handleInputChange(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              maxLength="1"
            />
          ))}
          <button type="submit" onClick = {handleVerify} className="button">Verify</button>
        </form>
      </div>
    </div>
  );
}

