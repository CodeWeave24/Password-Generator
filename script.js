const generateBtn = document.getElementById('generateBtn');
        const copyBtn = document.getElementById('copyBtn');
        const passwordField = document.getElementById('password');
        const lengthInput = document.getElementById('length');
        const uppercaseCheck = document.getElementById('uppercase');
        const numbersCheck = document.getElementById('numbers');
        const symbolsCheck = document.getElementById('symbols');
        const strengthBar = document.getElementById('strengthBar');

        const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

        function calculateStrength(password) {
            let strength = 0;
            if (/[A-Z]/.test(password)) strength += 25;
            if (/[0-9]/.test(password)) strength += 25;
            if (/[^A-Za-z0-9]/.test(password)) strength += 25;
            if (password.length >= 12) strength += 25;
            
            strengthBar.style.width = strength + '%';
            strengthBar.style.backgroundColor = 
                strength < 50 ? '#ff4444' :
                strength < 75 ? '#ffbb33' : '#00C851';
        }

        function generatePassword() {
            let chars = lowerLetters;
            let password = '';
            
            if(uppercaseCheck.checked) chars += upperLetters;
            if(numbersCheck.checked) chars += numbers;
            if(symbolsCheck.checked) chars += symbols;

            if(chars === lowerLetters) {
                alert('Please select at least one character type!');
                return;
            }

            for(let i = 0; i < lengthInput.value; i++) {
                const randomIndex = Math.floor(Math.random() * chars.length);
                password += chars[randomIndex];
            }

            password = password.split('').sort(() => Math.random() - 0.5).join('');
            passwordField.value = password;
            calculateStrength(password);
        }

        function copyToClipboard() {
            if(!passwordField.value) return;
            
            navigator.clipboard.writeText(passwordField.value).then(() => {
                copyBtn.innerHTML = `<i class="fas fa-check"></i> Copied!`;
                setTimeout(() => {
                    copyBtn.innerHTML = `<i class="far fa-copy"></i> Copy`;
                }, 2000);
            });
        }

        generateBtn.addEventListener('click', generatePassword);
        copyBtn.addEventListener('click', copyToClipboard);

        // Initial generation
        generatePassword();