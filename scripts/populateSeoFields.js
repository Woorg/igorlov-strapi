import fs from 'fs';
import matter from 'gray-matter';

const args = process.argv;

if (args && args.length > 0 && args[3]) {
	const filePath = args[3];
	const file = fs.readFileSync(filePath, 'utf-8');

	const parsed = matter(file);
	const { content } = parsed;

	// Get existing meta_title and description or default values
	let existingMetaTitle = (parsed.data.meta_title || '').trim();
	let existingDescription = (parsed.data.description || '').trim();

	// Check if meta_title is empty or doesn't exist and update only if empty
	if (!existingMetaTitle) {
		existingMetaTitle = `${(parsed.data.title || 'Untitled').trim()} | Игорь Горлов - Fullstack Web Developer`;
		parsed.data.meta_title = existingMetaTitle;
	}

	// Always update description with the first 160 characters from content and trim
	existingDescription = content.slice(0, 160).trim();
	parsed.data.description = existingDescription.replace(/[><"'=+-]/g, '');

	// Convert back to a string with updated front matter
	const updatedFile = matter.stringify(content, parsed.data);

	// Write back to the file
	fs.writeFileSync(filePath, updatedFile);
}
