function setOtpButtonState(isDisabled, duration = 180) {
    const newOtpButton = document.getElementById('newOtpButton');
    newOtpButton.disabled = isDisabled;
    if (isDisabled) {
        newOtpButton.classList.add('button-disabled');
        setTimeout(() => {
            newOtpButton.disabled = false;
            newOtpButton.classList.remove('button-disabled');
        }, duration * 1000);
    }
}

function startExpirationTimer(duration) {
    let timer = duration, minutes, seconds;
    const newOtpButton = document.getElementById('newOtpButton');
    // Disable the button when the timer starts
    newOtpButton.disabled = true;
    newOtpButton.classList.add('button-disabled');

    const interval = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        document.getElementById('timer').textContent = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
        if (--timer < 0) {
            clearInterval(interval);
            alert('OTP has expired.');
            document.getElementById('verifyForm').style.display = 'none';
            // Re-enable the button when the timer ends
            newOtpButton.disabled = false;
            newOtpButton.classList.remove('button-disabled');
        }
    }, 1000);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Refactored generateOTP function with improved error handling
function generateOTP() {
    const email = document.getElementById('email').value;
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    fetch('/otp/generate', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `email=${email}`
    })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok.');
            return response.text();
        })
        .then(data => {
            alert(data);
            document.getElementById('otpForm').style.display = 'none';
            document.getElementById('verifyForm').style.display = 'block';
            startExpirationTimer(180); // 3 minutes
            setOtpButtonState(true, 180); // Disable "Request New OTP" button for 3 minutes
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to generate OTP. Please try again.');
        });
}

function verifyOTP() {
    const email = document.getElementById('email').value;
    const otp = document.getElementById('otp').value;
    fetch('/otp/verify', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `email=${email}&otp=${otp}`
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
            if (data.includes('successfully')) {
                document.getElementById('verifyForm').style.display = 'none';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Verification failed. Please try again.');
        });
}

function requestNewOTP() {
    document.getElementById('verifyForm').style.display = 'none';
    document.getElementById('otp').value = '';
    document.getElementById('otpForm').style.display = 'block';
    document.getElementById('timer').textContent = '';
    const newOtpButton = document.getElementById('newOtpButton');
    newOtpButton.disabled = true;
    newOtpButton.classList.add('button-disabled');
    setTimeout(() => {
        newOtpButton.disabled = false;
        newOtpButton.classList.remove('button-disabled');
    }, 180000); // 3 minutes in milliseconds
    generateOTP();
}