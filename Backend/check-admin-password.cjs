require("dotenv").config();

const bcrypt = require("bcryptjs");
const readline = require("readline");
const prisma = require("./src/config/prisma");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function main() {
  rl.question("Enter the admin password you are trying: ", async (password) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: "admin@doorstep.com",
        },
        select: {
          password: true,
          role: true,
          isActive: true,
        },
      });

      if (!user) {
        console.log("Admin account not found.");
      } else {
        const matches = await bcrypt.compare(password, user.password);

        console.log("Password matches:", matches);
        console.log("Role is ADMIN:", user.role === "ADMIN");
        console.log("Account is active:", user.isActive);
      }
    } catch (error) {
      console.error("Check failed:", error.message);
    } finally {
      rl.close();
      await prisma.$disconnect();
    }
  });
}

main();
