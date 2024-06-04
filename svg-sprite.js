const fs = require('fs');
const path = require('path');
const { optimize } = require('svgo');

const svgDir = path.join(__dirname, 'src/assets/icons');
const outputDir = path.join(__dirname, 'public');
const outputFile = path.join(outputDir, 'sprite.svg');

const svgSprite = async () => {
  const files = fs.readdirSync(svgDir).filter(file => file.endsWith('.svg'));

  let spriteContent = '<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">\n';

  for (const file of files) {
    const filePath = path.join(svgDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    const { data } = optimize(content, {
      path: filePath,
      plugins: [
        {
          name: 'cleanupIDs',
          params: {
            prefix: `icon-${path.basename(file, '.svg')}-`,
          },
        },
      ],
    });

    spriteContent += data.replace('<svg', `<symbol id="icon-${path.basename(file, '.svg')}"`).replace('</svg>', '</symbol>\n');
  }

  spriteContent += '</svg>';

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  fs.writeFileSync(outputFile, spriteContent, 'utf-8');
  console.log(`SVG sprite generated at ${outputFile}`);
};

svgSprite();