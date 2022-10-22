interface RandomNumberGeneratorRepository {
  generateRandomNumber: (min: number, max: number) => Promise<number>
}
export { RandomNumberGeneratorRepository }
