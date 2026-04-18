
export function suma (a: number, b: number): number{
    return a + b;
}


export async function sumaAsync (a: number, b: number): Promise<number> {
    await new Promise(resolve => setTimeout(resolve, 50));
    return a + b;
}

export function divideMod(a: number, b: number): { quotient: number, remainder: number} {
    return {quotient: Math.floor(a/b), remainder: a % b};
}

export function runTwice(callback: (n: number) => number): number {
    return callback(1) + callback(10);
}