/*
ACLARACIONES:

1. Uso interface en cambio de type porque no usa = y usa :, es mas lindo
2. Se que el espacio es horrible pero se hizo como se hizo
3. Estos tipos se van a usar para guardarlos temporalmente y mandarlos al JSON

*/
export interface User {
id: number;
nombre: string;
email: string;
password: string;
region: string;
avatar: string;
notifications: boolean;
fecha_registro: string;
perfil_publico: boolean;
}
export interface Books {
id: number; 
google_id: string;
title: string;
description: string;
authors: string[];
portada: string;
cantidad_paginas: number;
idioma: string;
link_compra: string;
link_gratis: string;
fecha_publicacion: string;
cantidad_interacciones: number;
// Habria que, en algun momento, hacer una funcion que lo quen no nos da google books lo ponga como "" (un empty string)
}
export interface Categorias {
id: number;
nombre: string;
}
export interface Libros_Categoria {
id_libro: number; 
id_categoria: number[];
}
export interface Preferencias_Categoria {
id_usuario: number;
id_categoria: number;
peso: number
}
export interface Preferencias {
preferencia_id: number;
id_usuario: number;
id_libro: number;
}
export interface Progreso {
id_progreso: number;
id_usuario: number;
id_libro: number;
estado_libro: string;
puntuacion: number;
cantidad_leida: number;
fecha_iniciada: string;
}
export interface Reviews {
id_libro: number; 
id_usuario: number;
id_review: number;
contenido: string; 
fecha_creada: string; 
}
export interface Followers {
id_seguidor: number;
id_seguido: number;
id_seguicion: number;
fecha_seguicion: string;
}
export interface Lists {
id_lista: number;
id_libro: number; 
nombre: string;
es_publica: boolean;
fecha_creada: string;
}
export interface Libros_En_Listas {
id_libro_en_lista: number;
id_libro: number;
id_lista: number;
orden_libro: number;
}
export interface Likes {
id_usuario: number;
id_lista: number;
}
export interface DB {
    users: [],  
    books: [],
    categories: [],
    book_categories: [],
    category_preferences: [],
    preferences: [],
    book_progress: [],
    reviews: [], 
    followers: [],
    likes: [],
    lists: [],
    list_books: []
}