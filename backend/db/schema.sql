CREATE TABLE users IF NOT EXISTS (
    UserID INT PRIMARY KEY,
    Email VARCHAR(64) PRIMARY KEY, 
    Password VARCHAR(32), 
    Username VARCHAR(64),
    Region CHAR(3),
    Avatar TEXT,
    Fecha_Registro DATE,
    Notifications BOOLEAN,
    Perfil_Publico BOOLEAN,
    GoogleID VARCHAR(30),
)
CREATE TABLE books IF NOT EXISTS (
    BookID VARCHAR(64) PRIMARY KEY,
    Title VARCHAR(512) PRIMARY KEY,
    Sinopsis TEXT, 
    Autores TEXT,
    Portada TEXT,
    Paginas INT,
    Idioma CHAR(15),
    Link_Compra TEXT,
    Link_Gratis TEXT,
    Fecha_Publicacion DATE,
    Google_Books_ID VARCHAR(512) PRIMARY KEY, 
    Fecha_Cacheada DATE,
    Cantidad_Interacciones SMALLINT,
)
CREATE TABLE categorias IF NOT EXISTS (
    CategoryID INT PRIMARY KEY,
    Category_Name VARCHAR(64) PRIMARY KEY,
)
CREATE TABLE book_in_category IF NOT EXISTS (
    BookID INT PRIMARY KEY,
    CategoryID INT PRIMARY KEY,
)
CREATE TABLE preference_category IF NOT EXISTS (
    UserID INT PRIMARY KEY,
    CategoryID INT PRIMARY KEY, 
    Preference_Weight SMALLINT,  
)
CREATE TABLE preferences IF NOT EXISTS (
    PreferenceID INT PRIMARY KEY,
    UserID INT PRIMARY KEY,
    BookID INT PRIMARY KEY,
)
CREATE TABLE books_progress IF NOT EXISTS (
    ProgressID INT PRIMARY KEY,
    UserID INT PRIMARY KEY, 
    BookID INT PRIMARY KEY, 
    Book_State VARCHAR(13), -- 13 porque el más grande es "abandonado". Lo voy a cambiar dsp si cambiamos como funciona esto.
    /* Se puede cambiar a ENUM si confirmamos que vamos a usar un POSGRESQL */
    Puntuacion INT, 
    Amount_Read INT, 
    Starting_Date DATE, 
)
CREATE TABLE reviews IF NOT EXISTS (
    BookID INT PRIMARY KEY,
    UserID INT PRIMARY KEY, 
    ReviewID INT PRIMARY KEY, 
    Review_Content TEXT, 
    Creation_Date DATE,
)
CREATE TABLE followers IF NOT EXISTS (
    FollowingID INT PRIMARY KEY,
    FollowerID INT PRIMARY KEY, 
    FollowedID INT PRIMARY KEY,
    Following_Date DATE, 
)
CREATE TABLE list IF NOT EXISTS (
    ListID INT PRIMARY KEY,
    UserID INT PRIMARY KEY, 
    List_Name VARCHAR(64) PRIMARY KEY, 
    Is_Public BOOLEAN,
    Date_Created DATE, 
)
CREATE TABLE books_in_list IF NOT EXISTS (
    Book_In_ListID INT PRIMARY KEY,
    BookID INT PRIMARY KEY,
    ListID INT PRIMARY KEY, 
    Order SMALLINT, 
)
CREATE TABLE likes IF NOT EXISTS (
    UserID INT PRIMARY KEY,
    ListID INT PRIMARY KEY, 
)