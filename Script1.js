document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default browser submission

            // Clear previous invalid states before re-validating
            Array.from(form.elements).forEach(input => {
                input.classList.remove('is-invalid');
            });

            if (validateForm()) {
                // If validation passes:
                
                // 1. Reset the form and clear the was-validated class
                form.classList.remove('was-validated');
                form.reset();

                // 2. Show the success message using the Bootstrap Modal
                const successModal = new bootstrap.Modal(document.getElementById('successModal'));
                successModal.show();
            } else {
                // If validation fails, apply Bootstrap's visual feedback class
                form.classList.add('was-validated');
            }
        });
    }

    function validateForm() {
        let isValid = true;
        
        // Get all form fields by ID
        const fullName = document.getElementById('fullName');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const program = document.getElementById('program');
        
        // --- 1. Basic Required Field Check (Full Name) ---
        if (fullName.value.trim() === "") {
            fullName.classList.add('is-invalid');
            isValid = false;
        }

        // --- 2. Email Format Check ---
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            email.classList.add('is-invalid');
            isValid = false;
        }
        
        // --- 3. Password Length Check (Minimum 8 characters) ---
        if (password.value.length < 8) {
            password.classList.add('is-invalid');
            document.getElementById('feedbackPassword').textContent = "Password must be at least 8 characters long.";
            isValid = false;
        }

        // --- 4. Password Match Check ---
        if (password.value !== confirmPassword.value || confirmPassword.value.trim() === "") {
            confirmPassword.classList.add('is-invalid');
            
            // Set dynamic error message based on the issue
            if (confirmPassword.value.trim() === "") {
                document.getElementById('feedbackConfirmPassword').textContent = "Please confirm your password.";
            } else if (password.value !== confirmPassword.value) {
                document.getElementById('feedbackConfirmPassword').textContent = "Passwords do not match.";
            }
            isValid = false;
        } else {
             // Reset to default message if it passed this check, for cleanliness
             document.getElementById('feedbackConfirmPassword').textContent = "Passwords do not match.";
        }

        // --- 5. Program Selection Check (Ensure a non-default option is picked) ---
        if (program.value === "" || program.value.includes("Choose your program")) {
            program.classList.add('is-invalid');
            isValid = false;
        }

        return isValid;
    }
});