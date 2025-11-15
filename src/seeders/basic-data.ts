
import { Prayer, Church, BiblePassage } from "../models";

export const seedBasicData = async () => {
  console.log("🌱 Seeding basic data...");

  // Seed prayers
  const prayers = [
    {
      title: "Morning Prayer",
      text: "Glory to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.",
      language: "en",
      category: "morning"
    },
    {
      title: "Lord's Prayer",
      text: "Our Father, who art in heaven, hallowed be thy name. Thy kingdom come, thy will be done, on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. For thine is the kingdom, and the power, and the glory, forever and ever. Amen.",
      language: "en",
      category: "traditional"
    },
    {
      title: "Evening Prayer",
      text: "May the Lord watch between me and thee, when we are absent one from another. The Lord bless you and keep you; the Lord make his face shine upon you and be gracious to you; the Lord turn his face toward you and give you peace. Amen.",
      language: "en",
      category: "evening"
    }
  ];

  for (const prayer of prayers) {
    await Prayer.findOrCreate({
      where: { title: prayer.title, language: prayer.language },
      defaults: prayer
    });
  }

  // Seed churches
  const churches = [
    {
      name: "Holy Trinity Ethiopian Orthodox Church",
      address: "123 Main Street, Washington DC 20001",
      latitude: 38.9072,
      longitude: -77.0369,
      phone: "+1-202-123-4567",
      email: "info@holytrinity-eotc.org",
      description: "A vibrant Ethiopian Orthodox community serving the Washington DC area."
    },
    {
      name: "St. Gabriel Ethiopian Orthodox Church",
      address: "456 Church Avenue, Los Angeles CA 90001",
      latitude: 34.0522,
      longitude: -118.2437,
      phone: "+1-323-456-7890",
      email: "contact@stgabriel-eotc.org",
      description: "Serving the Ethiopian Orthodox community in Los Angeles with traditional liturgy and fellowship."
    }
  ];

  for (const church of churches) {
    await Church.findOrCreate({
      where: { name: church.name },
      defaults: church
    });
  }

  // Seed sample Bible passages
  const biblePassages = [
    {
      book: "genesis",
      chapter: 1,
      verse: 1,
      text: "In the beginning God created the heavens and the earth.",
      translation: "ESV",
      language: "en"
    },
    {
      book: "john",
      chapter: 3,
      verse: 16,
      text: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
      translation: "ESV",
      language: "en"
    },
    {
      book: "psalms",
      chapter: 23,
      verse: 1,
      text: "The Lord is my shepherd; I shall not want.",
      translation: "ESV",
      language: "en"
    },
    {
      book: "psalms",
      chapter: 23,
      verse: 2,
      text: "He makes me lie down in green pastures. He leads me beside still waters.",
      translation: "ESV",
      language: "en"
    },
    {
      book: "psalms",
      chapter: 23,
      verse: 3,
      text: "He restores my soul. He leads me in paths of righteousness for his name's sake.",
      translation: "ESV",
      language: "en"
    }
  ];

  for (const passage of biblePassages) {
    await BiblePassage.findOrCreate({
      where: { 
        book: passage.book, 
        chapter: passage.chapter, 
        verse: passage.verse,
        translation: passage.translation,
        language: passage.language
      },
      defaults: passage
    });
  }

  console.log("✅ Basic data seeding completed");
};