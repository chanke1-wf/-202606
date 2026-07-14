const fs = require('fs');
const current = fs.readFileSync('src/data.ts', 'utf8');
console.log(current.includes('あなたはご自愛習慣が完全に日常になっている、'));
