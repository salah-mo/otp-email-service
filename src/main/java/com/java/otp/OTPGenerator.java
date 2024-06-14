package com.java.otp;

import java.security.SecureRandom;

public class OTPGenerator {

    private static final int OTP_LENGTH = 6;

    public static String generateOTP() {
        SecureRandom random = new SecureRandom();
        StringBuilder otp = new StringBuilder(OTP_LENGTH);
        for (int i = 0; i < OTP_LENGTH; i++) {
            otp.append(random.nextInt(10));
        }
        return otp.toString();
    }
}
