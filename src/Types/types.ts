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
          img?: {
            data?: [{
              attributes?: {
                url?: string
              }
            }]
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

export interface AllBlogPostsArray{
  articles: [BlogPostsMainData]
}

export interface HeaderMenuData {
  attributes: {
    url: string;
    title: string;
  }
  id: number
}

export interface HeaderData extends Array<HeaderMenuData>{}

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

export interface MainBanners{
  banners: Array<MainBanner>;
}