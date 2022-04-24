import Base from 'models/BaseModel'

module.exports = (sequelize, DataTypes) => {
  class ChapterIntro extends Base {};

  ChapterIntro.init({
    id: {
      type: DataTypes.TINYINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true
    },
    story_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    chapter_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'chapters_intro'
  })

  return ChapterIntro
}
