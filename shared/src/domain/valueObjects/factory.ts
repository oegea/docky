import { UserIdValueObject } from './UserIdValueObject'

const userIdValueObject = async({
  userId
}: {
  userId: string
}): Promise<UserIdValueObject> => {
  const userIdValueObject = new UserIdValueObject({
    userId
  })

  return userIdValueObject
}

export { userIdValueObject }
