const fs = require('fs')

filePaths = ['docs/api.md', 'docs/buy_pro.md', 'docs/donate.md', 'docs/guide.md', 'docs/source.md', 'docs/README.md', 'docs/transpile.md', 
'docs/zh/api.md', 'docs/zh/buy_pro.md', 'docs/zh/donate.md', 'docs/zh/guide.md', 'docs/zh/README.md', 'docs/zh/transpile.md', 
]
for (const filePath of filePaths) {
  str = fs.readFileSync(filePath).toString()
  m = str.match(/\[.+?\]\(.*?\)/g)
  if (m) {
    m.forEach(m2 => {
      m3 = m2.match(/(#.+?)\)/)
      if (m3 && m3[1]) {
        l = m3[1].toLowerCase()
        if (l !== m3[1]) {
          console.log(filePath, m3[1], l);
        }
      }
    }) 
  }
}
