const fs = require("node:fs/promises");
const path = require('node:path');
const marked = require("marked");

async function recursiveReaddir(dir, callback) {
    const files = await fs.readdir(dir);
    files.forEach(async file => {
        const filepath = path.join(dir, file);
        const stats = await fs.stat(filepath);
        callback(filepath, stats);
        if (stats.isDirectory()) {
            recursiveReaddir(filepath, callback);
        }
    });
}


const src = "site";
const dst = "../pages";



function getConfigComment(str) {
    const comment = str.match(/^<!--[\w\W]*-->/g);
    if (comment === null) return {};
    return Object.fromEntries(comment[0].slice(4,-3).split(";").map(s=>s.split("=")).slice(0,2));
}



async function insertTemplate(input, inputPath, templatePath) {
    const template = (await fs.readFile(path.join(path.dirname(inputPath), templatePath))).toString();
    return template.replace(/<!--CONTENT-->/g, input);
}





const transformers = {
    ".md": async (file, stats) => {
        const fileContents = (await fs.readFile(file)).toString();
        const config = getConfigComment(fileContents);
        const parsedMarkdownHTML = await marked.marked((fileContents));
        return {
            contents: config.template ? await insertTemplate(parsedMarkdownHTML, file, config.template) : parsedMarkdownHTML,
            newName: path.parse(file).name + ".html"
        };
    }
};



(async () => {
    recursiveReaddir(src, (file, stats) => {
        (async () => {
            const relativePath = path.join(dst, path.relative(src, file));
            if (stats.isDirectory()) {
                try {
                    await fs.mkdir(relativePath);
                } catch {

                }
            } else {
                const transformer = transformers[path.extname(file)];
                if (transformer) {
                    const transformedFile = await transformer(file, stats);
                    await fs.writeFile(path.join(path.dirname(relativePath), transformedFile.newName), transformedFile.contents);
                } else {
                    await fs.copyFile(file, relativePath);
                }
            }
            console.log("Copied file: " + file);
        })();
    });
})();