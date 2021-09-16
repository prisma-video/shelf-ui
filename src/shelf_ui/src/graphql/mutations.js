/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMovie = /* GraphQL */ `
  mutation CreateMovie(
    $input: CreateMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    createMovie(input: $input, condition: $condition) {
      id
      title
      original_title
      description
      trailer_url
      thumbnail_img
      pg_rating
      tags
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
export const updateMovie = /* GraphQL */ `
  mutation UpdateMovie(
    $input: UpdateMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    updateMovie(input: $input, condition: $condition) {
      id
      title
      original_title
      description
      trailer_url
      thumbnail_img
      pg_rating
      tags
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
export const deleteMovie = /* GraphQL */ `
  mutation DeleteMovie(
    $input: DeleteMovieInput!
    $condition: ModelMovieConditionInput
  ) {
    deleteMovie(input: $input, condition: $condition) {
      id
      title
      original_title
      description
      trailer_url
      thumbnail_img
      pg_rating
      tags
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      movieID
      movie {
        id
        title
        original_title
        description
        trailer_url
        thumbnail_img
        pg_rating
        tags
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      movieID
      movie {
        id
        title
        original_title
        description
        trailer_url
        thumbnail_img
        pg_rating
        tags
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      movieID
      movie {
        id
        title
        original_title
        description
        trailer_url
        thumbnail_img
        pg_rating
        tags
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
