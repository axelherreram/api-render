const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Roles = require("./roles");
const Sede = require("./sede");

const Usuarios = sequelize.define(
  "Usuarios",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    carnet: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    anioRegistro: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: new Date().getFullYear(),
    },
    sede_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Sede,
        key: "sede_id",
      },
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      references: {
        model: Roles,
        key: "rol_id",
      },
    },
    FotoPerfil: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "Usuarios",
  }
);

Usuarios.associate = function (models) {
  Usuarios.hasMany(models.CursoAsignacion, { foreignKey: "estudiante_id" });
  // Relación de muchos a uno entre usuarios y asignaciones como estudiantes
  Usuarios.hasMany(models.AsignacionEstudiante, {
    foreignKey: "estudiante_id",
    as: "asignacionesEstudiante",
  });

  Usuarios.hasMany(models.AsignacionEstudiante, {
    foreignKey: "catedratico_id",
    as: "asignacionesCatedratico",
  });

  Usuarios.belongsTo(models.Sede, { foreignKey: "sede_id", as: "sede" });
};

module.exports = Usuarios;
