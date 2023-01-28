import { gql } from "@apollo/client";

export const GET_FOUR_LATESTS_POSTS = gql`
query GET_FOUR_LATESTS_POSTS {
	articles(sort: "id:desc", pagination: { start: 0, limit: 4 }) {
    data {
      id
      attributes {
        title
        url
        updatedAt
        category
        isTrending
        isTopPick
        readingTime
        previewText
        author {
          data {
            attributes {
               name
               img {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
        mainImage {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
	}
}
`

export const GET_PICK_POSTS = gql`
query GET_PICK_POSTS {
	articles(filters: { isTopPick: { eq: true }}, sort: "id:desc", pagination: { start: 0, limit: 4 }) {
    data {
      id
      attributes {
        title
        url
        updatedAt
        category
        isTrending
        isTopPick
        readingTime
        previewText
        author {
          data {
            attributes {
               name
               img {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
        mainImage {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
	}
}
`

export const GET_BEAUTY_POSTS = gql`
query GET_BEAUTY_POSTS {
	articles(filters: { category: {eq: "Beauty"}}, sort: "id:desc", pagination: { start: 0, limit: 6 })  {
    data {
      id
      attributes {
        title
        url
        updatedAt
        category
        isTrending
        isTopPick
        readingTime
        previewText
        author {
          data {
            attributes {
               name
               img {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
        mainImage {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
	}
}
`

export const GET_WELLNESS_POSTS = gql`
query GET_WELLNESS_POSTS {
	articles(filters: { category: {eq: "Food & Wellness"}}, sort: "id:desc", pagination: { start: 0, limit: 6 })  {
    data {
      id
      attributes {
        title
        url
        updatedAt
        category
        isTrending
        isTopPick
        readingTime
        previewText
        author {
          data {
            attributes {
               name
               img {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
        mainImage {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
	}
}
`

export const GET_FASHION_POSTS = gql`
query GET_FASHION_POSTS {
	articles(filters: { category: {eq: "Fashion & Style"}}, sort: "id:desc", pagination: { start: 0, limit: 6 })  {
    data {
      id
      attributes {
        title
        url
        updatedAt
        category
        isTrending
        isTopPick
        readingTime
        previewText
        author {
          data {
            attributes {
               name
               img {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
        mainImage {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
	}
}
`

export const GET_LIFESTYLE_POSTS = gql`
query GET_LIFESTYLE_POSTS {
	articles(filters: { category: {eq: "Lifestyle"}}, sort: "id:desc", pagination: { start: 0, limit: 6 })  {
    data {
      id
      attributes {
        title
        url
        updatedAt
        category
        isTrending
        isTopPick
        readingTime
        previewText
        author {
          data {
            attributes {
               name
               img {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
        mainImage {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
	}
}
`

export const GET_TRENDING_POSTS = gql`
query {
	articles(filters: { isTrending: { eq: true }}, sort: "id:desc", pagination: { start: 0, limit: 2 })  {
    data {
      id
      attributes {
        title
        url
        updatedAt
        category
        isTrending
        isTopPick
        readingTime
        previewText
        author {
          data {
            attributes {
               name
               img {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
        mainImage {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
	}
}
`

export const GET_FOOTER_MENU = gql`
query GET_FOOTER_MENU {
	renderNavigation(
    navigationIdOrSlug: "1"
    type: TREE
    menuOnly: false
  ) {
    id
    title
    type
    related {
      id
    }
    items {
      id
      title
      type
      items {
        id
        title
        type
        path
        externalPath
      }
    }
  }
}
`

export const GET_MAIN_BANNER = gql`
query GET_MAIN_BANNER {
	homepage {
    data {
      id
      attributes {
        articles {
          data {
            attributes {
              title
              url
              readingTime
              updatedAt
              category
              author {
                data {
                  attributes {
                    name
                  }
                }
              }
              mainImage {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`

export const GET_BLOG_SLUGS = gql`
  query GET_BLOG_SLUGS {
    articles {
      data {
        attributes {
          url
        }
      }
    }
  }
`

export const ARTICLE_DATA = gql`
  query ($slugUrl: String!) {
	articles(filters: { url: { eq: $slugUrl }}) {
    data {
      attributes {
        url
        title
        category
        content
        readingTime
        mainImage {
          data {
            attributes {
              url
            }
          }
        }
      }
    }
	}
}
`
