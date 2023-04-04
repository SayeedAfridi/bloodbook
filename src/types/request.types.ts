import { BloodGroup, User } from './auth.types'

export type BloodRequest = {
  bloodGroup: BloodGroup
  user: User
  phone: number
  address: string
  id: string
}

export type Campaign = {
  id: string
  title: string
  startDate: string
  endDate: string
  image: string
  createdBy: User
  location: string
}
