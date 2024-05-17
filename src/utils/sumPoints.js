export default function sumPoints(cards) {
  if (!cards) return
  let cardsReformados = cards
  cards.map((card, index) => {
    if (card.value === 'ACE') cardsReformados[index].value = 1
    if (card.value === 'JACK') cardsReformados[index].value = 10
    if (card.value === 'QUEEN') cardsReformados[index].value = 10
    if (card.value === 'KING') cardsReformados[index].value = 10
  })
  return cardsReformados.reduce(
    (total, card) => total + parseInt(card.value),
    0
  )
}
