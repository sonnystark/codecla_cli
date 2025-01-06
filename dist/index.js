"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const inquirer_1 = __importDefault(require("inquirer"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Initialize Commander
const program = new commander_1.Command();
// Define the CLI command
program
    .name("code-cli")
    .description("CLI tool to generate boilerplate code for challenges")
    .version("1.0.0")
    .requiredOption("-n, --name <functionName>", "Function name")
    .requiredOption("-l, --language <language>", "Programming language (javascript or python)")
    .requiredOption("-i, --inputs <inputs>", "Comma-separated list of function inputs")
    .action((options) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, language, inputs } = options;
    const inputList = inputs.split(",");
    // Validate language
    if (!["javascript", "python"].includes(language)) {
        console.error("Error: Supported languages are javascript and python.");
        process.exit(1);
    }
    // Confirmation Prompt
    const confirmation = yield (0, inquirer_1.default)([
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
    // Generate Boilerplate
    let boilerplate = "";
    if (language === "python") {
        boilerplate = `def ${name}(${inputList.join(",")}):
    # Your code here
    return`;
    }
    else if (language === "javascript") {
        boilerplate = `function ${name}(${inputList.join(",")}) {
    // Your code here
    return;
}`;
    }
    // Determine file extension
    const fileExtension = language === "python" ? "py" : "js";
    const fileName = `${name}.${fileExtension}`;
    const filePath = path.join(process.cwd(), fileName);
    // Write to file
    fs.writeFileSync(filePath, boilerplate);
    console.log(`Boilerplate code generated and saved to ${filePath}`);
}));
// Parse CLI arguments
program.parse(process.argv);
//# sourceMappingURL=index.js.map