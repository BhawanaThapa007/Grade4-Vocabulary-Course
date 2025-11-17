/* script.js - shared site logic: user, progress, leaderboard, badges */
const Site = (function(){
  const KEY_USER = "vq_user";
  const KEY_SCORES = "vq_scores";
  const KEY_LEADER = "vq_leaderboard";

  function saveUser(obj){
    localStorage.setItem(KEY_USER, JSON.stringify(obj));
  }
  function loadUser(){
    const s = localStorage.getItem(KEY_USER);
    return s ? JSON.parse(s) : null;
  }

  function saveScores(scores){
    localStorage.setItem(KEY_SCORES, JSON.stringify(scores));
  }
  function loadScores(){
    const s = localStorage.getItem(KEY_SCORES);
    return s ? JSON.parse(s) : {module1:0,module2:0,module3:0};
  }

  function addToLeaderboard(entry){
    let lb = JSON.parse(localStorage.getItem(KEY_LEADER) || "[]");
    lb.push(entry);
    // keep top 50 by score desc
    lb.sort((a,b)=>b.total - a.total);
    lb = lb.slice(0,50);
    localStorage.setItem(KEY_LEADER, JSON.stringify(lb));
  }
  function loadLeaderboard(){ return JSON.parse(localStorage.getItem(KEY_LEADER) || "[]"); }

  function ensureUser(name,klass){
    const user = {name:name, class:klass, created: new Date().toISOString(), badges:[]};
    saveUser(user);
    return user;
  }

  function giveBadge(badgeId){
    const u = loadUser();
    if(!u) return;
    if(!u.badges.includes(badgeId)) {
      u.badges.push(badgeId);
      saveUser(u);
    }
  }

  return {saveUser, loadUser, ensureUser, saveScores, loadScores, addToLeaderboard, loadLeaderboard, giveBadge};
})();
