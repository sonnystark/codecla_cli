import { Command } from "commander";
import prompt from "inquirer";
import * as fs from "fs";
import * as path from "path";

// INITIALIZE COMMANDER
const program = new Command();

// DEFINE CLI COMMAND
program
  .name("code-cli")
  .description("CLI tool to generate boilerplate code for challenges")
  .version("1.0.0")
  .requiredOption("-n, --name <functionName>", "Function name")
  .requiredOption(
    "-l, --language <language>",
    "Programming language (javascript or python)"
  )
  .requiredOption(
    "-i, --inputs <inputs>",
    "Comma-separated list of function inputs"
  )
  .action(async (options) => {
    const { name, language, inputs } = options;
    const inputList: string[] = inputs.split(",");

    // LANGUAGE VALIDATION
    if (!["javascript", "python"].includes(language)) {
      console.error("Error: Supported languages are javascript and python.");
      process.exit(1);
    }

    // CONFIRMATION PROMPT
    const confirmation = await prompt.prompt([
      {
        type: "confirm",
        name: "confirmGenerate",
        message: `Generate boilerplate code for the function ${name} in ${language}?`,
        default: true,
      },
    ]);

    if (!confirmation.confirmGenerate) {
      console.log("Operation cancelled.");
      process.exit(0);
    }

    // BOILERPLATE GENERATION
    let boilerplate = "";
    if (language === "python") {
      boilerplate = `def ${name}(${inputList.join(",")}):
    # Your code here
    return`;
    } else if (language === "javascript") {
      boilerplate = `function ${name}(${inputList.join(",")}) {
    // Your code here
    return;
}`;
    }

    // DETERMINE FILE EXTENSION
    const fileExtension = language === "python" ? "py" : "js";
    const fileName = `${name}.${fileExtension}`;
    const filePath = path.join(process.cwd(), fileName);

    // WRITE TO FILE
    fs.writeFileSync(filePath, boilerplate);
    console.log(`Boilerplate code generated and saved to ${filePath}`);
  });

program.parse(process.argv);
