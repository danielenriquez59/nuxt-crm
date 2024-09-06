import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  // Create Companies
  const companies = []
  for (let i = 0; i < 5; i++) {
    const company = await prisma.company.create({
      data: {
        name: faker.company.name(),
        city: faker.location.city(),
        country: faker.location.country(),
        employeeIds: [faker.string.uuid(), faker.string.uuid()],
        isEvaluation: faker.datatype.boolean(),
        websiteUrl: faker.internet.url(),
      },
    })
    companies.push(company)
  }

  // Create Customers
  const customers = []
  for (let i = 0; i < 20; i++) {
    const customer = await prisma.customer.create({
      data: {
        companyId: faker.helpers.arrayElement(companies).id,
        email: faker.internet.email(),
        name: faker.person.fullName(),
        status: faker.helpers.arrayElement(['active', 'inactive', 'pending']),
      },
    })
    customers.push(customer)
  }

  // Create Interactions
  for (let i = 0; i < 10; i++) {
    await prisma.interaction.create({
      data: {
        method: faker.helpers.arrayElement(['call', 'email', 'meeting']),
        relatedCustomerIds: faker.helpers.arrayElements(customers, { min: 1, max: 3 }).map(c => c.id.toString()),
      },
    })
  }

  // Create Notes
  for (let i = 0; i < 15; i++) {
    await prisma.note.create({
      data: {
        body: faker.lorem.paragraph(),
        relatedCustomerIds: faker.helpers.arrayElements(customers, { min: 1, max: 3 }).map(c => c.id.toString()),
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