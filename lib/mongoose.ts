import mongoose from 'mongoose'

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI as string
console.log(MONGODB_URI,'url')
if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable')
}


mongoose.connect(MONGODB_URI).then(()=>{
    console.log('Connected db !')
}).catch((err)=>{
    console.log("not connected db",err)
})
