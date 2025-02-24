import fs from 'fs';
import matter from 'gray-matter';
import axios from 'axios';

const args = process.argv;

if (args && args.length > 0 && args[3]) {
    const filePath = args[3];
    let fileContent = fs.readFileSync(filePath, 'utf-8');
    const parsed = matter(fileContent);
    let { content, data } = parsed;
    let translatedPosition = data.translatedPosition || 0;

    // Split the content into paragraphs
    const paragraphs = content.split('\n\n');

    // If all paragraphs are already translated, exit the script
    if (translatedPosition >= paragraphs.length) {
        console.log('All paragraphs have been translated.');
    } else {
        // Begin translation from the last translated position
        async function translateParagraph(paragraphIndex) {
            const paragraphToTranslate = paragraphs[paragraphIndex];
            try {
                const response = await axios.post('http://127.0.0.1:1188/translate', {
                    target_lang: 'ru',
                    text: paragraphToTranslate,
                });

                const translatedParagraph = response.data.data;
                // Append the translation next to the original paragraph
                content = content.replace(
                    paragraphToTranslate,
                    paragraphToTranslate + '\n\n' + translatedParagraph
                );

                console.log(`Translated and updated file at position ${paragraphIndex}`);
            } catch (error) {
                console.error('Translation error:', error.message);
            }
        }

        async function translateWithDelay() {
            for (let i = translatedPosition; i < paragraphs.length; i++) {
                await translateParagraph(i);
                // Update the translated position
                data.translatedPosition = i + 1;
                fs.writeFileSync(filePath, matter.stringify(content, data));
                // Pause for 2 seconds before translating the next paragraph
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
        }

        translateWithDelay();
    }
}
