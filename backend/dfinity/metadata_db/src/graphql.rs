use sudograph::graphql_database;

graphql_database!("backend/dfinity/metadata_db/src/schema.graphql"); //.map_err(|err| println!("{:?}", err));