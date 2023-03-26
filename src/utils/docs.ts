import fs from "fs";
import path from "path";

export const getDocPath = (docname: string) => {
    return path.join(process.cwd(), `src/docs/${docname}.md`)
}

export const getFileContent = (docname: string) => {
    const DOC_PATH = getDocPath(docname)
    return fs.readFileSync(DOC_PATH, "utf8");
};