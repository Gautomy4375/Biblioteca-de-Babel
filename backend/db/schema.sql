CREATE TABLE IF NOT EXISTS users (
    UserID INT PRIMARY KEY,
    Email VARCHAR(64) NOT NULL UNIQUE, 
    Password VARCHAR(256) NOT NULL, 
    Username VARCHAR(256) UNIQUE, 
    Region CHAR(3),
    Avatar TEXT,
    Fecha_Registro DATE,
    Notifications BOOLEAN,
    Perfil_Publico BOOLEAN,
    GoogleID VARCHAR(30) UNIQUE
)
CREATE TABLE IF NOT EXISTS books (
    BookID INT PRIMARY KEY,
    Title VARCHAR(512),
    Sinopsis TEXT, 
    Autores TEXT,
    Portada TEXT,
    Paginas INT,
    Idioma CHAR(15),
    Link_Compra TEXT,
    Link_Gratis TEXT,
    Fecha_Publicacion DATE,
    Google_Books_ID VARCHAR(30) NOT NULL UNIQUE, 
    Fecha_Cacheada DATE,
    Cantidad_Interacciones SMALLINT
)
CREATE TABLE IF NOT EXISTS categorias (
    CategoryID INT PRIMARY KEY,
    Category_Name VARCHAR(64) NOT NULL
)
CREATE TABLE IF NOT EXISTS book_in_category (
    BookID INT,
    CategoryID INT,

    PRIMARY KEY(BookID, CategoryID),

    FOREIGN KEY (BookID) REFERENCES books(BookID),
    FOREIGN KEY (CategoryID) REFERENCES categorias(CategoryID)
)
CREATE TABLE IF NOT EXISTS preference_category (
    UserID INT,
    CategoryID INT, 
    Preference_Weight SMALLINT,  

    PRIMARY KEY(UserID, CategoryID),

     FOREIGN KEY (UserID) REFERENCES users(UserID),
     FOREIGN KEY (CategoryID) REFERENCES categorias(CategoryID)
)
CREATE TABLE IF NOT EXISTS preferences (
    PreferenceID INT PRIMARY KEY,
    UserID INT NOT NULL,
    BookID INT NOT NULL,

     UNIQUE(BookID, UserID),
     FOREIGN KEY (UserID) REFERENCES users(UserID),
     FOREIGN KEY (BookID) REFERENCES books(BookID)
)
CREATE TABLE IF NOT EXISTS books_progress (
    ProgressID INT PRIMARY KEY,
    UserID INT NOT NULL, 
    BookID INT NOT NULL, 
    Book_State VARCHAR(13), -- 13 porque el más grande es "abandonado". Lo voy a cambiar dsp si cambiamos como funciona esto.
    /* Se puede cambiar a ENUM si confirmamos que vamos a usar un POSGRESQL */
    Puntuacion INT, 
    Amount_Read INT, 
    Starting_Date DATE, 

     /* UNIQUE(BookID, UserID), */  -- Se puede agregar despues. no estoy seguro como va a funcionar esto asi q por ahora lo dejo asi
     FOREIGN KEY (UserID) REFERENCES users(UserID),
     FOREIGN KEY (BookID) REFERENCES books(BookID)
)
CREATE TABLE IF NOT EXISTS reviews (
    BookID INT NOT NULL,
    UserID INT NOT NULL, 
    ReviewID INT PRIMARY KEY, 
    Review_Content TEXT, 
    Creation_Date DATE,

    UNIQUE(BookID, UserID),
     FOREIGN KEY (UserID) REFERENCES users(UserID),
     FOREIGN KEY (BookID) REFERENCES books(BookID)
)
CREATE TABLE IF NOT EXISTS followers (
    FollowingID INT PRIMARY KEY,
    FollowerID INT NOT NULL, 
    FollowedID INT NOT NULL,
    Following_Date DATE, 

    UNIQUE(FollowerID, FollowedID),
    FOREIGN KEY (FollowerID) REFERENCES users(UserID),
    FOREIGN KEY (FollowedID) REFERENCES users(UserID)
)
CREATE TABLE IF NOT EXISTS lists (
    listsID INT PRIMARY KEY,
    UserID INT NOT NULL, 
    lists_Name VARCHAR(64) NOT NULL, 
    Is_Public BOOLEAN,
    Date_Created DATE, 

    UNIQUE(UserID, lists_Name),
     FOREIGN KEY (UserID) REFERENCES users(UserID)
)
CREATE TABLE IF NOT EXISTS books_in_lists (
    Book_In_listsID INT PRIMARY KEY,
    BookID INT NOT NULL,
    listsID INT NOT NULL, 
    Book_Order SMALLINT, 

    UNIQUE(BookID, listsID),
    FOREIGN KEY (BookID) REFERENCES books(BookID),
    FOREIGN KEY (listsID) REFERENCES lists(listsID)
)
CREATE TABLE IF NOT EXISTS likes (
    UserID INT,
    listsID INT, 

    PRIMARY KEY(UserID, listsID),
     FOREIGN KEY (UserID) REFERENCES users(UserID), 
     FOREIGN KEY (listsID) REFERENCES lists(listsID)
)