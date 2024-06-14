package com.java.otp;

import java.time.LocalDateTime;

public class OtpDetails {
    private String otp;
    private LocalDateTime generationTime;

    public OtpDetails(String otp, LocalDateTime generationTime) {
        this.otp = otp;
        this.generationTime = generationTime;
    }

    public String getOtp() {
        return otp;
    }

    public LocalDateTime getGenerationTime() {
        return generationTime;
    }
}