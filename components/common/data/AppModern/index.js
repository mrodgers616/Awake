/* ------------------------------------ */
// Navbar data section
/* ------------------------------------ */
import logo from '../../../../public/illustrations/Awake Logo.png';

export const navbar = {
  logo: logo,
  navMenu: [
    {
      id: 1,
      label: 'Home',
      path: '/',
      offset: '84',
      staticLink: true,
      needAuth: false,
    },
    {
      id: 2,
      label: 'Campaigns',
      path: '/campaigns',
      offset: '81',
      staticLink: true,
      needAuth: false,
    },
    {
      id: 3,
      label: 'About',
      path: '/about',
      offset: '81',
      staticLink: true,
      needAuth: false,
    },
    {
      id: 4,
      label: 'Blog',
      path: '/blog',
      offset: '81',
      staticLink: true,
      needAuth: false,
    },
    {
      id: 5,
      label: 'Link Account',
      path: '/linkAccount',
      offset: '81',
      staticLink: true,
      needAuth: true,
    },
  ],
};

/* ------------------------------------ */
// client data section
/* ------------------------------------ */
// import client1 from '../../assets/image/appModern/company1.png';
import client1 from '../../assets/image/appModern/CC.png';

import client2 from '../../assets/image/appModern/possibilian.png';
import client3 from '../../assets/image/appModern/allegory.png';
import client4 from '../../assets/image/appModern/company4.png';
export const client = [
  {
    id: 1,
    image: client1,
    title: 'Carbon Collective',
  },
  {
    id: 2,
    image: client2,
    title: 'Possibilian Ventures',
  },
  {
    id: 3,
    image: client3,
    title: 'Allegory Capital',
  },
  {
    id: 4,
    image: client4,
    title: 'the verge',
  },
];

/* ------------------------------------ */
// Features data section
/* ------------------------------------ */
import featureIcon1 from '../../assets/image/appModern/icon1.svg';
import featureIcon2 from '../../assets/image/appModern/icon2.svg';
import featureIcon3 from '../../assets/image/appModern/icon3.svg';
import featureIcon4 from '../../assets/image/appModern/icon4.svg';

export const features = {
  slogan: 'How Does it Work',
  title: 'Join Now to Participate in Campaigns',
  items: [
    {
      id: 1,
      color: '#F55767',
      icon: featureIcon1,
      title: 'App Development',
      description:
        'We are specialized at custom Saas Application Development and special features.',
    },
    {
      id: 2,
      color: '#ff4742',
      icon: featureIcon2,
      title: '10 Times Award',
      description:
        'We are globally recognised for our services and won a lot of prices around the world .',
    },
    {
      id: 3,
      color: '#fb5781',
      icon: featureIcon3,
      title: 'Cloud Storage',
      description:
        'LiteSpeed Web Server known for its high performance and low resource consumption.',
    },
    {
      id: 4,
      color: '#f18e47',
      icon: featureIcon4,
      title: 'Customization',
      description:
        'Client Satisfaction is our first priority and We are best at it. Keep In Touch for the best output. ',
    },
  ],
};

/* ------------------------------------ */
// App slider data section
/* ------------------------------------ */
import appSlide1 from '../../assets/image/appModern/appSlider1.png';
import appSlide2 from '../../assets/image/appModern/appSlider2.png';
import appSlide3 from '../../assets/image/appModern/appSlider3.png';
// import appIcon from '../../assets/image/appModern/icon1.svg';
import appIcon1 from '../../assets/image/appModern/icon1.png';
import appIcon2 from '../../assets/image/appModern/icon2.png';
import appIcon3 from '../../assets/image/appModern/icon3.png';

export const appSlider = {
  carousel: [
    {
      id: 1,
      image: appSlide1,
      title: 'App Slide 1',
    },
    {
      id: 2,
      image: appSlide2,
      title: 'App Slide 1',
    },
    {
      id: 3,
      image: appSlide3,
      title: 'App Slide 1',
    },
  ],
  title: 'Awake is empowering everyday investors to be activists.',
  description:
    "Whether you own stock through a brokerage, a pension or a 401k, you should have a say. We act as the missing link between shareholders who care about complex issues and the fund managers voting on their behalf",
  features: [
    {
      id: 1,
      icon: appIcon1,
      title: 'Activate Your Shares',
      description: "Make a profile and link your brokerage account to get started.",
    },
    {
      id: 2,
      icon: appIcon2,
      title: 'Vote On Campaigns',
      description: "Supporting initiatives to change companies in your portfolio is a click away.",
    },
    {
      id: 3,
      icon: appIcon3,
      title: 'Join the Community',
      description: "Stay in the loop about campaigns to fight the worlds toughest problems",
    },
  ],
};

/* ------------------------------------ */
// Design and built data section
/* ------------------------------------ */
import codingImage from '../../assets/image/appModern/code.png';

export const designAndBuilt = {
  image: codingImage,
  slogan: 'CODE INTEGRATION',
  title: 'Introducing coding features of our apps with Customization',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit sed eiusmod tempor incididunt labore dolore features that Lorem ipsum dolor sit amet consectetur.',
};

/* ------------------------------------ */
// Product  Slide  section
/* ------------------------------------ */
import slide1 from '../../assets/image/appModern/page1.png';
import slide2 from '../../assets/image/appModern/page2.png';
import slide3 from '../../assets/image/appModern/page3.png';

export const productData = {
  slogan: 'PRODUCT SHOWCASE',
  title: 'Meet Client Satisfaction by using our product',
  carousel: [
    {
      id: 1,
      thumb_url: slide1,
      link: '#1',
      title: 'slide 1',
    },
    {
      id: 2,
      thumb_url: slide2,
      link: '#1',
      title: 'slide 2',
    },
    {
      id: 3,
      thumb_url: slide3,
      link: '#1',
      title: 'slide 3',
    },

    {
      id: 4,
      thumb_url: slide1,
      link: '#1',
      title: 'slide 4',
    },

    {
      id: 5,
      thumb_url: slide3,
      link: '#1',
      title: 'slide 5',
    },
    {
      id: 6,
      thumb_url: slide2,
      link: '#1',
      title: 'slide 6',
    },
  ],
};

/* ------------------------------------ */
// Pricing policy data section
/* ------------------------------------ */
export const pricing = {
  slogan: 'PRICING PLAN',
  title: 'Choose your pricing policy',
  monthly: [
    {
      id: 1,
      title: 'Business Class',
      description: 'For Small teams or office',
      suggested: false,
      price: 0,
      features: [
        {
          id: 1,
          text: 'Drag & Drop Builder',
        },
        {
          id: 2,
          text: "1,000's of Templates",
        },
        {
          id: 3,
          text: 'Blog Support Tools',
        },
        {
          id: 4,
          text: 'eCommerce Store ',
        },
      ],
    },
    {
      id: 2,
      title: 'Pro Master',
      description: 'For Best opportunities',
      suggested: true,
      price: 99,
      trail: 14,
      trailLink: '#',
      features: [
        {
          id: 1,
          text: 'Drag & Drop Builder',
        },
        {
          id: 2,
          text: "1,000's of Templates",
        },
        {
          id: 3,
          text: 'Blog Support Tools',
        },
        {
          id: 4,
          text: 'eCommerce Store ',
        },
      ],
    },
  ],
  annualy: [
    {
      id: 1,
      title: 'Pro Master',
      description: 'For Small teams or office',
      suggested: true,
      price: 999,
      trail: 14,
      trailLink: '#',
      features: [
        {
          id: 1,
          text: 'Drag & Drop Builder',
        },
        {
          id: 2,
          text: "1,000's of Templates",
        },
        {
          id: 3,
          text: 'Blog Support Tools',
        },
        {
          id: 4,
          text: 'eCommerce Store ',
        },
      ],
    },
    {
      id: 2,
      title: 'Enterprise',
      description: 'For Best opportunities',
      suggested: false,
      price: 1299,
      trail: 30,
      trailLink: '#',
      features: [
        {
          id: 1,
          text: 'Drag & Drop Builder',
        },
        {
          id: 2,
          text: "1,000's of Templates",
        },
        {
          id: 3,
          text: 'Blog Support Tools',
        },
        {
          id: 4,
          text: 'eCommerce Store ',
        },
      ],
    },
  ],
};

/* ------------------------------------ */
// Team Portfolio data section
/* ------------------------------------ */
import member1 from '../../assets/image/appModern/1.png';
import member2 from '../../assets/image/appModern/2.png';
import member3 from '../../assets/image/appModern/3.png';
import member4 from '../../assets/image/appModern/4.png';
import member5 from '../../assets/image/appModern/5.png';
import member6 from '../../assets/image/appModern/6.png';
import member7 from '../../assets/image/appModern/7.png';

export const teamportfolio = {
  title: 'The mad scientists behind the movement',
  description:
    "We've come quite a long way as a team. Click below to learn more about our journey.",

  teammember: [
    {
      id: 1,
      img: member1,
      text: 'Elliot \'The Cheese\' Waxman',
    },
    {
      id: 2,
      img: member2,
      text: 'Matthew \'Big Daddy\' Rodgers',
    },
    {
      id: 3,
      img: member3,
      text: 'Tom \'The OG\' O\'keefe',
    },
    {
      id: 4,
      img: member4,
      text: 'Eli \'The Tank\' Danzinger',
    },
    {
      id: 5,
      img: member5,
      text: 'Fahima \'Feems\' Gibrel',
    },
    {
      id: 6,
      img: member6,
      text: 'Johnny \'Ice Man\' Gabrielle',
    },
    {
      id: 7,
      img: member7,
      text: 'John \'The Ghost\' Spies'
    },
  ],
};

/* ------------------------------------ */
// Testimonial data section
/* ------------------------------------ */
export const testimonial = {
  slogan: 'TESTIMONIAL',
  title: 'What Users Are Saying',
  reviews: [
    {
      id: 1,
      title: 'Literally cured me',
      description:
        'I am not a doctor, but I tried different therapies for years before my cancer was cured. Coincidentally (or not) once I started using Awake, it went away. Okay, Awake literally cured my cancer.',
      avatar:
        'https://pbs.twimg.com/profile_images/974736784906248192/gPZwCbdS.jpg',
      name: 'Tim Khan',
      designation: 'CEO of RedQ Inc.',
      review: 4,
    },
    {
      id: 2,
      title: 'Finally having an impact!',
      description:
        'I spent years flirting with sustainable finance, divesting from oil companies and investing in clean tech, but still did not feel like I was moving the dial, then finally I started using Awake.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      name: 'Jon Armweak',
      designation: 'Co Founder of RedQ Inc.',
      review: 5,
    },
    {
      id: 3,
      title: 'The finance app I didnt know I needed',
      description:
        'I was curious about sustainable finance and how I can have an impact; a friend recommended Awake to me and I have backed so many impactful campaigns!',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      name: 'Felix Tran',
      designation: 'Co Founder of RedQ Inc.',
      review: 5,
    },
  ],
};

/* ------------------------------------ */
// Footer data section
/* ------------------------------------ */
import chat from '../../assets/image/appModern/chat.svg';
import group from '../../assets/image/appModern/group.svg';
import twitter from '../../assets/image/appModern/twitter.png';
import footerLogo from '../../assets/image/appModern/logoWhite.png';

export const footer = {
  widgets: [
    {
      id: 1,
      icon: chat,
      title: 'Join the Community',
      description:
        'Create your account, link a brokerage account, and start voting to make a difference',
    },
    {
      id: 2,
      icon: group,
      title: 'Discuss With the Community',
      description:
        'Chat about campaigns with other users',
    },
    {
      id: 3,
      icon: twitter,
      title: 'Follow Us On Twitter',
      link: 'https://twitter.com/Climate_DAO?s=20&t=7kfsw7yZBFaki0n8p6Qg7w',
      description:
        'Get updates and insights about popular campaigns',
    },
  ],
  logo: footerLogo,
  menu: [
    {
      id: 1,
      text: 'Adversite',
      link: '#',
    },
    {
      id: 2,
      text: 'Privacy Policy',
      link: '/privacypolicy',
    },
    {
      id: 3,
      text: 'Twitter',
      link: 'https://twitter.com/Climate_DAO?s=20&t=7kfsw7yZBFaki0n8p6Qg7w',
    },
    {
      id: 4,
      text: 'Contact',
      link: 'mailto:inquiries@climatedao.xyz',
    },
  ],
};
