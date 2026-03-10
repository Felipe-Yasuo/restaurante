export function formatPrice(cents: number) {
    const reais = cents / 100;

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(reais);
}
