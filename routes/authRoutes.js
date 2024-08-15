const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Operaciones de autenticación
 *
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - nombre
 *         - carnet
 *         - sede_id
 *         - rol_id
 *         - curso_id
 *       properties:
 *         user_id:
 *           type: integer
 *           description: ID autogenerado del usuario
 *         email:
 *           type: string
 *           description: Email del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *         nombre:
 *           type: string
 *           description: Nombre del usuario
 *         carnet:
 *           type: string
 *           description: Carnet del usuario
 *         sede_id:
 *           type: integer
 *           description: ID de la sede del usuario
 *         rol_id:
 *           type: integer
 *           description: ID del rol del usuario
 *         curso_id:
 *           type: integer
 *           description: ID del curso del usuario
 *         anioRegistro:
 *           type: integer
 *           description: Año de registro del usuario
 *       example:
 *         email: example@gmail.com
 *         password: example123
 *         nombre: Juan Pérez
 *         carnet: 123456789
 *         sede_id: 1
 *         anioRegistro: 2021
 *         curso_id: 1
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error en la creación del usuario
 */
router.post('/register', authController.registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión con un usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *               sede_id:
 *                type: integer
 *                description: ID de la sede del usuario
 *             example:
 *               email: example@gmail.com
 *               password: example123
 *               sede_id: 1
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Credenciales inválidas
 */
router.post('/login', authController.loginUser);

/**
 * @swagger
 * /auth/update:
 *   put:
 *     summary: Actualiza la contraseña del usuario
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: Nueva contraseña del usuario
 *             example:
 *               password: "newpassword123"
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *       400:
 *         description: Error al actualizar la contraseña
 */
router.put('/update', authMiddleware, authController.updateUser);

module.exports = router;
