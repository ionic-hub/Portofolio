// EmailJS Configuration
;(() => {
  // Initialize EmailJS with your public key
  // You need to replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
  window.emailjs.init("YOUR_PUBLIC_KEY")
})()

// Contact Form Handling
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")
  const formSuccess = document.getElementById("formSuccess")
  const formError = document.getElementById("formError")
  const submitBtn = document.getElementById("submitBtn")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const name = formData.get("from_name")
      const email = formData.get("from_email")
      const subject = formData.get("subject")
      const message = formData.get("message")

      // Basic validation
      if (!name || !email || !subject || !message) {
        showError("Please fill in all fields.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        showError("Please enter a valid email address.")
        return
      }

      // Show loading state
      const originalText = submitBtn.innerHTML
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
      submitBtn.disabled = true

      // Hide previous messages
      formSuccess.style.display = "none"
      formError.style.display = "none"

      // Send email using EmailJS
      window.emailjs
        .sendForm(
          "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
          "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
          contactForm,
        )
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text)

            // Show success message
            contactForm.style.display = "none"
            formSuccess.style.display = "block"

            // Reset form after 5 seconds
            setTimeout(() => {
              contactForm.style.display = "block"
              formSuccess.style.display = "none"
              contactForm.reset()
              submitBtn.innerHTML = originalText
              submitBtn.disabled = false
            }, 5000)
          },
          (error) => {
            console.log("FAILED...", error)

            // Show error message
            formError.style.display = "block"

            // Reset button
            submitBtn.innerHTML = originalText
            submitBtn.disabled = false

            // Hide error after 5 seconds
            setTimeout(() => {
              formError.style.display = "none"
            }, 5000)
          },
        )
    })
  }

  // Helper function to show error messages
  function showError(message) {
    const errorElement = document.getElementById("formError")
    const errorText = errorElement.querySelector("p")
    errorText.textContent = message
    errorElement.style.display = "block"

    setTimeout(() => {
      errorElement.style.display = "none"
    }, 5000)
  }

  // Add input focus effects
  const formInputs = document.querySelectorAll(".contact-form input, .contact-form textarea")
  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused")
    })

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentElement.classList.remove("focused")
      }
    })

    // Check if input has value on page load
    if (input.value) {
      input.parentElement.classList.add("focused")
    }
  })
})

// Add some CSS for the focused state and error message
const style = document.createElement("style")
style.textContent = `
    .form-group.focused label {
        color: #3498db;
        transform: translateY(-2px);
        transition: all 0.3s ease;
    }
    
    .contact-method:hover .contact-icon {
        transform: scale(1.1);
        transition: transform 0.3s ease;
    }

    .form-error {
        background: #f8d7da;
        color: #721c24;
        padding: 1rem;
        border-radius: 5px;
        margin-top: 1rem;
        text-align: center;
        border: 1px solid #f5c6cb;
    }

    .form-error i {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        display: block;
    }

    .form-success {
        background: #d4edda;
        color: #155724;
        padding: 1rem;
        border-radius: 5px;
        margin-top: 1rem;
        text-align: center;
        border: 1px solid #c3e6cb;
    }

    .form-success i {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        display: block;
    }
`
document.head.appendChild(style)
