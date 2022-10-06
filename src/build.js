const fs = require("node:fs/promises");
const path = require('node:path');
const marked = require("marked");
const chokidar = require("chokidar");

let lastbuild;

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



async function getH1(file) {
    const fileContents = (await fs.readFile(file)).toString();
    const headers = fileContents.match(/\#.*/g);
    if (!headers) return file;
    return headers[0].replace(/^\#\s+/g, "");
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
    },
    ".html": async (file, stats) => {
        let fileContents = (await fs.readFile(file)).toString();
        if (fileContents.match(/<!--LISTDIR-->/g) !== null) {
            const files = await fs.readdir(path.dirname(file));
            const mdFiles = files.filter(file => path.extname(file) == ".md");
            const mdFilesAndHeaders = await Promise.all(mdFiles.map(async f => {
                return {
                    htmlFile: path.parse(f).name + ".html",
                    h1: await getH1(path.join(path.dirname(file), f))
                }
            }))

            fileContents = fileContents.replace(/<!--LISTDIR-->/g, e => {
                return `<ul>${
                    mdFilesAndHeaders
                    .map(s => `<li><a href=${s.htmlFile}>${s.h1}</a></li>`)
                    .join("\n")
                }</ul>`
            });
        }
        return {
            contents: fileContents,
            newName: path.parse(file).base
        };
    }
};



(async () => {
    const lastbuildFile = "lastbuild.json";
    try {
        lastbuild = JSON.parse((await fs.readFile(lastbuildFile)).toString())
    } catch {
        lastbuild = {
            time: 0
        };
        fs.writeFile(lastbuildFile, JSON.stringify(lastbuild));
    }


    await recursiveReaddir(src, (file, stats) => {
        (async () => {
            const relativePath = path.join(dst, path.relative(src, file));
            if (stats.isDirectory()) {
                try {
                    await fs.mkdir(relativePath);
                } catch {

                }
            } else {
                if (stats.mtimeMs >= lastbuild.time) {
                    const transformer = transformers[path.extname(file)];
                    if (transformer) {
                        const transformedFile = await transformer(file, stats);
                        await fs.writeFile(path.join(path.dirname(relativePath), transformedFile.newName), transformedFile.contents);
                    } else {
                        await fs.copyFile(file, relativePath);
                    }
                    console.log("Copied file: " + file);
                }
            }
        })();
    });


    fs.writeFile(lastbuildFile, JSON.stringify({
        time: Date.now()
    }));
})();