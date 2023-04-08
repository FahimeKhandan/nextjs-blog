import fs from 'fs';
import path, { basename } from 'path';
import matter from 'gray-matter';
import { log } from 'console';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData(mdFiles) {
    // Get file names under /posts
    //   const fileNames = fs.readdirSync(postsDirectory);
    //   const files = fileNames.filter( ( elm ) => elm.match(/.*\.(md?)/ig));
    const allPostsData = mdFiles.map((fullPath) => {
        let fileName = path.basename(fullPath)
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return {
            id,
            ...matterResult.data,
            fileContents
        };
    });
    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}