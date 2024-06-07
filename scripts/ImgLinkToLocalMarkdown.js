// ...

// Function to convert image links to local file links
async function convertImageLinksToMarkdown(filePath, workspace) {
	try {
		const fileContent = fs.readFileSync(filePath, 'utf-8');

		// Regular expression to find image links in Markdown format ![alt text](image_url)
		const regex = /!\[.*\]\((.*?)\)/g;
		const updatedContent = fileContent.replace(regex, async (match, captureGroup) => {
			// Check if the image link is an external URL
			if (captureGroup.startsWith('http')) {
				// Create the local directory if it doesn't exist
				const imagesDir = path.join(workspace, 'src', 'assets', 'images');
				if (!fs.existsSync(imagesDir)) {
					fs.mkdirSync(imagesDir, { recursive: true });
				}

				// Extract the image file name from the URL
				const imageName = captureGroup.split('/').pop();
				const localImagePath = path.join(imagesDir, imageName);

				// Download image from the URL and save it locally
				await downloadImage(captureGroup, localImagePath);

				// Return the local file link
				return `![${imageName}](${path.relative(path.dirname(filePath), localImagePath)})`;
			}
			// Return the original link if it's already a local file link
			return match;
		});

		// Update the Markdown file with converted links
		fs.writeFileSync(filePath, updatedContent, 'utf-8');
		console.log('Image links converted to local file links successfully.');
	} catch (error) {
		console.error('Error:', error);
	}
}

// Usage: node Img_link_to_local_markdown.js <path_to_markdown_file> <workspace_directory>
const args = process.argv;
if (args.length > 3) {
	const markdownFilePath = args[2];
	const workspace = args[3];
	convertImageLinksToMarkdown(markdownFilePath, workspace);
} else {
	console.error('Please provide the path to the Markdown file and the workspace directory.');
}
