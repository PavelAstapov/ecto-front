export interface AllBlogPosts {
  articles: {
    data: {
      id: string
      attributes: {
        title: string
        url: string
        updatedAt: string
        category: string
        isTrending: boolean
        isTopPick: boolean
        readingTime: string
        previewText: string
        author: {
          data: {
            attributes: {
              name: string
              img: {
                data: [{
                  attributes: {
                    url: string
                  }
                }]
              }
            }
          }
        }
        mainImage: {
          data: {
            attributes: {
              url: string
            }
          }
        }
      }
    }
  }
}

export interface PreviewBlogData {
  id?: string
  attributes: {
    title: string
    url: string
    readingTime: string
    updatedAt: string
    category?: string
    author: {
      data: {
        attributes: {
          name: string
          url: string
          img?: {
            data?: {
              attributes?: {
                url?: string
              }
            }
          }
        }
      }
    }
    mainImage?: {
      data?: {
        attributes?: {
          url?: string
        }
      }
    }
  }
}

export interface MainBanner {
  attributes: {
    title: string
    url: string
    readingTime: string
    updatedAt: string
    category: string
    author: {
      data: {
        attributes: {
          name: string
          url: string
        }
      }
    }
    mainImage: {
      data: {
        attributes: {
          url: string
        }
      }
    }
  }
}


export interface BlogPostsMainData {
  id?: string
  attributes: {
    title: string
    url: string
    updatedAt: string
    category: string
    isTrending: boolean
    isTopPick: boolean
    readingTime: string
    previewText: string
    author: {
      data: {
        attributes: {
          name: string
          url: string
          img: {
            data: {
              attributes: {
                url: string
              }
            }
          }
        }
      }
    }
    mainImage: {
      data: {
        attributes: {
          url: string
        }
      }
    }
  }
}

export interface AllBlogPostsArray{
  articles: [BlogPostsMainData]
}

export interface HeaderMenuData {
  menu:[{
    id: number,
    title: string,
    path: string,
  }]
}

export interface HeaderData{
    id: number,
    title: string,
    path: string,
}

export interface FooterSubMenu {
  id: number,
  title: string,
  path: string,
}

export interface FooterData{
  menu: [{
    id: number,
    title: string,
    items: FooterSubMenu[],
  }]
}

export interface FooterMenuData {
  id: number;
  title: string;
  items: FooterSubMenu[];
}

export interface StaticPage{
  title: string,
  content?: string,
  seo: {
    metaTitle: string,
    metaDescription: string,
    canonicalURL: string,
  }
}

export interface ContactUs extends StaticPage{
  title: string,
  description: string,
  ourCommitment: string,
  artDescription: string,
  artPhone: string,
  artEmail: string,
  artAddress: string,
}

export interface SeoData {
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string
    canonicalURL: string
    metaImage: {
      data: {
        attributes: {
          url :string
        }
      }
    }
  }
}