/* module1/module1.js
   Shared Module1 logic: load user, save module progress, badges
*/

const M1 = (function(){
  const KEY_USER = "vq_user";
  const KEY_SCORES = "vq_scores";
  const KEY_BADGES = "vq_badges";

  function loadUser(){ try{ return JSON.parse(localStorage.getItem(KEY_USER)) }catch(e){return null} }
  function saveUser(u){ localStorage.setItem(KEY_USER, JSON.stringify(u)) }
  function ensureUser(name, klass){ const u = {name, class:klass, created:new Date().toISOString()}; saveUser(u); return u }
  function loadScores(){ return JSON.parse(localStorage.getItem(KEY_SCORES) || '{"module1":0}' ) }
  function saveScores(s){ localStorage.setItem(KEY_SCORES, JSON.stringify(s)) }
  function awardBadge(id){ const b = JSON.parse(localStorage.getItem(KEY_BADGES)||'[]'); if(!b.includes(id)){ b.push(id); localStorage.setItem(KEY_BADGES, JSON.stringify(b)); } }
  function getBadges(){ return JSON.parse(localStorage.getItem(KEY_BADGES)||'[]') }

  return { loadUser, ensureUser, saveUser, loadScores, saveScores, awardBadge, getBadges }
})();
