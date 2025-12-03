/**
 * Script to seed Celebrity data to Supabase
 * 
 * Usage:
 * 1. Make sure you have NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
 * 2. Run: node scripts/seed-celebrities.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const celebrities = [
  {
    name: 'Leonardo DiCaprio',
    birth_date: '1974-11-11',
    birth_place: 'Los Angeles, California, USA',
    profile_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    biography: 'Leonardo Wilhelm DiCaprio is an American actor and film producer. Known for his work in biographical and period films, he is the recipient of numerous accolades, including an Academy Award, a British Academy Film Award, and three Golden Globe Awards.',
    known_for: 'Actor',
    popularity_score: 98,
    movies: ['1', '5', '13', '17']
  },
  {
    name: 'Kate Winslet',
    birth_date: '1975-10-05',
    birth_place: 'Reading, Berkshire, England',
    profile_image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    biography: 'Kate Elizabeth Winslet is an English actress. Known for her work in independent films, particularly period dramas, and for her portrayals of headstrong and complicated women, she has received numerous accolades.',
    known_for: 'Actress',
    popularity_score: 95,
    movies: ['5', '17']
  },
  {
    name: 'Christian Bale',
    birth_date: '1974-01-30',
    birth_place: 'Haverfordwest, Wales',
    profile_image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    biography: 'Christian Charles Philip Bale is an English actor. Known for his versatility and physical transformations for his roles, he has been a leading man in films of several genres.',
    known_for: 'Actor',
    popularity_score: 96,
    movies: ['3', '15']
  },
  {
    name: 'Anne Hathaway',
    birth_date: '1982-11-12',
    birth_place: 'Brooklyn, New York, USA',
    profile_image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400',
    biography: 'Anne Jacqueline Hathaway is an American actress. The recipient of various accolades, including an Academy Award, a Golden Globe Award, and a Primetime Emmy Award, she was among the world\'s highest-paid actresses in 2015.',
    known_for: 'Actress',
    popularity_score: 94,
    movies: ['2', '14']
  },
  {
    name: 'Tom Hanks',
    birth_date: '1956-07-09',
    birth_place: 'Concord, California, USA',
    profile_image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    biography: 'Thomas Jeffrey Hanks is an American actor and filmmaker. Known for both his comedic and dramatic roles, he is one of the most popular and recognizable film stars worldwide.',
    known_for: 'Actor',
    popularity_score: 99,
    movies: ['12', '24']
  },
  {
    name: 'Joaquin Phoenix',
    birth_date: '1974-10-28',
    birth_place: 'San Juan, Puerto Rico',
    profile_image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400',
    biography: 'Joaquin Rafael Phoenix is an American actor. Known for playing dark and unconventional characters in independent films, he has received various accolades, including an Academy Award.',
    known_for: 'Actor',
    popularity_score: 97,
    movies: ['11', '23']
  },
  {
    name: 'Morgan Freeman',
    birth_date: '1937-06-01',
    birth_place: 'Memphis, Tennessee, USA',
    profile_image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400',
    biography: 'Morgan Freeman is an American actor, director, and narrator. He is known for his distinctive deep voice and various roles in a wide variety of film genres.',
    known_for: 'Actor',
    popularity_score: 98,
    movies: ['9', '21']
  },
  {
    name: 'Keanu Reeves',
    birth_date: '1964-09-02',
    birth_place: 'Beirut, Lebanon',
    profile_image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400',
    biography: 'Keanu Charles Reeves is a Canadian actor. Born in Beirut and raised in Toronto, Reeves began acting in theatre productions and in television films before making his feature film debut.',
    known_for: 'Actor',
    popularity_score: 96,
    movies: ['6', '18']
  }
];

const celebrity_news = [
  {
    title: 'Leonardo DiCaprio Announces New Environmental Documentary',
    content: 'Oscar-winning actor Leonardo DiCaprio has announced his latest environmental documentary project focusing on climate change and ocean conservation. The documentary, set to release next year, will explore the impact of human activities on marine ecosystems. DiCaprio, a long-time environmental activist, will serve as both narrator and executive producer. The film will feature interviews with leading scientists and showcase innovative solutions to combat environmental degradation.',
    image_url: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600',
    celebrity_name: 'Leonardo DiCaprio',
    published_date: '2025-12-01T10:00:00Z'
  },
  {
    title: 'Kate Winslet to Star in New Historical Drama',
    content: 'Academy Award winner Kate Winslet has been cast in the lead role of an upcoming historical drama set in Victorian England. The film, directed by acclaimed filmmaker Sarah Polley, tells the story of a pioneering female scientist fighting for recognition in a male-dominated field. Production is scheduled to begin in early 2026. Winslet expressed her excitement about the role, stating that it\'s a story that resonates with modern issues of gender equality.',
    image_url: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600',
    celebrity_name: 'Kate Winslet',
    published_date: '2025-11-30T14:30:00Z'
  },
  {
    title: 'Tom Hanks Receives Lifetime Achievement Award',
    content: 'Legendary actor Tom Hanks was honored with the Lifetime Achievement Award at the American Film Institute\'s annual gala. In his acceptance speech, Hanks reflected on his decades-long career in Hollywood and thanked his family, colleagues, and fans for their unwavering support. The event was attended by numerous celebrities and featured tribute performances celebrating Hanks\' most iconic roles, from Forrest Gump to Cast Away.',
    image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600',
    celebrity_name: 'Tom Hanks',
    published_date: '2025-11-28T09:15:00Z'
  },
  {
    title: 'Joaquin Phoenix Discusses Method Acting Approach',
    content: 'In a recent interview, Joaquin Phoenix opened up about his intense method acting approach and how he prepares for challenging roles. The Oscar-winning actor, known for his transformative performances in films like Joker, discussed the psychological and physical demands of his craft. Phoenix emphasized the importance of finding authentic emotional connections to his characters while maintaining personal boundaries and mental health.',
    image_url: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=600',
    celebrity_name: 'Joaquin Phoenix',
    published_date: '2025-11-25T16:45:00Z'
  },
  {
    title: 'Keanu Reeves Launches Motorcycle Company Partnership',
    content: 'Action star Keanu Reeves has announced a new partnership with custom motorcycle manufacturer Arch Motorcycle. The collaboration will focus on creating limited-edition bikes that combine cutting-edge technology with classic design elements. Reeves, a longtime motorcycle enthusiast, will be directly involved in the design process. The first bike from this partnership is expected to debut at the Los Angeles Auto Show next month.',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
    celebrity_name: 'Keanu Reeves',
    published_date: '2025-11-20T11:20:00Z'
  }
];

async function seedCelebrities() {
  console.log('🌱 Starting celebrity data seeding...\n');

  try {
    // Insert celebrities
    console.log('📥 Inserting celebrities...');
    const { data: celebData, error: celebError } = await supabase
      .from('celebrities')
      .insert(celebrities)
      .select();

    if (celebError) {
      throw new Error(`Failed to insert celebrities: ${celebError.message}`);
    }

    console.log(`✅ Successfully inserted ${celebData.length} celebrities`);

    // Get celebrity IDs for news
    const celebMap = {};
    celebData.forEach(celeb => {
      celebMap[celeb.name] = celeb.id;
    });

    // Update news with correct celebrity_id
    const newsWithIds = celebrity_news.map(news => ({
      ...news,
      celebrity_id: celebMap[news.celebrity_name]
    }));

    // Insert celebrity news
    console.log('📰 Inserting celebrity news...');
    const { data: newsData, error: newsError } = await supabase
      .from('celebrity_news')
      .insert(newsWithIds)
      .select();

    if (newsError) {
      throw new Error(`Failed to insert news: ${newsError.message}`);
    }

    console.log(`✅ Successfully inserted ${newsData.length} news articles\n`);

    console.log('🎉 Seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Celebrities: ${celebData.length}`);
    console.log(`   - News Articles: ${newsData.length}`);

  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
    process.exit(1);
  }
}

// Run the seeder
seedCelebrities();
