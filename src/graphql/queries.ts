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
               url
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
               url
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
                url
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
                url
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
    articles(filters: { category: {eq: "Fashion & Style"}}, sort: "id:desc", pagination: { start: 0, limit: 9 })  {
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
                url
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
    articles(filters: { category: {eq: "Lifestyle"}}, sort: "id:desc", pagination: { start: 0, limit: 9 })  {
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
                url
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
               url
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

export const GET_HEADER_MENU = gql`
  query GET_HEADER_MENU {
    renderNavigation(
      navigationIdOrSlug: "2"
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
        path
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
                      url
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
  query ARTICLE_DATA ($slugUrl: String!) {
    articles(filters: { url: { eq: $slugUrl }}) {
      data {
        id
        attributes {
          url
          title
          category
          content
          readingTime
          updatedAt
          mainImage {
            data {
              attributes {
                url
              }
            }
          }
          author {
            data {
              attributes {
                name
                url
                jobTitle
                instagram
                twitter
                website
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
          seo {
            metaTitle
            metaDescription
            canonicalURL
          }
          tags {
            data {
              attributes {
                tag
                url
              }
            }
          }
          relatedArticles {
            data {
              attributes {
                title
                url
                readingTime
                updatedAt
                author {
                  data {
                    attributes {
                      name
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

export const GET_NEXT_POST = gql`
  query GET_NEXT_PREV_POST ($id: ID!) {
    articles(filters: { id: { eq: $id }}) {
      data {
        attributes {
          url
          title
        }
      }
    }
  }
`

export const GET_LATEST_CATEGORY_POSTS = gql`
  query GET_LATEST_CATEGORY_POSTS ($category: String!, $id: ID!) {
    articles(filters: {category: {eq: $category}, id: {ne: $id} }, sort: "id:desc", pagination: { start: 0, limit: 4 })  {
      data {
        id
        attributes {
          title
          url
          updatedAt
          category
          readingTime
          author {
            data {
              attributes {
                name
                url
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

export const TAG_DATA = gql`
  query TAG_DATA ($slugUrl: String!) {
    tags(filters: { url: { eq: $slugUrl }}) {
      data {
        id
        attributes {
          tag
          url
          description
          seo {
            metaTitle
            metaDescription
            canonicalURL
          }
        }
      }
    }
  }
`

export const AUTHOR_DATA = gql`
  query LATESTS_POSTS_BY_TAG ($slugUrl: String!)  {
    authors (filters: { url: { eq: $slugUrl }}) {
      data {
        attributes {
          name
          jobTitle
          description
          instagram
          twitter
          website
          url
          Expertise {
            text
          }
          img {
            data {
            attributes {
                url
              }
            }
          }
          seo {
            metaTitle
            metaDescription
            canonicalURL
          }
        }
      }
    }
  }
`

export const LATESTS_POSTS_BY_TAG = gql`
  query LATESTS_POSTS_BY_TAG ($tag: String!, $page: Int!) {
	articles (filters: {tags:{url: {contains: $tag}}}, pagination: {page: $page, pageSize: 6}, sort: "id:desc")  {
    data {
      id
      attributes {
        title
        url
        updatedAt
        category
        readingTime
        previewText
        tags {
          data {
            attributes {
              tag
            }
          }
        }
        author {
          data {
            attributes {
               name
               url
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
    meta {
      pagination {
        pageSize
        pageCount
        page
        total
      }
    }
	}
}
`

export const BEAUTY_PAGE = gql`
  query BEAUTY_PAGE {
    beauty {
      data {
        attributes {
          title
          description
          seo {
            metaTitle
            metaDescription
            canonicalURL
          }
        }
      }
    }
  }
`

export const LIFESTYLE_PAGE = gql`
  query LIFESTYLE_PAGE {
    lifestyle {
      data {
        attributes {
          title
          description
          seo {
            metaTitle
            metaDescription
            canonicalURL
          }
        }
      }
    }
  }
`

export const FASHION_PAGE = gql`
  query FASHION_PAGE {
    fashionAndStyle {
      data {
        attributes {
          title
          description
          seo {
            metaTitle
            metaDescription
            canonicalURL
          }
        }
      }
    }
  }
`

export const FOOD_PAGE = gql`
  query FOOD_PAGE {
    foodAndWellness {
      data {
        attributes {
          title
          description
          seo {
            metaTitle
            metaDescription
            canonicalURL
          }
        }
      }
    }
  }
`

export const LATESTS_POSTS_BY_CATEGORY = gql`
  query LATESTS_POSTS_BY_CATEGORY ($category: String!, $page: Int!) {
    articles (filters: {category: {contains: $category}}, pagination: {page: $page, pageSize: 6}, sort: "id:desc")  {
      data {
        id
        attributes {
          title
          url
          updatedAt
          category
          readingTime
          previewText
          tags {
            data {
              attributes {
                tag
              }
            }
          }
          author {
            data {
              attributes {
                name
                url
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
      meta {
        pagination {
          pageSize
          pageCount
          page
          total
        }
      }
    }
  }
`

export const LATESTS_POSTS_BY_AUTHOR = gql`
  query LATESTS_POSTS_BY_TAG ($author: String!, $page: Int!) {
	articles (filters: {author: {url: {contains: $author}}}, pagination: {page: $page, pageSize: 6}, sort: "id:desc")  {
    data {
      id
      attributes {
        title
        url
        updatedAt
        category
        readingTime
        previewText
        tags {
          data {
            attributes {
              tag
            }
          }
        }
        author {
          data {
            attributes {
               name
               url
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
    meta {
      pagination {
        pageSize
        pageCount
        page
        total
      }
    }
	}
}
`

export const GET_PRIVACY_NOTICE = gql`
  query GET_PRIVACY_NOTICE {
    privacyNotice {
      data {
        attributes {
          title
          content
          seo {
            metaTitle
            metaDescription
            canonicalURL
          }
        }
      }
    }
  }
`

export const GET_COOKIES = gql`
  query GET_COOKIES {
    cookies {
      data {
        attributes {
          name
          description
          host
          duration
        }
      }
    }
  }
`