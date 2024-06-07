import fs from 'fs';
import matter from 'gray-matter';
import axios from 'axios';

const chunkSize = 4999;
const pauseBetweenRequests = 3000;

const args = process.argv;

if (args && args.length > 0 && args[3]) {
	const filePath = args[3];
	let fileContent = fs.readFileSync(filePath, 'utf-8');
	const parsed = matter(fileContent);
	let { content, data } = parsed;
	let translatedPosition = data.translatedPosition || 0;
	const chunks = [];

	while (translatedPosition < content.length) {
		const remainingContent = content.substring(translatedPosition);
		const chunk = remainingContent.substring(0, chunkSize);
		chunks.push(chunk);
		translatedPosition += chunk.length;
	}

	async function translateChunks() {
		for (let i = 0; i < chunks.length; i++) {
			try {
				const response = await axios.post('http://127.0.0.1:1188/translate', {
					// source_lang: 'en',
					target_lang: 'ru',
					text: chunks[i],
				});

				const translatedChunk = response.data.data;
				data.translatedPosition = translatedPosition;
				fileContent = fileContent.replace(chunks[i], translatedChunk);
				fs.writeFileSync(filePath, fileContent);

				console.log(`Translated and updated file at position ${translatedPosition}`);
				await new Promise((resolve) => setTimeout(resolve, pauseBetweenRequests));
			} catch (error) {
				console.error('Translation error:', error.message);
			}
		}
	}

	translateChunks();
}
