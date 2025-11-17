// Save name and class
function saveStudentInfo() {
    const name = document.getElementById("studentName").value;
    const grade = document.getElementById("studentClass").value;

    if (!name || !grade) {
        alert("Please enter your name and class!");
        return;
    }

    localStorage.setItem("studentName", name);
    localStorage.setItem("studentClass", grade);

    window.location.href = "module1.html";
}

// Load student name on each page
function loadStudentName() {
    const name = localStorage.getItem("studentName");
    if (name) {
        document.getElementById("welcomeUser").textContent = name;
    }
}

// Save score for modules
function saveScore(module, score) {
    localStorage.setItem(module + "-score", score);
}

// Get score
function getScore(module) {
    return localStorage.getItem(module + "-score") || 0;
}

// Award badges
function awardBadge(badgeName) {
    localStorage.setItem("badge-" + badgeName, "earned");
}
