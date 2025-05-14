// Store users in localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];

// Check if we're on the signup page
if (document.querySelector("title").innerText === "Sign Up Page") {
  const signupForm = document.querySelector("form");

  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Basic validation
    if (!fullname || !email || !username || !password) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Check if username or email already exists
    if (users.some((user) => user.username === username)) {
      alert("Username already exists");
      return;
    }

    if (users.some((user) => user.email === email)) {
      alert("Email already in use");
      return;
    }

    // Create user object
    const user = {
      fullname,
      email,
      username,
      password, // In a real app, you would hash this password
    };

    // Add user to array
    users.push(user);

    // Save to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Show success message and redirect
    alert("Account created successfully! Please log in.");
    window.location.href = "index.html";
  });
}

// Check if we're on the login page
if (document.querySelector("title").innerText === "Login Page") {
  const loginForm = document.querySelector("form");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const rememberMe = document.querySelector('input[type="checkbox"]').checked;

    // Basic validation
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    // Check if user exists
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // If remember me is checked, store the login state
      if (rememberMe) {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            username: user.username,
            fullname: user.fullname,
          })
        );
      } else {
        sessionStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            username: user.username,
            fullname: user.fullname,
          })
        );
      }

      // Show success message
      alert(`Welcome back, ${user.fullname}!`);

      // In a real app, you would redirect to a dashboard
      // For now, we'll just show an alert
    } else {
      alert("Invalid username or password");
    }
  });

  // Handle forgot password (just a placeholder)
  const forgotPasswordLink = document.querySelector(".remember-forgot a");
  forgotPasswordLink.addEventListener("click", function (e) {
    e.preventDefault();
    alert(
      "Password reset functionality would be implemented here in a real application."
    );
  });
}
