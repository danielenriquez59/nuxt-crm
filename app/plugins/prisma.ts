import { prisma } from '~/server/utils/prisma'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      prisma: prisma
    }
  }
})