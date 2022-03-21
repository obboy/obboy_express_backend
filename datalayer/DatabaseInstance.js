import Prisma from '@prisma/client'
const { PrismaClient } = Prisma
const prisma = new PrismaClient()

var _connected = false

export const connectDB = async () => {
    return new Promise((resolve, reject) => {
        prisma.$connect()
            .then((data) => {
                _connected = true
                resolve({
                    success: true,
                    data: data
                })
            })
            .catch((err) => {
                _connected = false
                reject({
                    success: false,
                    data: err
                })
            })
    })
}

export const disconnectDB = async () => {
    return new Promise((resolve, reject) => {
        prisma.$disconnect()
            .then((data) => {
                _connected = false
                resolve({
                    success: true,
                    data: data
                })
            })
            .catch((err) => {
                _connected = true
                reject({
                    success: false,
                    data: err
                })
            })
    })
}

export const connectionState = () => _connected