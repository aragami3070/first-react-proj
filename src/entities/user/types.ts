export type User = {
  id: number,
  email: string,
  firstName: string,
  secondName: string,
}

export type UserDto = {
  Id: number,
  Email: string,
  FirstName: string,
  SecondName: string,
}

export const mapUser = (dto: UserDto): User => ({
  id: dto.Id,
  email: dto.Email,
  firstName: dto.FirstName,
  secondName: dto.SecondName,
})
