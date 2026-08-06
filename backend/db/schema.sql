CREATE TABLE users IF NOT EXISTS (
    UserID INT PRIMARY KEY,
    Email VARCHAR(64) PRIMARY KEY, 
    Password VARCHAR(32), 
    Username VARCHAR(64),
    Region CHAR(3),
    Avatar VARCHAR(2048),
    Fecha_Registro DATE
    Notifications BOOLEAN
    Perfil_Publico BOOLEAN
    GoogleID VARCHAR(30)
)