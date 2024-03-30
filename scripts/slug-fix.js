import fs from 'fs';
import matter from 'gray-matter';
import urlSlug from 'cyr2lat-translit';

const [, , , filePath] = process.argv;

if (filePath) {
	const file = fs.readFileSync(filePath, 'utf-8');
	const parsed = matter(file);
	const { content } = parsed;

	let existingSlug = (parsed.data.slug || '').trim();
	let existingTitle = (parsed.data.title || '').trim();

	if (!existingSlug && existingTitle) {
		existingSlug = urlSlug(existingTitle).trim();
		parsed.data.slug = existingSlug;
	}

	const updatedFile = matter.stringify(content, parsed.data);

	fs.writeFileSync(filePath, updatedFile);
}
