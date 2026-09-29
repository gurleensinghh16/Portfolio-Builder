import JSZip from "jszip";

async function imageToDataUrl(src: string): Promise<string> {
  if (!src || src.startsWith("data:")) {
    return src;
  }

  try {
    const response = await fetch(src);
    const blob = await response.blob();

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result as string);
      };

      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return "";
  }
}

function getTemplateCSS(template: string): string {
  const pageClass = `${template}-page`;

  for (const sheet of Array.from(document.styleSheets)) {
    try {
      const rules = Array.from(sheet.cssRules);
      const css = rules.map((rule) => rule.cssText).join("\n");

      if (css.includes(`.${pageClass}`)) {
        return css;
      }
    } catch {
      // Ignore stylesheets that the browser does not allow us to read.
    }
  }

  return "";
}

export async function downloadPortfolio() {
  const template =
    localStorage.getItem("selectedTemplate") || "modern";

  const portfolio = document.querySelector(
    ".portfolio-preview-page"
  );

  if (!portfolio) {
    alert("Portfolio preview not found.");
    return;
  }

  const clonedPortfolio = portfolio.cloneNode(
    true
  ) as HTMLElement;

  // Convert profile images into embedded data URLs
  // so they continue working after the ZIP is downloaded.
  const originalImages = portfolio.querySelectorAll("img");
  const clonedImages = clonedPortfolio.querySelectorAll("img");

  for (let i = 0; i < clonedImages.length; i++) {
    const originalSrc = originalImages[i]?.getAttribute("src");

    if (originalSrc) {
      const dataUrl = await imageToDataUrl(originalSrc);

      if (dataUrl) {
        clonedImages[i].setAttribute("src", dataUrl);
      }
    }
  }

  const css = getTemplateCSS(template);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>${portfolio
    ? document.title || "My Portfolio"
    : "My Portfolio"}</title>

  <link rel="stylesheet" href="style.css" />
</head>

<body>

${clonedPortfolio.innerHTML}

<script src="script.js"></script>

</body>
</html>`;

  const script = `
// Portfolio source code exported from FolioBuilder

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});
`;

  const readme = `# Portfolio

This portfolio was created using FolioBuilder.

## Files

- index.html — Portfolio structure
- style.css — Portfolio styling
- script.js — Portfolio interactions

## Template

${template}

## Usage

Open index.html in a browser.

No build step is required.
`;

  const zip = new JSZip();

  zip.file("index.html", html);
  zip.file("style.css", css);
  zip.file("script.js", script);
  zip.file("README.md", readme);

  const content = await zip.generateAsync({
    type: "blob",
  });

  const url = URL.createObjectURL(content);

  const link = document.createElement("a");

  link.href = url;
  link.download = `${template}-portfolio.zip`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}