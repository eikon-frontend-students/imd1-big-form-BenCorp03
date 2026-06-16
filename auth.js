const user = localStorage.getItem("loggedInUser"); // Vérifier si un utilisateur est connecté

if (!user) {
  window.location.href = "index.html";
}

const userSpan = document.getElementById("current-user"); // Afficher le nom de l'utilisateur dans le dashboard
if (userSpan) {
  userSpan.textContent = user;
}

const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });
}

const awardBtn = document.getElementById("award-register-btn");

awardBtn.addEventListener("click", async () => {
  const user = localStorage.getItem("loggedInUser");

  // Récupérer l'email du compte connecté
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = users.find((u) => u.username === user);

  if (!currentUser || !currentUser.email) {
    alert("No email found for this user.");
    return;
  }

  const data = {
    access_key: "cc01cf18-c175-4892-97bc-8d10d612e72f",
    email: currentUser.email,
    name: currentUser.username,
    message: "Thank you for registering for the Photography Award!",
  };

  await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  window.location.href = "inscriptionsuccess.html";
}); //visuel sur la ville
