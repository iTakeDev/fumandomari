const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync(require.resolve('../web/motion.js'), 'utf8');

function boot(stored, blocked = false) {
  const root = {dataset:{}}, changes = [];
  const storage = {getItem(){ if (blocked) throw Error(); return stored; }, setItem(key,value){ if(blocked) throw Error(); stored=value; }};
  const scope = {window:{},document:{documentElement:root},localStorage:storage};
  vm.runInNewContext(source,scope);
  const motion=scope.window.SiteMotion;
  motion.addEventListener('change',event=>changes.push(event.matches));
  return {motion,root,changes,stored:()=>stored};
}

test('full animation is the default; changing mode notifies all effects and persists',()=>{
  const page=boot(null);
  assert.equal(page.motion.matches,false);
  assert.equal(page.root.dataset.motion,'full');
  page.motion.setReduced(true);
  page.motion.setReduced(false);
  assert.deepEqual(page.changes,[true,false]);
  assert.equal(page.stored(),'full');
  assert.equal(boot('reduced').motion.matches,true);
});

test('blocked browser storage cannot break the intro or interactive animation mode',()=>{
  const page=boot(null,true);
  assert.equal(page.motion.matches,false);
  page.motion.setReduced(true);
  assert.equal(page.root.dataset.motion,'reduced');
  assert.deepEqual(page.changes,[true]);
});
