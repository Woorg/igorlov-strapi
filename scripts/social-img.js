//@ts-check
import { format, parseJSON } from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
import nodeHtmlToImage from 'node-html-to-image';
import { v4 as uuid } from 'uuid';

const html = `
<html>
  <head>
    <style>
      body {
        width: 1120px;
        height: 580px;
      }
    </style>

    <!-- Include external CSS, JavaScript or Fonts! -->
    <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
     <script>
      tailwind.config = {
          mode: 'jit',
      }
    </script>
  </head>
  <body>
    <div class="card flex flex-col justify-center h-full w-full overflow-hidden bg-sky-100 font-medium rounded-3xl">
      <div class="px-20 py-20 flex flex-col h-full justify-between text-white text-center">
        <h1 class="font-sans text-black font-bold text-6xl mb-5">
        {title}
        </h1>
        <div class="meta mb-12 text-black text-xl">
          <span class="font-medium">
            {date}
          </span>
        </div>

        <div class="m-auto flex items-center justify-center overflow-hidden w-28 h-24 flex-shrink-0 aspect-square object-contain object-center rounded-full" >
          <img src="https://igorlov.ru/assets/images/avatar-new.png" class="block  w-full h-full">
        </div>

        <div class="text-black mt-5 mb-3 text-xl flex justify-center gap-6">
          <h4 class="text-black text-xl flex gap-2 items-center"><img class="max-h-[16px]" src="https://cdn-0.emojis.wiki/emoji-pics/google/man-google.png" alt="Man on Google" decoding="async" loading="lazy" />Igor Gorlov</h4>
          <span class="text-black gap-2 text-xl flex items-center "><img class="max-h-[16px]" src="https://cdn-0.emojis.wiki/emoji-pics/apple/speech-balloon-apple.png" alt="Speech Balloon on Apple" decoding="async" loading="lazy"/> telegram: @gorlovfullstack</span>
        </div>
      </div>
    </div>

  </body>
</html>
`;

const args = process.argv;

const workspace = args[2];
const filePath = args[3];
let fileContent = fs.readFileSync(filePath, 'utf-8');

// console.log(filePath);

const parsed = matter(fileContent);
let { content, data } = parsed;

if (data.title && data.date) {
	const parsedHtml = html
		.replace(`{title}`, data.title)
		.replace(`{slug}`, data.slug)
		.replace(`{tags}`, data.tags)
		.replace(`{categories}`, data.categories)
		.replace(`{date}`, format(parseJSON(data.date), 'MMM dd, yyyy'));
	const fileName = `${data.slug}.avif`;
	// @ts-ignore

	// console.log(fileName);

	nodeHtmlToImage({
		output: `${workspace}/src/assets/images/${fileName}`,
		html: parsedHtml,
	})
		.then(() => {
			const updatedFile = matter.stringify(content, {
				...data,
				image: `../../assets/images/${fileName}`,
			});

			console.log(updatedFile);

			fs.writeFileSync(filePath, updatedFile);
		})
		.catch((e) => console.log(e?.message || e));
}
