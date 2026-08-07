"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const bookingForm = document.getElementById("bookingForm");
    const bookingStatus = document.getElementById("bookingStatus");
    const startDate = document.getElementById("startDate");

    if (!bookingForm) {
        return;
    }

    // Prevent visitors from selecting a past date.
    if (startDate) {
        const today = new Date();
        const localToday = new Date(
            today.getTime() - today.getTimezoneOffset() * 60000
        )
            .toISOString()
            .split("T")[0];

        startDate.min = localToday;
    }

    function cleanInput(value, maximumLength = 1000) {
        return String(value)
            .replace(/[\u0000-\u001F\u007F]/g, " ")
            .replace(/\s+/g, " ")
            .trim()
            .slice(0, maximumLength);
    }

    bookingForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (bookingStatus) {
            bookingStatus.textContent = "";
        }


        if (!bookingForm.checkValidity()) {
            bookingForm.reportValidity();
            return;
        }

        const fullName = cleanInput(
            document.getElementById("fullName").value,
            80
        );

        const emailAddress = cleanInput(
            document.getElementById("emailAddress").value,
            120
        );

        const country = cleanInput(
            document.getElementById("country").value,
            80
        );

        let countryCode = document
            .getElementById("countryCode")
            .value.replace(/[^\d+]/g, "");

        const whatsappNumber = document
            .getElementById("whatsappNumber")
            .value.replace(/\D/g, "");

        const packageType = cleanInput(
            document.getElementById("packageType").value,
            80
        );

        const packageOption = cleanInput(
            document.getElementById("packageOption").value,
            180
        );

        const guestCount =
            document.getElementById("guestCount").value;

        const safariDays =
            document.getElementById("safariDays").value;

        const preferredDate =
            document.getElementById("startDate").value;

        const accommodation = cleanInput(
            document.getElementById("accommodation").value,
            100
        );

        const specialRequests =
            cleanInput(
                document.getElementById("specialRequests").value,
                1000
            ) || "None specified";

        if (!countryCode.startsWith("+")) {
            countryCode = `+${countryCode}`;
        }

        if (!/^\+\d{1,4}$/.test(countryCode)) {
            if (bookingStatus) {
                bookingStatus.textContent =
                    "Please enter a valid country code, for example +267.";
            }

            return;
        }

        if (
            whatsappNumber.length < 6 ||
            whatsappNumber.length > 15
        ) {
            if (bookingStatus) {
                bookingStatus.textContent =
                    "Please enter a valid WhatsApp number.";
            }

            return;
        }

        const subject =
            `Safari Booking Enquiry - ${fullName}`;

        const emailBody = [
            "SAFARI BOOKING ENQUIRY",
            "",
            "PERSONAL DETAILS",
            "",
            `Full Name: ${fullName}`,
            `Email Address: ${emailAddress}`,
            `Country of Residence: ${country}`,
            `WhatsApp Number: ${countryCode} ${whatsappNumber}`,
            "",
            "SAFARI DETAILS",
            "",
            `Safari Category: ${packageType}`,
            `Safari Package or Destination: ${packageOption}`,
            `Number of Guests: ${guestCount}`,
            `Number of Days: ${safariDays}`,
            `Preferred Start Date: ${preferredDate}`,
            `Preferred Accommodation: ${accommodation}`,
            "",
            "SPECIAL REQUESTS",
            "",
            specialRequests,
            "",
            "CONSENT",
            "",
            "The guest confirmed that the information provided is correct",
            "and understands that this is an enquiry, not a confirmed booking."
        ].join("\n");

        const recipientEmail =
            "info@inyatimobilesafaris.com";

        const mailtoLink =
            `mailto:${recipientEmail}` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(emailBody)}`;

        if (bookingStatus) {
            bookingStatus.textContent =
                "Opening your email application...";
        }

        window.location.href = mailtoLink;
    });
});