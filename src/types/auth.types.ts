export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-'
export type User = {
  name: string
  uid: string
  email: string
  createdAt: string
  updatedAt: string
  height?: number
  weight?: number
  bloodGroup: BloodGroup
  lastDonated?: string
  phone: string
  location?: {
    lat: number
    long: number
  }
  address?: string
}
