import { prisma } from './services/db.service';
import { SubscriptionTier } from '@prisma/client';

async function main() {
  console.log('Upgrading users on FREE plan to PRO to bypass attempt limits...');
  const result = await prisma.user.updateMany({
    where: {
      subscriptionTier: SubscriptionTier.FREE
    },
    data: {
      subscriptionTier: SubscriptionTier.PRO,
      subActiveUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year active
    }
  });
  console.log(`Success! Upgraded ${result.count} users.`);
}

main()
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
