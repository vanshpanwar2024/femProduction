const fs = require('fs');
const content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

const newContent = content.replace(
  `import { useState, useEffect, useRef } from "react";`,
  `import { useState, useEffect, useRef } from "react";\nimport { Menu, X } from "lucide-react";`
);

if (newContent !== content) {
  fs.writeFileSync('src/components/Navbar.tsx', newContent);
  console.log('patched imports');
}
