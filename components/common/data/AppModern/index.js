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
      label: 'About',
      path: '/about',
      offset: '81',
      staticLink: true,
      needAuth: false,
    },
    {
      id: 3,
      label: 'FAQs',
      path: '/faqs',
      offset: '81',
      staticLink: true,
      needAuth: false,
    },
    // {
    //   id: 4,
    //   label: 'Blog',
    //   path: '/blog',
    //   offset: '81',
    //   staticLink: true,
    //   needAuth: false,
    // },
    {
      id: 1,
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
import client4 from '../../assets/image/appModern/image 30.png';
import client5 from '../../assets/image/appModern/bi.svg';
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
  title: 'Log in, Link an Investment Account, and Vote!',
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

// import appSlide1 from '../../assets/image/appModern/giphy.gif';
import appSlide1 from '../../assets/image/appModern/plaidlink.gif';
import appSlide2 from '../../assets/image/appModern/gif2.gif';
import appSlide3 from '../../assets/image/appModern/giphy3.gif';
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
      title: 'App Slide 2',
    },
    {
      id: 3,
      image: appSlide3,
      title: 'App Slide 3',
    },
  ],
  title: 'Empowering Investors',
  description:
    "Whether you own stock through a brokerage, a pension or a 401k, you should have a say.",
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
      title: 'Support Campaigns',
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
import slide1 from '../../../../public/illustrations/abstractBanner.png';
import slide2 from '../../assets/image/appModern/page2.png';
import slide3 from '../../assets/image/appModern/page3.png';

export const productData = {
  slogan: 'FLAGSHIP CAMPAIGN',
  title: 'Get Total to Divest from Russian Oil Now!',
  carousel: [
    {
      id: 1,
      thumb_url: slide1,
      link: '#1',
      title: 'slide 1',
    },
    {
      id: 2,
      thumb_url: slide1,
      link: '#1',
      title: 'slide 2',
    },
    {
      id: 3,
      thumb_url: slide1,
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
      thumb_url: slide1,
      link: '#1',
      title: 'slide 5',
    },
    {
      id: 6,
      thumb_url: slide1,
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
import member1 from '../../assets/image/appModern/elliotw.png';
import member2 from '../../assets/image/appModern/matthew.png';
import member3 from '../../assets/image/appModern/DEFI.png';
import member4 from '../../assets/image/appModern/ELI.png';
import member5 from '../../assets/image/appModern/FEEMS.png';
import member6 from '../../assets/image/appModern/TOM.png';
import member7 from '../../assets/image/appModern/SIGAL.png';

export const teamportfolio = {
  title: 'The humans behind the Awake',
  description:
    "We've come quite a long way as a team. Click below to learn more about our journey.",

  teammember: [
    {
      id: 1,
      img: member1,
      text: 'Elliot Waxman',
    },
    {
      id: 2,
      img: member2,
      text: 'Matthew Rodgers',
    },
    {
      id: 3,
      img: member3,
      text: "Johnny Gabrielle",
    },
    {
      id: 6,
      img: member4,
      text: 'Eli Danziger',
    },
    {
      id: 7,
      img: member7,
      text: 'Sigal Shemesh'
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
      title: 'Link your Broker',
      path: '/linkAccount',
      description:
        'In order to prove you own shares, we ask that you link your broker after making an account.',
      avatar: "https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Flock.png?alt=media&token=1515b250-2374-4d95-85be-26d91fc95f43",
    },
    {
      id: 2,
      title: 'Sign a Petition',
      path:'/',
      description:
        'Sign a petition for a company in your portfolio to take action on an issue you care about.',
      avatar: "https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2FGo%20Green%20Green%20Papers.png?alt=media&token=7c813e0b-964c-4b78-81cf-4e9a35d97e6b",
    },
    {
      id: 3,
      title: 'We Do the Rest',
      path:'/',
      description:
        "We'll advocate for change at the target companies on behalf of you and other investors.",
      avatar: 'https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2FGo%20Green%20Megaphone.png?alt=media&token=d71c6a33-e24b-406c-b99e-487f5360932a',
    },
  ],
};

export const testimonial2 = {
  slogan: 'TESTIMONIAL',
  title: 'What Users Are Saying',
  reviews: [
    {
      id: 1,
      title: 'Select a company',
      description:
        'Identify a company.',
      avatar: "https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Fimage%2043.png?alt=media&token=d43f47a3-d634-410f-a223-9643d41f602d",
    },
    {
      id: 2,
      title: 'Select a cause',
      description:
        'Identify a specific change you want to see at a corporation.',
      avatar: "https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Fimage%2045.png?alt=media&token=efa701a7-13d1-4ed2-864f-7100cae9534f",
    },
    {
      id: 3,
      title: 'Build a case',
      description:
        "Make a case that this change is important for the company.",
      avatar: 'https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Fimage%2046.png?alt=media&token=e395073c-7208-4a26-a301-398abe5fb4ec',
    },
    {
      id: 4,
      title: 'Craft a proposal',
      description:
        "We’ll collaborate with you to bring this proposal to life.",
      avatar: 'https://firebasestorage.googleapis.com/v0/b/climatedao-8fdb5.appspot.com/o/websiteAssets%2Fimage%2047.png?alt=media&token=18ac4bec-db75-4d18-b88d-070865319871',
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
      link: 'https://discord.gg/RExDdhJw7X',
      description:
        'Create your account, link a brokerage account, and start voting to make a difference',
    },
    {
      id: 2,
      icon: group,
      title: 'Discuss With the Community',
      link: 'https://discord.gg/RExDdhJw7X',
      description:
        'Chat about campaigns with other users',
    },
    {
      id: 3,
      icon: twitter,
      title: 'Follow Us On Twitter',
      link: 'https://twitter.com/AwakeInvest?s=20&t=raDm4L96BsHsT5ffrgLDsg',
      description:
        'Get updates and insights about popular campaigns',
    },
  ],
  logo: footerLogo,
  menu: [
    {
      id: 1,
      text: 'Privacy Policy',
      link: '/privacypolicy',
    },
    {
      id: 2,
      text: 'Twitter',
      link: 'https://twitter.com/awakeinvest',
    },
    {
      id: 3,
      text: 'Contact',
      link: 'mailto:Info@awakeinvest.com',
    },
    {
      id: 4,
      text: 'Discord',
      link: 'https://discord.gg/WwhjrS3HCm',
    },
  ],
};
