import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://autonomek.com';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          'es-CO': baseUrl,
          'es-MX': `${baseUrl}/mx`,
          'es-ES': `${baseUrl}/es`,
          'en-US': `${baseUrl}/us`,
        },
      },
    },
    {
      url: `${baseUrl}/mx`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          'es-CO': baseUrl,
          'es-MX': `${baseUrl}/mx`,
          'es-ES': `${baseUrl}/es`,
          'en-US': `${baseUrl}/us`,
        },
      },
    },
    {
      url: `${baseUrl}/es`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          'es-CO': baseUrl,
          'es-MX': `${baseUrl}/mx`,
          'es-ES': `${baseUrl}/es`,
          'en-US': `${baseUrl}/us`,
        },
      },
    },
    {
      url: `${baseUrl}/us`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          'es-CO': baseUrl,
          'es-MX': `${baseUrl}/mx`,
          'es-ES': `${baseUrl}/es`,
          'en-US': `${baseUrl}/us`,
        },
      },
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          'es-CO': `${baseUrl}/servicios`,
          'en-US': `${baseUrl}/us/services`,
        }
      }
    },
    {
      url: `${baseUrl}/us/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          'es-CO': `${baseUrl}/servicios`,
          'en-US': `${baseUrl}/us/services`,
        }
      }
    },
    {
      url: `${baseUrl}/servicios/paginas-web-alto-rendimiento`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          'es-CO': `${baseUrl}/servicios/paginas-web-alto-rendimiento`,
          'en-US': `${baseUrl}/us/services/high-performance-websites`,
        }
      }
    },
    {
      url: `${baseUrl}/us/services/high-performance-websites`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          'es-CO': `${baseUrl}/servicios/paginas-web-alto-rendimiento`,
          'en-US': `${baseUrl}/us/services/high-performance-websites`,
        }
      }
    },
    {
      url: `${baseUrl}/servicios/agentes-inteligencia-artificial`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          'es-CO': `${baseUrl}/servicios/agentes-inteligencia-artificial`,
          'en-US': `${baseUrl}/us/services/ai-agents`,
        }
      }
    },
    {
      url: `${baseUrl}/us/services/ai-agents`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          'es-CO': `${baseUrl}/servicios/agentes-inteligencia-artificial`,
          'en-US': `${baseUrl}/us/services/ai-agents`,
        }
      }
    },
    {
      url: `${baseUrl}/servicios/automatizacion-de-procesos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          'es-CO': `${baseUrl}/servicios/automatizacion-de-procesos`,
          'en-US': `${baseUrl}/us/services/process-automation`,
        }
      }
    },
    {
      url: `${baseUrl}/us/services/process-automation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          'es-CO': `${baseUrl}/servicios/automatizacion-de-procesos`,
          'en-US': `${baseUrl}/us/services/process-automation`,
        }
      }
    },
    {
      url: `${baseUrl}/servicios/software-a-medida`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          'es-CO': `${baseUrl}/servicios/software-a-medida`,
          'en-US': `${baseUrl}/us/services/custom-software`,
        }
      }
    },
    {
      url: `${baseUrl}/us/services/custom-software`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          'es-CO': `${baseUrl}/servicios/software-a-medida`,
          'en-US': `${baseUrl}/us/services/custom-software`,
        }
      }
    },
    {
      url: `${baseUrl}/proyectos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          'es-CO': `${baseUrl}/proyectos`,
          'en-US': `${baseUrl}/us/projects`,
        }
      }
    },
    {
      url: `${baseUrl}/us/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          'es-CO': `${baseUrl}/proyectos`,
          'en-US': `${baseUrl}/us/projects`,
        }
      }
    },
    {
      url: `${baseUrl}/legal`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
      alternates: {
        languages: {
          'es-CO': `${baseUrl}/legal`,
          'en-US': `${baseUrl}/us/legal`,
        }
      }
    },
    {
      url: `${baseUrl}/us/legal`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
      alternates: {
        languages: {
          'es-CO': `${baseUrl}/legal`,
          'en-US': `${baseUrl}/us/legal`,
        }
      }
    },
    {
      url: `${baseUrl}/start`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          'es-CO': `${baseUrl}/start`,
          'en-US': `${baseUrl}/us/start`,
        }
      }
    },
    {
      url: `${baseUrl}/us/start`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          'es-CO': `${baseUrl}/start`,
          'en-US': `${baseUrl}/us/start`,
        }
      }
    },
  ];
}
