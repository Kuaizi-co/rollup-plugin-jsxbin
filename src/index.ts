const fs = require('fs');
const path = require('path');
const os = require('os');
const jsxbin = require('jsxbin');

export default function jsxbinRollup() {
  const name:string = 'jsxbin';
  return {
    name,
    async renderChunk(code: string) {
      const rand = Date.now()
      const tmpJSXFile: string = path.join(os.tmpdir(), `jsxbin-tmp-${rand}.jsx`);
      const tmpJSXBinFile: string = path.join(os.tmpdir(), `jsxbin-tmp-${rand}.jsxbin`);

      if (fs.existsSync(tmpJSXFile)) {
        fs.unlinkSync(tmpJSXFile);
      }
      if (fs.existsSync(tmpJSXBinFile)) {
        fs.unlinkSync(tmpJSXBinFile);
      }

      fs.writeFileSync(tmpJSXFile, code);
      console.log(`tmpJSXFile`, tmpJSXFile)
      console.log(`tmpJSXBinFile`, tmpJSXBinFile)

      await jsxbin(tmpJSXFile, tmpJSXBinFile);

      const jsxContents: string = fs.readFileSync(tmpJSXBinFile, 'utf8');
      console.log(jsxContents)
      // fs.unlinkSync(tmpJSXBinFile);

      return { code: jsxContents };
    }
  }
}
