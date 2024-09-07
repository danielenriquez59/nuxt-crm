import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  // Create Companies
  const companies = []
  for (let i = 0; i < 5; i++) {
    const company = await prisma.companies.create({
      data: {
        name: faker.company.name(),
        city: faker.location.city(),
        country: faker.location.country(),
        employeeIds: [faker.string.uuid(), faker.string.uuid()],
        isEvaluation: faker.datatype.boolean(),
        websiteUrl: faker.internet.url(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    })
    companies.push(company)
  }

  // Create Customers
  const customers = []
  for (let i = 0; i < 20; i++) {
    const customer = await prisma.customers.create({
      data: {
        company: {
          connect: { id: faker.helpers.arrayElement(companies).id }
        },
        email: faker.internet.email(),
        name: faker.person.fullName(),
        status: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    })
    customers.push(customer)
  }

  // Create Notes
  for (let i = 0; i < 15; i++) {
    const relatedCustomerIds = faker.helpers.arrayElements(customers, { min: 1, max: 3 })
    await prisma.notes.create({
      data: {
        body: faker.lorem.sentence(),
        relatedCustomerIds: {
          connect: relatedCustomerIds.map(customer => ({ id: customer.id }))
        },
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    })
  }

  // Create Interactions
  for (let i = 0; i < 10; i++) {
    const relatedCustomerIds = faker.helpers.arrayElements(customers, { min: 1, max: 3 })
    await prisma.interactions.create({
      data: {
        method: faker.helpers.arrayElement(['call', 'email', 'meeting']),
        relatedCustomerIds: {
          connect: relatedCustomerIds.map(customer => ({ id: customer.id }))
        },
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    })
  }

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })