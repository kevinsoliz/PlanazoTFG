import { log } from "./logger";

export function greet(name: string): string {
    log(`greeting ${name}`);
    return `Hola ${name}`;
}