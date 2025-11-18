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
// ===== VQ Shared Utilities =====
function getCurrentUser(){
  const name = localStorage.getItem('vq_user_name') || null;
  const key = localStorage.getItem('vq_user_key') || (name ? name.replace(/\s+/g,'_').toLowerCase() : null);
  return { name, key };
}

// Save per-user score to leaderboard. moduleId like 'module1'
function saveScoreToLeaderboard(moduleId, score){
  if(!moduleId) return;
  const user = getCurrentUser();
  const name = user.name || 'Anonymous';
  const key = user.key || ('anon_' + Date.now());
  const KEY = 'vq_leaderboard_v1';
  const raw = localStorage.getItem(KEY);
  const board = raw ? JSON.parse(raw) : [];

  let entry = board.find(e => e.key === key);
  if(!entry){
    entry = { name, key, moduleScores: {}, best: score, updated: Date.now() };
    board.push(entry);
  }
  entry.moduleScores[moduleId] = score;
  entry.best = Math.max(entry.best || 0, score);
  entry.updated = Date.now();

  localStorage.setItem(KEY, JSON.stringify(board));
}

// Unlock a badge for current user. badgeId should match DOM id on badges.html
function unlockBadge(badgeId){
  const user = getCurrentUser();
  if(!user.key) return;
  const BADGE_KEY = `vq_badges_${user.key}`;
  const raw = localStorage.getItem(BADGE_KEY);
  const badges = raw ? JSON.parse(raw) : {};
  badges[badgeId] = { unlocked: true, time: Date.now() };
  localStorage.setItem(BADGE_KEY, JSON.stringify(badges));
  // notify badge UI (if open)
  window.dispatchEvent(new CustomEvent('badgeUnlocked', { detail:{ badgeId } }));
}

