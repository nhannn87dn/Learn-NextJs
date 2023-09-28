import mongoose from 'mongoose'
declare global {
  var mongoose: any // This must be a `var` and not a `let / const`
}

const MONGODB_URI = process.env.MONGODB_URI!

console.log('MONGODB_URI',MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error(
    `Please define the MONGODB_URI environment variable inside .env.local ${MONGODB_URI}`
  )
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }
  if (!cached.promise) {
   
    const mongooseDbOptions = {
        autoIndex: true, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4, // Use IPv4, skip trying IPv6
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
      };
    cached.promise = mongoose.connect(MONGODB_URI, mongooseDbOptions).then((mongoose) => {
      return mongoose
    })
  }
  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect