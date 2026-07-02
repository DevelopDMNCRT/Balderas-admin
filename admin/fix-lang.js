const fs = require('fs');
const path = './src/components/calendar/calendar-view.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace state defaults
content = content.replace(/useState\("all"\)/g, 'useState("todos")');
content = content.replace(/useState\("month"\)/g, 'useState("mensual")');

// Replace view strings
content = content.replace(/"month"/g, '"mensual"');
content = content.replace(/"week"/g, '"semanal"');
content = content.replace(/"day"/g, '"diaria"');

// Replace 'all' in SelectItem and filter logic
content = content.replace(/"all"/g, '"todos"');

fs.writeFileSync(path, content);
console.log('Language strings replaced');
