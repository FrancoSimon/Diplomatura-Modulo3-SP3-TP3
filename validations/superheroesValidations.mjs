import { body, param } from 'express-validator';

// Validacion para creación y actualización del superheroe
export const superheroeValidations = [
  body('nombreSuperheroe')
    .notEmpty()
    .withMessage('El nombre de superhéroe es requerido')
    .escape()
    .trim()
    .isLength({ min: 3, max: 60 })
    .withMessage('El nombre de superhéroe debe tener entre 3 y 60 caracteres'),
    
  body('nombreReal')
    .notEmpty()
    .escape()
    .withMessage('El nombre real del superheroe es requerido')
    .trim()
    .isLength({ min: 3, max: 60 })
    .withMessage('El nombre real del superheroe debe tener entre 3 y 60 caracteres'),
    
  body('edad')
    .notEmpty()
    .escape()
    .isNumeric()
    .withMessage('La edad del superheroe es requerida')
    .trim()
    .isInt({ min: 0 })
    .withMessage('La edad del superheroe debe ser un número entero positivo'),
    
  body('poderes')
    .isArray({ min: 1 }).withMessage('Debe proporcionar al menos un poder del superheroe')
    //.custom: permite definir una validacion personalizada, la funcion (poderes) recibe el valor del array 
    //poderes.every: metodo que verifica que todos los elementos del array cumplan la condicion (retorna tru o false)
    //condiciones: typeof poder==='string' veririca que el elmento no acepate numero, bolleanos, etc
    // poder.trim() elimina espacios en blalncos al inico y final
    .custom((poderes) => {
      return poderes.every(poder => 
        typeof poder === 'string' && 
        poder.trim() && 
        poder.trim().length >= 3 && 
        poder.trim().length <= 60
      );
    }).withMessage('Cada poder del superheroe debe ser un string de 3 a 60 caracteres sin espacios en blanco')
];

// Validación para parametros de nombre del superheroe
export const nombreParamValidation = [
  param('nombre')
    .notEmpty().withMessage('El nombre del superheroe es requerido')
    .trim()
    .isLength({ min: 3, max: 60 }).withMessage('El nombre del superheroe debe tener entre 3 y 60 caracteres')
];

// Validación para parametros de ID del superheroe
export const idParamValidation = [
  param('id')
    .notEmpty().withMessage('El ID del superheore es requerido')
    .isMongoId().withMessage('El ID del superheroe debe ser un ID válido')
];
