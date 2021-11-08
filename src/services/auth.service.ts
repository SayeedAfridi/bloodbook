import { firebase } from '@react-native-firebase/auth'
import { userCollection } from '@src/constants/collections'
import { BloodGroup, User } from '@src/types/auth.types'
import firestoreService from './firestore.service'

class _AuthService {
  auth = firebase.auth()

  async login(email: string, password: string): Promise<User> {
    try {
      const userCred = await this.auth.signInWithEmailAndPassword(
        email,
        password,
      )
      const uid = userCred.user.uid
      const user = await this.syncSserProfile(uid)
      return user
    } catch (error) {
      throw error
    }
  }

  async signup(
    email: string,
    password: string,
    name: string,
    bloodGroup: BloodGroup,
    phone: string,
  ) {
    try {
      const userCred = await this.auth.createUserWithEmailAndPassword(
        email,
        password,
      )
      const uid = userCred.user.uid
      const currentDate = new Date().toISOString()
      const data: User = {
        uid,
        name,
        email,
        bloodGroup,
        createdAt: currentDate,
        updatedAt: currentDate,
        phone,
      }
      await this.createUserProfile(data)
      return data
    } catch (error) {
      throw error
    }
  }

  async syncSserProfile(uid: string = ''): Promise<User> {
    try {
      if (!uid) {
        throw new Error('No user id')
      }
      const userCollectionRef =
        firestoreService.getCollectionRef(userCollection)
      const userSnap = await firestoreService
        .getDocRef(userCollectionRef, uid)
        .get()
      return userSnap.data() as User
    } catch (error) {
      throw error
    }
  }

  async createUserProfile(data: any) {
    try {
      const userDocRef = firestoreService
        .getCollectionRef(userCollection)
        .doc(data.uid)
      await userDocRef.set(data)
    } catch (error) {
      throw error
    }
  }

  async sendForgetPassMail(email: string): Promise<void> {
    try {
      await this.auth.sendPasswordResetEmail(email)
    } catch (error) {
      throw error
    }
  }
}

const authService = new _AuthService()

export default authService
