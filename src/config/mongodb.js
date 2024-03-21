import { MongoClient, ServerApiVersion } from 'mongodb'

let taskFlowDatabaseInstance = null
const url =
  'mongodb+srv://andrewleedev276:andrewleedev276@cluster0.mjbyp6i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const db_name = 'task-flow'
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNECT_DB = async () => {
  await client.connect()
  taskFlowDatabaseInstance = client.db(db_name)
}

export const GET_DB = () => {
  if (!taskFlowDatabaseInstance) throw new Error('Must connect Database first!')
  return taskFlowDatabaseInstance
}
