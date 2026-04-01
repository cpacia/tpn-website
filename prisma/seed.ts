import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

const donations = [
  { description: "Donated gifts for Christmas to a single mother with 4 children fulfilling their entire wishlist", amount: 2500, category: "Supporting Childhood" },
  { description: "Paid an outstanding amount on an electric bill for a Texas based mother of two", amount: 500, category: "Family Support" },
  { description: "Donated a couple of meal cards for a Texas family whose mother is battling cancer", amount: 150, category: "Family Support" },
  { description: "Donated to help with funds for a Texas family's funeral expenses", amount: 50, category: "Family Support" },
  { description: "Donated to Special Reach in Texas to help disabled children go to special camps", amount: 3500, category: "Supporting Childhood" },
  { description: "Purchased 2 Baby Travel Systems for expecting families in Texas", amount: 200, category: "Family Support" },
  { description: "Purchased 1 gift off of a Texas mother's baby gift registry", amount: null, category: "Family Support" },
  { description: "Donated Christmas and Birthday gifts for children", amount: 1600, category: "Supporting Childhood" },
  { description: "Paid rent for single mothers in need", amount: 825, category: "Domestic Violence" },
  { description: "Donated grocery money to families in Texas", amount: 350, category: "Childhood Hunger" },
  { description: "Donated personal care items to students in need", amount: 150, category: "Supporting Childhood" },
  { description: "Donated Texas Flood Relief cleaning supplies and tools", amount: 75, category: "Flood Relief" },
  { description: "Donated 1 package of diapers to Texas Flood Relief victims", amount: null, category: "Flood Relief" },
  { description: "Donated funds for teenager moving out into their first apartment as an adult", amount: 350, category: "Family Support" },
  { description: "Donated clothes for interviews/job/work for a young adult who could not afford it", amount: 72, category: "Family Support" },
  { description: "Donated backpacks and supplies for children who could not afford it", amount: 200, category: "Supporting Childhood" },
  { description: "Purchased school books and supplies for those in need", amount: 862.57, category: "Supporting Childhood" },
  { description: "Donated holiday gift baskets for college students who didn't have families to visit during their holiday breaks", amount: 600, category: "Supporting Childhood" },
  { description: "Paid rent to help a single mom get an apartment and move out of a domestic violence shelter", amount: 6000, category: "Domestic Violence" },
  { description: "Facilitated the purchase and donation of bulk personal care items, bedding, dinnerware, inspirational materials, and comfort items via our philanthropic donation network", amount: null, category: "Community Support" },
];

const expenses = [
  { description: "Salary to Caitlin Williams for page creation/editing of website, facilitation of all gifts and donations, fundraising, social media content, and managing/recruiting interns", amount: 16370 },
  { description: "360 Digital Media LLC — website design and launch", amount: 699 },
  { description: "Cogburn Logistics", amount: 105 },
];

async function main() {
  // Seed admin user
  const username = process.env.ADMIN_DEFAULT_USERNAME || "admin";
  const password = process.env.ADMIN_DEFAULT_PASSWORD || "changeme123";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { username },
    update: {},
    create: { username, passwordHash },
  });
  console.log(`Admin user "${username}" seeded.`);

  // Seed transparency donations (skip if already populated)
  const existingDonations = await prisma.transparencyDonation.count();
  if (existingDonations === 0) {
    for (let i = 0; i < donations.length; i++) {
      await prisma.transparencyDonation.create({
        data: {
          description: donations[i].description,
          amount: donations[i].amount,
          category: donations[i].category,
          sortOrder: i,
        },
      });
    }
    console.log(`${donations.length} transparency donations seeded.`);
  } else {
    console.log(`Transparency donations already exist (${existingDonations}), skipping.`);
  }

  // Seed transparency expenses (skip if already populated)
  const existingExpenses = await prisma.transparencyExpense.count();
  if (existingExpenses === 0) {
    for (let i = 0; i < expenses.length; i++) {
      await prisma.transparencyExpense.create({
        data: {
          description: expenses[i].description,
          amount: expenses[i].amount,
          sortOrder: i,
        },
      });
    }
    console.log(`${expenses.length} transparency expenses seeded.`);
  } else {
    console.log(`Transparency expenses already exist (${existingExpenses}), skipping.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
