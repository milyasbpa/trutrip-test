import fs from "fs";
import path from "path";
import csv from "csv-parser";

type Row = {
  namespace: string;
  key: string;
  [lang: string]: string;
};

const inputCsvPath = path.resolve(
  process.cwd(),
  "src/core/i18n/csv/translations.csv"
);
const outputBasePath = path.resolve(process.cwd(), "src/core/i18n/locales");
const resourceOutputPath = path.resolve(
  process.cwd(),
  "src/core/i18n/resources/resources.ts"
);

const namespaces: Record<string, Record<string, Record<string, string>>> = {};

fs.createReadStream(inputCsvPath)
  .pipe(csv())
  .on("data", (row: Row) => {
    const { namespace, key, ...langs } = row;
    Object.entries(langs).forEach(([lang, value]) => {
      namespaces[lang] ??= {};
      namespaces[lang][namespace] ??= {};
      namespaces[lang][namespace][key] = value;
    });
  })
  .on("end", () => {
    // Step 1: Cleanup previous JSONs
    if (fs.existsSync(outputBasePath)) {
      fs.readdirSync(outputBasePath).forEach((lang) => {
        const langDir = path.join(outputBasePath, lang);
        if (fs.statSync(langDir).isDirectory()) {
          fs.readdirSync(langDir).forEach((file) => {
            if (file.endsWith(".json")) {
              fs.unlinkSync(path.join(langDir, file));
            }
          });
        }
      });
    }

    // Step 2: Write new JSONs
    Object.entries(namespaces).forEach(([lang, nsObj]) => {
      const langDir = path.join(outputBasePath, lang);
      fs.mkdirSync(langDir, { recursive: true });

      Object.entries(nsObj).forEach(([ns, translations]) => {
        const filePath = path.join(langDir, `${ns}.json`);
        fs.writeFileSync(filePath, JSON.stringify(translations, null, 2));
      });
    });

    // Step 3: Generate resources.ts
    let imports = "";
    let resourceObj = "export const resources = {\n";

    Object.entries(namespaces).forEach(([lang, nsObj]) => {
      resourceObj += `  ${lang}: {\n`;

      Object.keys(nsObj).forEach((ns) => {
        const varName = `${lang}_${ns}`;
        const relativePath = `../locales/${lang}/${ns}.json`;

        imports += `import ${varName} from '${relativePath}';\n`;
        resourceObj += `    ${ns}: ${varName},\n`;
      });

      resourceObj += "  },\n";
    });

    resourceObj += "} as const;\n\n";
    resourceObj += "export type Resources = typeof resources;\n";

    fs.writeFileSync(resourceOutputPath, imports + "\n" + resourceObj);

    console.log("✅ Translations synced & resources.ts generated");
  });
