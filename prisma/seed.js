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
for (let i = 0; i < 10; i++) {
  const customer = await prisma.customers.create({
    data: {
      company: {
        connect: { id: faker.helpers.arrayElement(companies).id },
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

// Assign random customers as employees to companies
for (const company of companies) {
  const employeeCount = faker.number.int({ min: 1, max: 3 })
  const employeeIds = faker.helpers.arrayElements(
    customers.map(c => c.id),
    employeeCount
  )
  
  await prisma.companies.update({
    where: { id: company.id },
    data: {
      employeeIds: employeeIds,
    },
  })
}

  // Create Notes
  for (let i = 0; i < 8; i++) {
    const relatedCustomers = faker.helpers.arrayElements(customers, { min: 1, max: 3 })
    await prisma.notes.create({
      data: {
        body: faker.lorem.sentence(),
        relatedCustomers: {
          connect: relatedCustomers.map((customer) => ({ id: customer.id })),
        },
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        contact_method: faker.helpers.arrayElement(['email', 'phone', 'e-meet', 'social-media', 'in-person', 'other']),
      },
    })
  }

  // Create Projects
  const projects = []
  for (let i = 0; i < 15; i++) {
    const project = await prisma.projects.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        company: {
          connect: { id: faker.helpers.arrayElement(companies).id },
        },
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    })
    projects.push(project)
  }

  // Create Tasks
  for (let i = 0; i < 30; i++) {
    await prisma.tasks.create({
      data: {
        name: faker.hacker.verb(),
        description: faker.lorem.sentence(),
        project: {
          connect: { id: faker.helpers.arrayElement(projects).id },
        },
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    })
  }

// Create Logs
for (let i = 0; i < 8; i++) {
  const randomProject = faker.helpers.arrayElement(projects);
  const randomTask = await prisma.tasks.findFirst({
    where: { projectId: randomProject.id },
    select: { id: true },
  });
  
  if (randomTask) {
    await prisma.logs.create({
      data: {
        elapsedTime: faker.number.int({ min: 300, max: 14400 }),
        project: {
          connect: { id: randomProject.id },
        },
        company: {
          connect: { id: randomProject.companyId },
        },
        task: {
          connect: { id: randomTask.id },
        },
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    });
  } else {
    console.log(`No task found for project ${randomProject.id}. Skipping log creation.`);
  }
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
