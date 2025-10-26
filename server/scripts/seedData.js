// scripts/seedData.js - Seed script for JBest Eyes blog

const mongoose = require('mongoose');
require('dotenv').config();

const Category = require('../models/Category');
const Post = require('../models/Post');

const categories = [
  {
    name: 'Daily Life',
    description: 'Everyday experiences and moments',
    color: '#48bb78'
  },
  {
    name: 'Business Adventures',
    description: 'Entrepreneurial journeys and insights',
    color: '#ed8936'
  },
  {
    name: 'Coding Journey',
    description: 'Programming experiences and learning',
    color: '#667eea'
  },
  {
    name: 'Parenting Moments',
    description: 'Experiences raising children',
    color: '#f56565'
  },
  {
    name: 'Nature Photography',
    description: 'Photos and stories from nature',
    color: '#38b2ac'
  },
  {
    name: 'Personal Growth',
    description: 'Self-improvement and reflection',
    color: '#9f7aea'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Post.deleteMany({});
    console.log('Cleared existing data');

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log('Created categories:', createdCategories.map(c => c.name));

    // Create sample posts
    const samplePosts = [
      {
        title: 'Welcome to JBest Eyes',
        content: `Welcome to my personal blog where I share my journey through daily life, business adventures, coding challenges, and the beautiful chaos of parenting.

This blog is my window to the world - a place where I document my experiences, share insights, and connect with others who might be on similar journeys. You'll find stories about:

- Daily life adventures and discoveries
- Business exploration and entrepreneurial experiments  
- Coding projects and technical learning
- Parenting moments both challenging and joyful
- Nature photography from my outdoor adventures

I believe that every day brings new opportunities to learn, grow, and make a positive impact. Through this blog, I hope to inspire others while documenting my own evolution.

Thank you for joining me on this journey!`,
        category: createdCategories.find(c => c.name === 'Daily Life')._id,
        tags: ['welcome', 'introduction', 'blog'],
        excerpt: 'Welcome to my personal blog where I share my journey through daily life, business adventures, coding challenges, and parenting.',
        isPublished: true
      },
      {
        title: 'My First Business Experiment',
        content: `Today marks the beginning of an exciting new business adventure. After months of research and planning, I'm finally taking the leap into entrepreneurship.

The idea came to me during one of those late-night parenting sessions when inspiration strikes at the most unexpected moments. I realized there was a gap in the market that I could potentially fill with my unique perspective and skills.

Here's what I'm planning:
- Start small with minimal investment
- Test the market with a MVP approach  
- Learn from customer feedback
- Iterate and improve continuously

The journey won't be easy, but I'm excited about the possibilities. I'll be documenting every step of this adventure here, sharing both successes and failures along the way.

Wish me luck!`,
        category: createdCategories.find(c => c.name === 'Business Adventures')._id,
        tags: ['business', 'entrepreneurship', 'startup', 'experiment'],
        excerpt: 'Starting my first business experiment with a focus on learning and iteration.',
        isPublished: true
      },
      {
        title: 'Learning React: A Coding Journey',
        content: `As a developer constantly learning new technologies, I recently dove deep into React and built this very blog application!

The experience has been incredibly rewarding. Here are some key insights I've gained:

**What I Learned:**
- Component-based architecture makes code more maintainable
- Hooks provide elegant state management solutions
- The ecosystem is vast and sometimes overwhelming
- Building real projects is the best way to learn

**Challenges Faced:**
- Understanding the React lifecycle initially
- Managing state across components
- Optimizing performance for better user experience
- Balancing feature richness with simplicity

**Key Takeaways:**
- Start with the basics and build complexity gradually
- Don't try to learn everything at once
- Practice with real projects, not just tutorials
- The React community is incredibly helpful

This blog itself is a testament to what you can build with React, Express, MongoDB, and Node.js. The MERN stack continues to amaze me with its flexibility and power.

Next up: exploring React Native for mobile development!`,
        category: createdCategories.find(c => c.name === 'Coding Journey')._id,
        tags: ['react', 'javascript', 'learning', 'mern', 'development'],
        excerpt: 'My experience learning React and building this blog application with the MERN stack.',
        isPublished: true
      },
      {
        title: 'Parenting in the Digital Age',
        content: `Being a parent while working in tech presents unique challenges and opportunities. Today I want to share some thoughts on balancing screen time, teaching kids about technology, and maintaining family connections in our digital world.

**The Screen Time Dilemma:**
As someone who works with computers all day, I'm acutely aware of the irony when I tell my kids to reduce their screen time. Finding the right balance is an ongoing challenge.

**Teaching Technology Literacy:**
Instead of just limiting screen time, I try to teach my children how to use technology purposefully. We explore coding together, create digital art, and even build simple websites.

**Maintaining Real Connections:**
Despite all the digital tools at our disposal, nothing replaces quality time together. We make sure to have device-free meals and dedicate time for outdoor activities and face-to-face conversations.

**Lessons I'm Learning:**
- Model the behavior you want to see
- Technology is a tool, not a babysitter  
- Curiosity and creativity matter more than perfect digital literacy
- Every child's relationship with technology will be different

The goal isn't to raise little programmers (unless they want to be), but to help them become thoughtful, creative, and kind humans who can navigate our increasingly digital world.`,
        category: createdCategories.find(c => c.name === 'Parenting Moments')._id,
        tags: ['parenting', 'technology', 'screen-time', 'balance', 'family'],
        excerpt: 'Navigating the challenges of parenting in our increasingly digital world.',
        isPublished: true
      }
    ];

    const createdPosts = await Post.insertMany(samplePosts);
    console.log('Created sample posts:', createdPosts.map(p => p.title));

    // Update category post counts
    for (const category of createdCategories) {
      const postCount = await Post.countDocuments({ category: category._id });
      await Category.findByIdAndUpdate(category._id, { postCount });
    }

    console.log('Database seeding completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();