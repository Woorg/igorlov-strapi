import fs from 'fs';
import matter from 'gray-matter';

const args = process.argv;

if (args && args.length > 0 && args[3]) {
	const filePath = args[3];

	// Чтение файла
	const file = fs.readFileSync(filePath, 'utf-8');

	// Парсинг содержимого файла
	const parsed = matter(file);
	let { content } = parsed;

	// Регулярное выражение для замены обратных кавычек, не внутри текста
	const regex = /`(?=(?:[^"]|"[^"]*")*$)(?=(?:[^']|'[^']*')*$)/g;

	// Замена обратных кавычек
	content = content.replace(regex, '```');

	// Обновление содержимого front matter
	const updatedFile = matter.stringify(content, parsed.data);

	// Запись обратно в файл
	fs.writeFileSync(filePath, updatedFile);
}
