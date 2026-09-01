import { initialBoards } from '../prisma/tnsb-data';

function main() {
  console.log("=== SUBJECT / CHAPTER / TOPIC ANALYSIS ===");
  
  const subjectsMap: Record<string, { chaptersCount: number, topicsCount: number, topics: string[] }> = {};
  
  initialBoards.forEach(board => {
    board.classes.forEach(cls => {
      cls.subjects.forEach(sub => {
        const key = `${cls.title} - ${sub.title} (${sub.id})`;
        if (!subjectsMap[key]) {
          subjectsMap[key] = { chaptersCount: 0, topicsCount: 0, topics: [] };
        }
        
        sub.chapters.forEach(chap => {
          subjectsMap[key].chaptersCount++;
          chap.topics.forEach(top => {
            subjectsMap[key].topicsCount++;
            subjectsMap[key].topics.push(`Chap: ${chap.title} | Top: ${top.title} (${top.id})`);
          });
        });
      });
    });
  });

  for (const [subName, info] of Object.entries(subjectsMap)) {
    console.log(`\nSubject: ${subName}`);
    console.log(`  Chapters: ${info.chaptersCount}`);
    console.log(`  Topics: ${info.topicsCount}`);
    console.log("  First few topics:");
    info.topics.slice(0, 5).forEach(t => console.log(`    - ${t}`));
    if (info.topics.length > 5) {
      console.log(`    - ... and ${info.topics.length - 5} more topics.`);
    }
  }
}

main();
