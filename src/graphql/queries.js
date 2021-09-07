/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMovie = /* GraphQL */ `
  query GetMovie($id: ID!) {
    getMovie(id: $id) {
      id
      name
      original_name
      description
      trailer_url
      thumbnail_img
      pg_rating
      production_date
      release_date
      revenue
      box_office
      imbd_url
      imbd_score
      rotten_tomatoes_url
      rotten_tomatoes_score
      directors
      writers
      producers
      actors
      comments {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listMovies = /* GraphQL */ `
  query ListMovies(
    $filter: ModelMovieFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMovies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        original_name
        description
        trailer_url
        thumbnail_img
        pg_rating
        production_date
        release_date
        revenue
        box_office
        imbd_url
        imbd_score
        rotten_tomatoes_url
        rotten_tomatoes_score
        directors
        writers
        producers
        actors
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      movieID
      movie {
        id
        name
        original_name
        description
        trailer_url
        thumbnail_img
        pg_rating
        production_date
        release_date
        revenue
        box_office
        imbd_url
        imbd_score
        rotten_tomatoes_url
        rotten_tomatoes_score
        directors
        writers
        producers
        actors
        createdAt
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        movieID
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
