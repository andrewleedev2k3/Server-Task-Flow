import env from '@/config/environment'
import { MongoClient, ServerApiVersion } from 'mongodb'

let taskFlowDatabaseInstance = null

const client = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  await client.connect()
  taskFlowDatabaseInstance = client.db(env.DATABASE_NAME)
}

export const CLOSE_DB = async () => {
  await client.close()
}

export const GET_DB = () => {
  if (!taskFlowDatabaseInstance) throw new Error('Must connect Database first!')
  return taskFlowDatabaseInstance
}
