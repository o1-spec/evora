import { prisma } from './services/db.service';

async function main() {
  console.log('Inspecting first 15 TCF Questions from the database...');
  const questions = await prisma.tcfQuestion.findMany({
    take: 15
  });

  const filtered = questions.filter(q => q.options !== null && q.options !== undefined);
  console.log(`Found ${filtered.length} questions with options.`);

  for (const q of filtered) {
    console.log(`Question ID: ${q.id}`);
    console.log(`Text: ${q.text.substring(0, 40)}...`);
    console.log(`Options raw:`, q.options);
    console.log(`Options type:`, typeof q.options);
    if (typeof q.options === 'string') {
      try {
        const parsed = JSON.parse(q.options);
        console.log(`Parsed type:`, typeof parsed, Array.isArray(parsed) ? 'Array' : 'Not Array');
        console.log(`Parsed options:`, parsed);
      } catch (err) {
        console.log('Failed to parse options string:', err);
      }
    } else {
      console.log(`Is Array:`, Array.isArray(q.options));
    }
    console.log('---');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
