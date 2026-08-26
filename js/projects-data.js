(function () {
  window.PROJECTS_DATA = [
    {
      slug: 'medical-appointment-system',
      title: 'Medical Appointment System',
      subtitle: 'Full-Stack Healthcare Booking Platform',
      cardImage: 'assets/projects/medical-appointment-system/image_0.png',
      technologies: ['Node.js', 'Express', 'MongoDB', 'React.js', 'JWT', 'Tailwind'],
      cardSummary: ['Role-Based Access', 'JWT Auth', 'Team Project'],
      hero: {
        description:
          'A full-stack healthcare booking platform delivering separate experiences for Admin, Doctor, and Patient with secure authentication and reliable scheduling.',
        role: 'Full-Stack Development (MERN) / Team Project',
        links: {
          github: 'https://github.com/Keroayman34/medical-appointment-system'
        }
      },
      overview:
        'The Medical Appointment System is a team-built platform that lets patients book appointments, doctors manage their schedules, and admins oversee the whole clinic. Access is role-based (Admin / Doctor / Patient) and secured with JWT authentication. Booking conflicts are prevented at the database level using compound indexes, and email notifications keep users informed of appointment changes.',
      gallery: [
        {
          src: 'assets/projects/medical-appointment-system/image_1.jpeg',
          alt: 'Medical Appointment System screenshot 1',
          caption: 'Medical Appointment System — application screenshot.'
        },
        {
          src: 'assets/projects/medical-appointment-system/image_2.jpeg',
          alt: 'Medical Appointment System screenshot 2',
          caption: 'Medical Appointment System — application screenshot.'
        },
        {
          src: 'assets/projects/medical-appointment-system/image_3.jpeg',
          alt: 'Medical Appointment System screenshot 3',
          caption: 'Medical Appointment System — application screenshot.'
        },
        {
          src: 'assets/projects/medical-appointment-system/image_4.jpeg',
          alt: 'Medical Appointment System screenshot 4',
          caption: 'Medical Appointment System — application screenshot.'
        },
        {
          src: 'assets/projects/medical-appointment-system/image_5.jpeg',
          alt: 'Medical Appointment System screenshot 5',
          caption: 'Medical Appointment System — application screenshot.'
        },
        {
          src: 'assets/projects/medical-appointment-system/image_6.jpeg',
          alt: 'Medical Appointment System screenshot 6',
          caption: 'Medical Appointment System — application screenshot.'
        }
      ],
      keyFeatures: [
        {
          title: 'Access & Auth',
          items: [
            'Role-based access for Admin / Doctor / Patient',
            'JWT authentication for protected routes',
            'Separate dashboards per user role'
          ]
        },
        {
          title: 'Scheduling',
          items: [
            'Appointment booking and management',
            'Conflict prevention via compound indexes',
            'Real-time availability awareness'
          ]
        },
        {
          title: 'Notifications',
          items: [
            'Email notifications via Nodemailer',
            'Appointment confirmation and updates',
            'Reliable, auditable booking flow'
          ]
        }
      ],
      technicalImplementation: [
        'React.js frontend styled with Tailwind CSS for a responsive, role-aware interface.',
        'Node.js and Express backend exposing REST APIs secured with JWT.',
        'MongoDB with Mongoose for flexible healthcare data modeling.',
        'Compound indexes used to prevent overlapping appointment bookings.',
        'Nodemailer integrated for transactional email notifications.'
      ],
      engineeringHighlights: [
        'End-to-end MERN architecture connecting React, Node, Express, and MongoDB.',
        'Security-first design with JWT and server-enforced role checks.',
        'Data integrity preserved through database-level conflict prevention.',
        'Collaborative team project following shared conventions and Git workflows.'
      ]
    },
    {
      slug: 'ai-chatbot-cli',
      title: 'AI Chatbot CLI',
      subtitle: 'Conversational AI in the Terminal',
      cardImage: 'assets/projects/ai-chatbot-cli/cover.svg',
      technologies: ['Node.js', 'Axios', 'OpenRouter API', 'dotenv', 'Readline'],
      cardSummary: ['Generative AI', 'Conversation Memory', 'CLI Tool'],
      hero: {
        description:
          'A command-line conversational AI that connects to the OpenRouter LLM API over raw HTTP, keeping chat context across turns directly in the terminal.',
        role: 'Node.js / Generative AI Integration',
        links: {
          github: 'https://github.com/Keroayman34/AI-Chatbot-CLI-Node.js-OpenRouterAPI'
        }
      },
      overview:
        'The AI Chatbot CLI is a lightweight terminal application that integrates the OpenRouter LLM API using raw HTTP requests via Axios. It maintains conversation memory across multiple turns and keeps credentials secure with dotenv, offering a simple and efficient way to chat with a large language model from the command line.',
      gallery: [
        {
          src: 'assets/projects/ai-chatbot-cli/cover.svg',
          alt: 'AI Chatbot CLI project cover',
          caption: 'Terminal-based conversational AI powered by the OpenRouter LLM API.'
        }
      ],
      keyFeatures: [
        {
          title: 'Integration',
          items: [
            'OpenRouter LLM API over raw HTTP',
            'Axios for HTTP communication',
            'dotenv for secure API key handling'
          ]
        },
        {
          title: 'Conversation',
          items: [
            'Multi-turn conversation memory',
            'Readline-based interactive prompts',
            'Context preserved across messages'
          ]
        },
        {
          title: 'UX',
          items: [
            'Lightweight terminal interface',
            'No external UI dependencies',
            'Quick local experimentation'
          ]
        }
      ],
      technicalImplementation: [
        'Node.js runtime driving the CLI application.',
        'Axios used to call the OpenRouter API with raw HTTP requests.',
        'Readline for interactive, line-by-line user input.',
        'Conversation history stored in memory to maintain context.',
        'dotenv loads the LLM API key from environment variables.'
      ],
      engineeringHighlights: [
        'Direct integration with a generative AI API without heavy SDKs.',
        'Clean separation of configuration, networking, and interaction layers.',
        'Emphasis on security by keeping keys out of source code.'
      ]
    },
    {
      slug: 'smartcart-pro',
      title: 'SmartCart Pro',
      subtitle: 'E-Commerce Frontend',
      cardImage: 'assets/projects/smartcart-pro/cover.svg',
      technologies: ['Vanilla JavaScript ES6+', 'HTML5', 'CSS3', 'LocalStorage'],
      cardSummary: ['Responsive Storefront', 'Cart Persistence', 'Dark Mode'],
      hero: {
        description:
          'A responsive e-commerce frontend with persistent cart and wishlist, real-time search, and dark mode — built with vanilla JavaScript and local storage.',
        role: 'Frontend Development',
        links: {
          github: 'https://github.com/Keroayman34/SmartCart-Pro-AI-Powered-Ecommerce-Frontend'
        }
      },
      overview:
        'SmartCart Pro is a frontend e-commerce experience focused on usability and polish. It provides a responsive storefront, persistent cart and wishlist through LocalStorage, real-time product search, and a built-in dark mode. The project demonstrates strong vanilla JavaScript fundamentals without framework dependencies.',
      gallery: [
        {
          src: 'assets/projects/smartcart-pro/cover.svg',
          alt: 'SmartCart Pro project cover',
          caption: 'Vanilla JavaScript e-commerce frontend with cart persistence and dark mode.'
        }
      ],
      keyFeatures: [
        {
          title: 'Shopping',
          items: [
            'Responsive storefront layout',
            'Cart persistence with LocalStorage',
            'Wishlist support'
          ]
        },
        {
          title: 'Interaction',
          items: [
            'Real-time product search',
            'Dark mode toggle',
            'Smooth client-side updates'
          ]
        },
        {
          title: 'Frontend Quality',
          items: [
            'Vanilla JavaScript ES6+',
            'Semantic HTML5 markup',
            'Custom CSS3 styling'
          ]
        }
      ],
      technicalImplementation: [
        'Built with vanilla JavaScript ES6+ for all interactivity.',
        'LocalStorage used for cart and wishlist persistence across sessions.',
        'Real-time search filters products on user input.',
        'Dark mode implemented with CSS variables and a state toggle.'
      ],
      engineeringHighlights: [
        'Framework-free architecture keeps the bundle lightweight.',
        'Persistence layer gives a native app-like shopping experience.',
        'Clean separation of state, rendering, and styling concerns.'
      ]
    },
    {
      slug: 'graphql-users-todos-api',
      title: 'GraphQL Users & Todos API',
      subtitle: 'GraphQL API with Auth',
      cardImage: 'assets/projects/graphql-users-todos-api/cover.svg',
      technologies: ['Node.js', 'GraphQL', 'Apollo Server', 'MongoDB', 'JWT'],
      cardSummary: ['GraphQL CRUD', 'JWT Auth', 'Protected Resolvers'],
      hero: {
        description:
          'A GraphQL API offering full CRUD for users and todos, with JWT authentication and protected resolvers powered by Apollo Server.',
        role: 'Backend / API Development',
        links: {
          github: 'https://github.com/Keroayman34/graphql-users-todos-api'
        }
      },
      overview:
        'The GraphQL Users & Todos API is a backend service built with Apollo Server. It exposes a typed GraphQL schema with full CRUD operations for users and todos, and secures access using JWT authentication with protected resolvers that require a valid token.',
      gallery: [
        {
          src: 'assets/projects/graphql-users-todos-api/cover.svg',
          alt: 'GraphQL Users & Todos API project cover',
          caption: 'Apollo Server GraphQL API with JWT-protected resolvers.'
        }
      ],
      keyFeatures: [
        {
          title: 'API',
          items: [
            'Full CRUD for users and todos',
            'Typed GraphQL schema',
            'Apollo Server runtime'
          ]
        },
        {
          title: 'Security',
          items: [
            'JWT authentication',
            'Protected resolvers',
            'Context-based authorization'
          ]
        },
        {
          title: 'Data',
          items: [
            'MongoDB for persistence',
            'Mongoose data models',
            'Relational todo ownership'
          ]
        }
      ],
      technicalImplementation: [
        'Node.js with Apollo Server exposing a GraphQL endpoint.',
        'GraphQL schema and resolvers implementing full CRUD.',
        'JWT verified in the resolver context to protect routes.',
        'MongoDB and Mongoose for data modeling and persistence.'
      ],
      engineeringHighlights: [
        'Type-safe API design through GraphQL schema first.',
        'Authorization enforced at the resolver level.',
        'Clear separation between schema, resolvers, and data access.'
      ]
    },
    {
      slug: 'sofra',
      title: 'SOFRA',
      subtitle: 'Fine Dining Restaurant Website',
      cardImage: 'assets/projects/sofra/image_0.png',
      technologies: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'Bootstrap'],
      cardSummary: ['Responsive Design', 'Scroll Animations', 'FAQ Accordion'],
      hero: {
        description:
          'A premium frontend restaurant experience focused on visual storytelling, refined interaction design, and responsive usability across devices.',
        role: 'Frontend Development / UI Implementation',
        links: {
          github: 'https://github.com/Keroayman34/sofra-fine-dining-restaurant'
        }
      },
      overview:
        'SOFRA is a frontend-only restaurant showcase designed to communicate atmosphere and quality through typography, layout, motion, and imagery. The project focuses on user experience and presentation, with interaction patterns built to guide exploration and booking-focused calls to action without backend workflows.',
      gallery: [
        {
          src: 'assets/projects/sofra/sofra-home-hero.png',
          alt: 'SOFRA hero section with the headline Where Culinary Art Meets Elegance',
          caption: 'Home / Hero — "Where Culinary Art Meets Elegance".'
        },
        {
          src: 'assets/projects/sofra/sofra-about-story.png',
          alt: 'SOFRA about section with the title A Legacy of Culinary Excellence',
          caption: 'About / Our Story — "A Legacy of Culinary Excellence".'
        },
        {
          src: 'assets/projects/sofra/sofra-signature-dishes.png',
          alt: 'SOFRA signature dishes section with four highlighted dish cards',
          caption: 'Signature Dishes — four featured dish cards with rich visual presentation.'
        },
        {
          src: 'assets/projects/sofra/sofra-menu.png',
          alt: 'SOFRA menu section displaying appetizers and main courses',
          caption: 'Our Menu — structured browsing for Appetizers and Main Courses.'
        },
        {
          src: 'assets/projects/sofra/sofra-faq.png',
          alt: 'SOFRA frequently asked questions section',
          caption: 'FAQ — interaction-focused accordion for common visitor questions.'
        }
      ],
      keyFeatures: [
        {
          title: 'UI & Experience',
          items: [
            'Elegant luxury-oriented visual design',
            'Warm ivory / beige / charcoal / muted gold design system',
            'Fully responsive layout',
            'Sticky navigation',
            'Smooth scrolling',
            'Active navigation highlighting',
            'Responsive mobile navigation',
            'Hover interactions'
          ]
        },
        {
          title: 'Interaction & Motion',
          items: [
            'Scroll-triggered animations',
            'Intersection Observer API',
            'Fade-in / slide-up effects',
            'Staggered animations',
            'prefers-reduced-motion support',
            'FAQ accordion',
            'Testimonial slider with auto-play',
            'Previous / next slider controls',
            'Touch / swipe support'
          ]
        },
        {
          title: 'Markup & Frontend Quality',
          items: [
            'Semantic HTML5 structure',
            'Accessibility-conscious markup',
            'SEO-conscious markup',
            'Vanilla JavaScript interactions',
            'Performance-conscious animation implementation'
          ]
        }
      ],
      technicalImplementation: [
        'Built with semantic HTML5 for clear document structure and accessibility-aware content organization.',
        'Styled using CSS3 with a modular architecture: variables.css, base.css, layout.css, components.css, and animations.css.',
        'Implemented responsive behavior and grid/layout adjustments with Bootstrap 5 utilities and custom CSS refinements.',
        'Used Vanilla JavaScript (ES6) for interactive behavior including FAQ accordion, testimonial slider, and navigation state handling.',
        'Applied Intersection Observer-driven motion to avoid heavy scroll handlers and keep animation behavior performant.'
      ],
      engineeringHighlights: [
        'Frontend-only architecture centered on presentation quality and interaction reliability.',
        'Motion strategy balances visual polish with usability via reduced-motion support and controlled animation timing.',
        'Component-level UI patterns (navigation, slider, accordion, cards) are implemented in reusable, maintainable frontend structure.',
        'Performance-aware choices prioritize lightweight interactions and smooth rendering across desktop and mobile devices.'
      ],
      designSystem: {
        palette: ['Warm Ivory', 'Soft Beige', 'Charcoal', 'Muted Gold'],
        typography: ['Playfair Display (headings)', 'Inter (body text)'],
        notes:
          'The UI system combines high-contrast elegant typography with warm neutral tones to present a luxury dining atmosphere.'
      }
    },
    {
      slug: 'cafeteria-management-system',
      title: 'Cafeteria Management System',
      subtitle: 'Cafeteria Ordering System (Team Project)',
      cardImage: 'assets/projects/cafeteria-management-system/image_0.png',
      technologies: ['PHP', 'MySQL', 'Custom MVC'],
      cardSummary: ['Custom MVC', 'Team Project', 'Ordering System'],
      hero: {
        description:
          'A cafeteria ordering system built with a custom PHP MVC architecture and manual routing, developed as a collaborative team project.',
        role: 'Backend / PHP Development (Team Project)',
        links: {
          github: 'https://github.com/Abdullah2elsman/cafeteria-php-project'
        }
      },
      overview:
        'The Cafeteria Management System is a team-built ordering platform implemented in PHP with a custom MVC architecture. It uses manual routing and a MySQL database to manage cafeteria items and orders, demonstrating practical server-side development without a framework.',
      gallery: [
        {
          src: 'assets/projects/cafeteria-management-system/image_1.png',
          alt: 'Cafeteria Management System screenshot 1',
          caption: 'Cafeteria Management System — application screenshot.'
        },
        {
          src: 'assets/projects/cafeteria-management-system/image_2.png',
          alt: 'Cafeteria Management System screenshot 2',
          caption: 'Cafeteria Management System — application screenshot.'
        },
        {
          src: 'assets/projects/cafeteria-management-system/image_3.png',
          alt: 'Cafeteria Management System screenshot 3',
          caption: 'Cafeteria Management System — application screenshot.'
        },
        {
          src: 'assets/projects/cafeteria-management-system/image_4.png',
          alt: 'Cafeteria Management System screenshot 4',
          caption: 'Cafeteria Management System — application screenshot.'
        },
        {
          src: 'assets/projects/cafeteria-management-system/image_5.png',
          alt: 'Cafeteria Management System screenshot 5',
          caption: 'Cafeteria Management System — application screenshot.'
        },
        {
          src: 'assets/projects/cafeteria-management-system/image_6.png',
          alt: 'Cafeteria Management System screenshot 6',
          caption: 'Cafeteria Management System — application screenshot.'
        },
        {
          src: 'assets/projects/cafeteria-management-system/image_7.png',
          alt: 'Cafeteria Management System screenshot 7',
          caption: 'Cafeteria Management System — application screenshot.'
        }
      ],
      keyFeatures: [
        {
          title: 'Architecture',
          items: [
            'Custom PHP MVC structure',
            'Manual routing layer',
            'Separation of concerns'
          ]
        },
        {
          title: 'Data',
          items: [
            'MySQL database integration',
            'Menu and order persistence',
            'Relational data modeling'
          ]
        },
        {
          title: 'Collaboration',
          items: [
            'Built as a team project',
            'Shared Git workflow',
            'Coordinated feature delivery'
          ]
        }
      ],
      technicalImplementation: [
        'PHP backend following a hand-built MVC pattern.',
        'Manual router mapping requests to controllers.',
        'MySQL used for storing menu items and orders.',
        'Views rendered separately from business logic for clarity.'
      ],
      engineeringHighlights: [
        'Framework-free PHP demonstrates core web fundamentals.',
        'Custom MVC keeps the codebase organized and extensible.',
        'Team project emphasizing collaboration and version control.'
      ]
    }
  ];
})();
