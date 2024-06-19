export const parseCurrencyValue = (currencyString: string) => {
    // Remove o "R$ " e quaisquer espaços em branco ao redor
    const cleanedString = currencyString
        .replace(/[^\d.,]/g, "")
        .replace(",", ".")
        .trim();
    // Verifica se o valor está na forma "x,xxx,xxx" (por exemplo, 1.500.000)
    if (cleanedString.includes(".")) {
        // Remove todos os pontos
        const stringWithoutDots = cleanedString.replace(/\./g, "");
        // Converte para float
        return parseFloat(stringWithoutDots);
    } else {
        // Converte para float diretamente
        return parseFloat(cleanedString);
    }
};
