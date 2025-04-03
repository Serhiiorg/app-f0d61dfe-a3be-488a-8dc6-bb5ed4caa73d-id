
    CREATE TABLE users
    (
      ID UUID DEFAULT UUID_GENERATE_V4()::UUID NOT NULL,
      value jsonb NOT NULL,
      PRIMARY KEY(ID)
    );


    CREATE TABLE products
    (
      ID UUID DEFAULT UUID_GENERATE_V4()::UUID NOT NULL,
      value jsonb NOT NULL,
      PRIMARY KEY(ID)
    );


    CREATE TABLE orders
    (
      ID UUID DEFAULT UUID_GENERATE_V4()::UUID NOT NULL,
      value jsonb NOT NULL,
      PRIMARY KEY(ID)
    );


    CREATE TABLE order_items
    (
      ID UUID DEFAULT UUID_GENERATE_V4()::UUID NOT NULL,
      value jsonb NOT NULL,
      PRIMARY KEY(ID)
    );


    CREATE TABLE categories
    (
      ID UUID DEFAULT UUID_GENERATE_V4()::UUID NOT NULL,
      value jsonb NOT NULL,
      PRIMARY KEY(ID)
    );
