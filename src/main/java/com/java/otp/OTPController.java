package com.java.otp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/otp")
public class OTPController {

    @Autowired
    private EmailService emailService;

    private Map<String, OtpDetails> otpData = new HashMap<>();

    @PostMapping("/generate")
    public String generateOTP(@RequestParam String email) {
        String otp = OTPGenerator.generateOTP();
        otpData.put(email, new OtpDetails(otp, LocalDateTime.now()));
        emailService.sendOTP(email, otp);
        return "OTP has been sent to your email.";
    }

    @PostMapping("/verify")
    public String verifyOTP(@RequestParam String email, @RequestParam String otp) {
        OtpDetails storedOtpDetails = otpData.get(email);
        if (storedOtpDetails != null && storedOtpDetails.getOtp().equals(otp)) {
            long minutesBetween = ChronoUnit.MINUTES.between(storedOtpDetails.getGenerationTime(), LocalDateTime.now());
            if (minutesBetween <= 3) {
                otpData.remove(email);
                return "OTP verified successfully.";
            } else {
                return "OTP expired.";
            }
        } else {
            return "Invalid OTP.";
        }
    }
}