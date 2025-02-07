type Locale = 'ar' | 'en'

export type Dictionary = {
  hero: {
    title: string
    subtitle: string
    cta: string
  }
  featuredProducts: {
    title: string
    addToCart: string
  }
  services: {
    title: string
    languages: {
      title: string
      description: string
    }
    documents: {
      title: string
      description: string
    }
    turnaround: {
      title: string
      description: string
    }
    experts: {
      title: string
      description: string
    }
    pageTitle: string
    list: {
      [key: string]: {
        title: string
        shortDescription: string
        longDescription: string
      }
    }
    learnMore: string
  }
  quoteRequest: {
    title: string
    description: string
  }
  cta: {
    title: string
    description: string
    button: string
  }
  navigation: {
    [key: string]: string
  }
  contact: {
    title: string
    formTitle: string
    formDescription: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    submitButton: string
  }
  languages: string[]
  currency: string
}

// const dictionaries = {
//   en: () => import("@/dictionaries/en.json").then((module) => module.default),
//   ar: () => import("@/dictionaries/ar.json").then((module) => module.default),
// }

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  // Return a dummy dictionary object
  return {
    hero: {
      title: "Dummy Title",
      subtitle: "Dummy Subtitle",
      cta: "Dummy CTA",
    },
    featuredProducts: {
      title: "Dummy Featured Products",
      addToCart: "Add to Cart",
    },
    services: {
      title: "Dummy Services",
      languages: {
        title: "Languages",
        description: "Dummy description",
      },
      documents: {
        title: "Documents",
        description: "Dummy description",
      },
      turnaround: {
        title: "Turnaround",
        description: "Dummy description",
      },
      experts: {
        title: "Experts",
        description: "Dummy description",
      },
      pageTitle: "Services Page",
      list: {},
      learnMore: "Learn More",
    },
    quoteRequest: {
      title: "Quote Request",
      description: "Dummy description",
    },
    cta: {
      title: "CTA Title",
      description: "CTA Description",
      button: "CTA Button",
    },
    navigation: {},
    contact: {
      title: "Contact",
      formTitle: "Contact Form",
      formDescription: "Contact Form Description",
      nameLabel: "Name",
      namePlaceholder: "Enter your name",
      emailLabel: "Email",
      emailPlaceholder: "Enter your email",
      messageLabel: "Message",
      messagePlaceholder: "Enter your message",
      submitButton: "Submit",
    },
    languages: ["English", "Arabic"],
    currency: "$",
  }
}

