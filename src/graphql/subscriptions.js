/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMovie = /* GraphQL */ `
  subscription OnCreateMovie {
    onCreateMovie {
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
export const onUpdateMovie = /* GraphQL */ `
  subscription OnUpdateMovie {
    onUpdateMovie {
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
export const onDeleteMovie = /* GraphQL */ `
  subscription OnDeleteMovie {
    onDeleteMovie {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
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
