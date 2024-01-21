interface ClientIPAddressRepository {
    get: () => Promise<string>
}
export { ClientIPAddressRepository }
  