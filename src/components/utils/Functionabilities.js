export const wait = delay_amount_ms =>
        new Promise(resolve => setTimeout(() => resolve("delayed"), delay_amount_ms))