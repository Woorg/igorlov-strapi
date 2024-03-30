import fs from 'fs';
import matter from 'gray-matter';

const args = process.argv;

if (args && args.length > 0 && args[3]) {
	const filePath = args[3];

	// Read the file
	const file = fs.readFileSync(filePath, 'utf-8');

	// Parse the file content
	const parsed = matter(file);
	let { content } = parsed;

	// Regular expression to match image links in Markdown format ![alt text](image_url)
	const imageRegex = /!\[([^[\]]*?)\]\((.*?)\)/g;

	// Replace URLs within parentheses of image links with references to assets/images
	content = content.replace(imageRegex, (match, altText, captureGroup) => {
		// Extract the image file name from the URL
		const imageName = captureGroup.split('/').pop();
		// Replace the URL within parentheses with the assets/images reference
		return `![${altText}](../../assets/images/${imageName})`;
	});

	// Update the front matter with the modified content
	const updatedFile = matter.stringify(content, parsed.data);

	// Write the updated content back to the file
	fs.writeFileSync(filePath, updatedFile);
}
